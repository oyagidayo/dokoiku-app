import Link from 'next/link';

export default async function JoinPage({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <main className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">ルームに参加</h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-left text-sm font-medium text-gray-700 mb-1">ニックネーム</label>
                        <input type="text" placeholder="例：たなか" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <Link
                        href={`/room/${roomId}/vote`}
                        className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow transition-transform transform active:scale-95"
                    >
                        参加して投票へ
                    </Link>
                </div>
            </main>
        </div>
    );
}
