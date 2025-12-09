import { NextResponse } from 'next/server';
import { rooms } from '@/app/lib/store';
import { identifyA, calculateShopScores, sortShops, RoomVotes } from '@/app/lib/logic';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ roomId: string }> }
) {
    const { roomId } = await params;
    const room = rooms[roomId];

    if (!room) {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const votes = (room.votes || {}) as RoomVotes;
    const shops = room.shops || [];

    // 1. Identify A
    const aAnalysis = identifyA(votes);
    const aUserId = aAnalysis.aUserId;

    // 2. Calculate Shop Scores
    const shopScores = calculateShopScores(shops, votes, aUserId);

    // 3. Sort
    const sortedScores = sortShops(shopScores);

    // 4. Merge details for response
    const results = sortedScores.map(score => {
        const shop = shops.find((s: any) => s.id === score.shopId);
        return {
            ...shop,
            ...score,
        };
    });

    return NextResponse.json({
        results,
        aAnalysis: {
            exists: !!aUserId,
            // Do not expose userId in production usually, but for debugging/demo we might want to know
            // For now, let's just return if A exists and maybe the max score
            maxAScore: aAnalysis.maxAScore,
        }
    });
}
