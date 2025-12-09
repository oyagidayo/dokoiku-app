import { NextResponse } from 'next/server';
import { rooms } from '@/app/lib/store';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ roomId: string }> }
) {
    const { roomId } = await params;
    const body = await request.json();
    const { userId, shopId, voteType } = body;

    const room = rooms[roomId];

    if (!room) {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Initialize votes structure if not exists
    if (!room.votes) {
        room.votes = {};
    }
    if (!room.votes[userId]) {
        room.votes[userId] = {};
    }

    // Store the vote
    // voteType: 'super_yes' | 'like' | 'no'
    room.votes[userId][shopId] = voteType;

    return NextResponse.json({ success: true });
}
