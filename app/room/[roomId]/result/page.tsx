export default async function ResultPage({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params;
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <h1 className="text-2xl font-bold text-center mb-6">みんなの評価結果</h1>

            <div className="space-y-4 max-w-md mx-auto">
                <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-400 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">1位</div>
                    <h2 className="font-bold text-lg">イタリアンバル 〇〇</h2>
                    <p className="text-sm text-gray-500">不満度: 0% (全員OK)</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-gray-200">
                    <div className="text-xs text-gray-400 mb-1">2位</div>
                    <h2 className="font-bold text-lg">焼き鳥 △△</h2>
                    <p className="text-sm text-gray-500">不満度: 30% (1人が「なし」)</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <a href="/" className="text-blue-600 underline text-sm">トップに戻る</a>
            </div>
        </div>
    );
}
