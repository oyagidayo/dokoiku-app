import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <main className="flex flex-col items-center text-center space-y-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          どこ行く？🍽
        </h1>
        <p className="text-lg text-gray-600">
          みんなの「気分」で<br />
          不満が出ないお店を決めよう
        </p>
        
        <div className="w-full pt-4">
          <Link 
            href="/host" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform transform active:scale-95 text-center text-xl"
          >
            ルームを作成する
          </Link>
        </div>
        
        <div className="text-sm text-gray-400 mt-8">
          <p>幹事さんが条件を決めて、</p>
          <p>みんなにURLをシェアするだけ！</p>
        </div>
      </main>
    </div>
  );
}
