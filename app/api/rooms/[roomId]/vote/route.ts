import { NextResponse } from 'next/server';
import { addVote } from '@/app/lib/kv';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ roomId: string }> }
) {
    const { roomId } = await params;
    const body = await request.json();
    const { userId, shopId, voteType } = body;

    try {
        await addVote(roomId, userId, shopId, voteType);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Vote failed:', error);
        return NextResponse.json({ error: 'Failed to vote' }, { status: 500 });
    }
}
