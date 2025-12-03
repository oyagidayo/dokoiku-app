import { NextResponse } from 'next/server';

export async function POST() {
    // Mock room creation
    return NextResponse.json({ roomId: 'mock-room-id' });
}
