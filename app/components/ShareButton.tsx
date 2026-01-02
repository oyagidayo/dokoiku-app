'use client';

import { useState } from 'react';

export default function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('URLのコピーに失敗しました');
        });
    };

    return (
        <button
            onClick={handleCopy}
            className={`w-full font-bold py-3 px-6 rounded-xl shadow transition-all transform active:scale-95 border-2 
                ${copied
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-white border-blue-500 text-blue-600 hover:bg-blue-50'}`}
        >
            {copied ? 'コピーしました！' : 'URLをコピーして招待'}
        </button>
    );
}
