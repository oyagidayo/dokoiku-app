import { kv } from '@vercel/kv';

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

export async function saveRoom(roomId: string, data: RoomData): Promise<void> {
    // In development without KV env vars, fallback to in-memory (globalThis)
    // But for Vercel deployment, KV is required.
    // We'll add a check to warn if KV is not configured in dev.
    if (!process.env.KV_REST_API_URL && process.env.NODE_ENV === 'development') {
        console.warn('Vercel KV not configured. Using in-memory store fallback.');
        const { rooms } = await import('./store');
        rooms[roomId] = data;
        return;
    }

    await kv.set(`room:${roomId}`, data, { ex: ROOM_TTL });
}

export async function getRoom(roomId: string): Promise<RoomData | null> {
    if (!process.env.KV_REST_API_URL && process.env.NODE_ENV === 'development') {
        const { rooms } = await import('./store');
        return rooms[roomId] || null;
    }

    return await kv.get<RoomData>(`room:${roomId}`);
}

export async function addVote(roomId: string, userId: string, shopId: string, voteType: VoteType): Promise<void> {
    const room = await getRoom(roomId);
    if (!room) throw new Error('Room not found');

    if (!room.votes) room.votes = {};
    if (!room.votes[userId]) room.votes[userId] = {};

    room.votes[userId][shopId] = voteType;

    await saveRoom(roomId, room);
}
