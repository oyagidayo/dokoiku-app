import Link from 'next/link';

export default function HostPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-20">
            <header className="mb-6">
                <Link href="/" className="text-gray-500 text-sm">← 戻る</Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">条件を決める</h1>
            </header>

            <main className="space-y-6 max-w-md mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">エリア</label>
                        <input type="text" placeholder="例：渋谷、新宿" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">予算（一人あたり）</label>
                        <select className="w-full border border-gray-300 rounded-lg p-3 bg-white">
                            <option>こだわらない</option>
                            <option>~1,000円</option>
                            <option>~3,000円</option>
                            <option>~5,000円</option>
                            <option>5,000円~</option>
                        </select>
                    </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform transform active:scale-95 text-lg">
                    候補を取得する
                </button>
            </main>
        </div>
    );
}
