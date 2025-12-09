import Redis from 'ioredis';

// Type definitions (reused from store/logic)
export type VoteType = 'super_yes' | 'like' | 'no';
export type UserVotes = Record<string, VoteType>; // shopId -> voteType
export type RoomVotes = Record<string, UserVotes>; // userId -> UserVotes

export type RoomData = {
    id: string;
    conditions: { area: string; budget: string };
    shops: any[];
    votes: RoomVotes;
    participants: string[];
};

const ROOM_TTL = 60 * 60 * 24; // 24 hours

// Initialize Redis client
let redis: Redis | null = null;

if (process.env.REDIS_URL) {
    redis = new Redis(process.env.REDIS_URL);
} else {
    if (process.env.NODE_ENV === 'production') {
        console.error('REDIS_URL is not defined in production environment.');
    }
}

export async function saveRoom(roomId: string, data: RoomData): Promise<void> {
    if (!redis) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Redis not configured. Using in-memory store fallback.');
            const { rooms } = await import('./store');
            rooms[roomId] = data;
            return;
        }
        throw new Error('Redis not configured');
    }

    await redis.set(`room:${roomId}`, JSON.stringify(data), 'EX', ROOM_TTL);
}

export async function getRoom(roomId: string): Promise<RoomData | null> {
    if (!redis) {
        if (process.env.NODE_ENV === 'development') {
            const { rooms } = await import('./store');
            return rooms[roomId] || null;
        }
        throw new Error('Redis not configured');
    }

    const data = await redis.get(`room:${roomId}`);
    return data ? JSON.parse(data) as RoomData : null;
}

export async function addVote(roomId: string, userId: string, shopId: string, voteType: VoteType): Promise<void> {
    const room = await getRoom(roomId);
    if (!room) throw new Error('Room not found');

    if (!room.votes) room.votes = {};
    if (!room.votes[userId]) room.votes[userId] = {};

    room.votes[userId][shopId] = voteType;

    await saveRoom(roomId, room);
}
