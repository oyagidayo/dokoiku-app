'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function VotePage() {
    const params = useParams();
    const roomId = params.roomId as string;
    const router = useRouter();
    const [shops, setShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [votes, setVotes] = useState<Record<string, string>>({});

    useEffect(() => {
        // Generate a random userId if not exists
        let storedUserId = localStorage.getItem('dokoiku_userId');
        if (!storedUserId) {
            storedUserId = Math.random().toString(36).substring(2);
            localStorage.setItem('dokoiku_userId', storedUserId);
        }
        setUserId(storedUserId);

        // Fetch room data
        // Since we can't easily share the server-side 'rooms' store with client component directly
        // without an API, we'll create a GET API for room details or pass it as props.
        // For now, let's refactor to fetch from an API route we'll create, or pass initial data.
        // To keep it simple and consistent with the "client-side interaction" requirement,
        // let's fetch from a new GET endpoint.

        fetch(`/api/rooms/${roomId}`)
            .then(res => {
                if (!res.ok) throw new Error('Room not found');
                return res.json();
            })
            .then(data => {
                setShops(data.shops);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [roomId]);

    const handleVote = async (shopId: string, voteType: 'super_yes' | 'like' | 'no') => {
        // Optimistic update
        setVotes(prev => ({ ...prev, [shopId]: voteType }));

        try {
            await fetch(`/api/rooms/${roomId}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, shopId, voteType }),
            });
        } catch (error) {
            console.error('Vote failed', error);
            // Revert on failure (optional, keeping simple for now)
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">読み込み中...</div>;
    }

    if (!shops || shops.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">お店が見つかりません</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-24">
            <header className="sticky top-0 bg-white/80 backdrop-blur-md p-4 -mx-4 mb-6 border-b border-gray-100 z-10">
                <h1 className="text-lg font-bold text-center">候補のお店 ({shops.length}件)</h1>
                <p className="text-xs text-center text-gray-500">直感で選んでね！</p>
            </header>

            <main className="space-y-6 max-w-md mx-auto">
                {shops.map((shop: any) => (
                    <div key={shop.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="h-40 bg-gray-200 w-full object-cover flex items-center justify-center text-gray-400 overflow-hidden">
                            {shop.photo?.pc?.l ? (
                                <img src={shop.photo.pc.l} alt={shop.name} className="w-full h-full object-cover" />
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>
                        <div className="p-4">
                            <h2 className="font-bold text-xl mb-1">{shop.name}</h2>
                            <p className="text-sm text-gray-500 mb-4">{shop.access} / {shop.budget?.name}</p>

                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => handleVote(shop.id, 'super_yes')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${votes[shop.id] === 'super_yes' ? 'bg-red-100 ring-2 ring-red-400' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                                >
                                    <span className="text-2xl mb-1">😍</span>
                                    <span className="text-xs font-bold">超アリ</span>
                                </button>
                                <button
                                    onClick={() => handleVote(shop.id, 'like')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${votes[shop.id] === 'like' ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                                >
                                    <span className="text-2xl mb-1">👍</span>
                                    <span className="text-xs font-bold">いいね</span>
                                </button>
                                <button
                                    onClick={() => handleVote(shop.id, 'no')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${votes[shop.id] === 'no' ? 'bg-gray-200 ring-2 ring-gray-400' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                >
                                    <span className="text-2xl mb-1">🤔</span>
                                    <span className="text-xs font-bold">なし</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center">
                <button
                    onClick={() => router.push(`/room/${roomId}/result`)}
                    className="bg-black text-white px-8 py-3 rounded-full shadow-xl font-bold text-sm"
                >
                    結果を見る
                </button>
            </div>
        </div>
    );
}
