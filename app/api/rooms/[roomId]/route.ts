import { NextResponse } from 'next/server';
import { rooms } from '@/app/lib/store';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ roomId: string }> }
) {
    const { roomId } = await params;
    const room = rooms[roomId];

    if (!room) {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
}
