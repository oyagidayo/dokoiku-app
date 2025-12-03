export default async function VotePage({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params;
    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-24">
            <header className="sticky top-0 bg-white/80 backdrop-blur-md p-4 -mx-4 mb-6 border-b border-gray-100 z-10">
                <h1 className="text-lg font-bold text-center">候補のお店</h1>
                <p className="text-xs text-center text-gray-500">直感で選んでね！</p>
            </header>

            <main className="space-y-6 max-w-md mx-auto">
                {/* Mock Card 1 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="h-40 bg-gray-200 w-full object-cover flex items-center justify-center text-gray-400">
                        商品画像
                    </div>
                    <div className="p-4">
                        <h2 className="font-bold text-xl mb-1">イタリアンバル 〇〇</h2>
                        <p className="text-sm text-gray-500 mb-4">渋谷駅 徒歩5分 / 3,000円~</p>

                        <div className="grid grid-cols-3 gap-2">
                            <button className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                                <span className="text-2xl mb-1">😍</span>
                                <span className="text-xs font-bold">超アリ</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                                <span className="text-2xl mb-1">👍</span>
                                <span className="text-xs font-bold">いいね</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">
                                <span className="text-2xl mb-1">🤔</span>
                                <span className="text-xs font-bold">なし</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mock Card 2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="h-40 bg-gray-200 w-full object-cover flex items-center justify-center text-gray-400">
                        商品画像
                    </div>
                    <div className="p-4">
                        <h2 className="font-bold text-xl mb-1">焼き鳥 △△</h2>
                        <p className="text-sm text-gray-500 mb-4">渋谷駅 徒歩8分 / 4,000円~</p>

                        <div className="grid grid-cols-3 gap-2">
                            <button className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                                <span className="text-2xl mb-1">😍</span>
                                <span className="text-xs font-bold">超アリ</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                                <span className="text-2xl mb-1">👍</span>
                                <span className="text-xs font-bold">いいね</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">
                                <span className="text-2xl mb-1">🤔</span>
                                <span className="text-xs font-bold">なし</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center">
                <a href={`/room/${roomId}/result`} className="bg-black text-white px-8 py-3 rounded-full shadow-xl font-bold text-sm">
                    結果を見る
                </a>
            </div>
        </div>
    );
}
