import React, { useState } from 'react';

export default function AccountDetailsCard() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const accountInfo = [
    { label: 'ACCOUNT ID', value: 'jdindia2' },
    { label: 'ACCOUNT REGION', value: 'Asia (India)' },
    { label: 'API BASE URL', value: 'api.safartrak.com' },
  ];

  function handleCopy(text, index) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(function () {
      setCopiedIndex(null);
    }, 2000);
  }

  return (
    <div className="w-full">
      <div className="w-full bg-[#0d0e12] border border-[#20242d] rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accountInfo.map(function (item, index) {
            return (
              <div key={index} className="flex flex-col space-y-1">
                <span className="text-xs font-semibold text-gray-500 tracking-wider">
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-base sm:text-lg">
                    {item.value}
                  </span>

                  <button
                    onClick={function () { handleCopy(item.value, index); }}
                    className="text-gray-500 hover:text-gray-300 transition-colors p-1 focus:outline-none"
                    title="Copy to clipboard"
                    aria-label={`Copy ${item.label}`}
                  >
                    {copiedIndex === index ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="12" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}