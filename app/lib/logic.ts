
export type VoteType = 'super_yes' | 'like' | 'no';

export type UserVotes = Record<string, VoteType>; // shopId -> voteType
export type RoomVotes = Record<string, UserVotes>; // userId -> UserVotes

export const VOTE_SCORES = {
    super_yes: 5,
    like: 3,
    no: -1,
};

// Configuration
// TODO: Change to 15 for production
export const MIN_VOTES_FOR_A = 3;
export const A_THRESHOLD = 0.7;
export const A_PENALTY = 10.0;

export interface AAnalysisResult {
    aUserId: string | null;
    maxAScore: number;
    details: Record<string, { negRate: number; superRate: number; aScore: number; voteCount: number }>;
}

export function identifyA(votes: RoomVotes): AAnalysisResult {
    let maxAScore = -1;
    let aUserId: string | null = null;
    const details: Record<string, any> = {};

    Object.entries(votes).forEach(([userId, userVotes]) => {
        const voteCount = Object.keys(userVotes).length;

        let badCount = 0;
        let superCount = 0;

        Object.values(userVotes).forEach(vote => {
            if (vote === 'no') badCount++;
            if (vote === 'super_yes') superCount++;
        });

        const negRate = voteCount > 0 ? badCount / voteCount : 0;
        const superRate = voteCount > 0 ? superCount / voteCount : 0;

        // A-score calculation
        // A_score_u = 0.6 * neg_rate_u + 0.4 * (1 - super_rate_u)
        const aScore = (0.6 * negRate) + (0.4 * (1 - superRate));

        details[userId] = { negRate, superRate, aScore, voteCount };

        if (voteCount >= MIN_VOTES_FOR_A) {
            if (aScore > maxAScore) {
                maxAScore = aScore;
                aUserId = userId;
            }
        }
    });

    // Check threshold
    if (maxAScore < A_THRESHOLD) {
        aUserId = null;
    }

    return { aUserId, maxAScore, details };
}

export interface ShopScore {
    shopId: string;
    baseScore: number; // Average score
    finalScore: number; // After penalty
    penaltyApplied: boolean;
    voteCounts: { super_yes: number; like: number; no: number };
}

export function calculateShopScores(shops: any[], votes: RoomVotes, aUserId: string | null): ShopScore[] {
    return shops.map(shop => {
        let totalScore = 0;
        let count = 0;
        const voteCounts = { super_yes: 0, like: 0, no: 0 };
        let aVotedNo = false;

        Object.entries(votes).forEach(([userId, userVotes]) => {
            const vote = userVotes[shop.id];
            if (vote) {
                totalScore += VOTE_SCORES[vote];
                count++;
                voteCounts[vote]++;

                if (userId === aUserId && vote === 'no') {
                    aVotedNo = true;
                }
            }
        });

        const baseScore = count > 0 ? totalScore / count : 0;
        let finalScore = baseScore;

        if (aVotedNo) {
            finalScore -= A_PENALTY;
        }

        return {
            shopId: shop.id,
            baseScore,
            finalScore,
            penaltyApplied: aVotedNo,
            voteCounts
        };
    });
}

export function sortShops(scores: ShopScore[]): ShopScore[] {
    return [...scores].sort((a, b) => {
        // 1. Final Score (Descending)
        if (Math.abs(b.finalScore - a.finalScore) > 0.001) {
            return b.finalScore - a.finalScore;
        }

        // 2. Tie-breaker: Random (Deterministic based on ID for stability in this demo)
        return a.shopId.localeCompare(b.shopId);
    });
}
