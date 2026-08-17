import React, { useState } from 'react';

const DEFAULT_API_KEYS = [
  {
    id: '1',
    name: 'Default API key',
    author: 'SafarTrak',
    created: '08-06-2026',
    apiKey: '96e84702f24b68988fff8c1cf98c0c26dbeabc33e143c84b',
    apiSecret: 'secret_live_8f93120194bc823194a20b',
  },
];

export default function ApiKeysTable({
  apiKeys = DEFAULT_API_KEYS,
  onRefresh,
  onEdit,
  onDelete,
}) {
  const [showSecretId, setShowSecretId] = useState(null);
  const [copiedState, setCopiedState] = useState({ id: null, type: null });

  function handleCopy(text, id, type) {
    navigator.clipboard.writeText(text);
    setCopiedState({ id, type });
    setTimeout(function () {
      setCopiedState({ id: null, type: null });
    }, 2000);
  }

  function toggleShowSecret(id) {
    setShowSecretId(function (prevId) {
      return prevId === id ? null : id;
    });
  }

  return (
    <div className="w-full max-w-full bg-[#0d0e12] border border-[#20242d] rounded-2xl shadow-xl overflow-hidden">
      <div className="w-full overflow-x-auto [scrollbar-width:thin]">
        {apiKeys.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <p className="text-sm">No API keys found.</p>
          </div>
        ) : (
          <table className="w-full min-w-[850px] text-left text-xs sm:text-sm border-collapse table-fixed">
            <thead>
              <tr className="bg-[#18181B] text-gray-500 font-semibold tracking-wider border-b border-[#20242d] uppercase text-[12px]">
                <th className="py-4 pl-4 pr-5 w-[180px] font-semibold">PRODUCTION CREDENTIALS</th>
                <th className="py-4 pl-4 pr-5 w-[130px] font-semibold">CREATED ON</th>
                <th className="py-4 pl-4 pr-5 w-[130px] font-semibold">CREATED BY</th>
                <th className="py-4 pl-4 pr-5 w-[320px] font-semibold">API KEY (USERNAME)</th>
                <th className="py-4 pl-4 pr-5 w-[220px] font-semibold">API TOKEN (PASSWORD)</th>
                <th className="py-4 pl-4 pr-5 w-[120px] font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#20242d] bg-[#0d0e12]">
              {apiKeys.map(function (item) {
                const isSecretVisible = showSecretId === item.id;
                const isKeyCopied =
                  copiedState.id === item.id && copiedState.type === 'key';
                const isSecretCopied =
                  copiedState.id === item.id && copiedState.type === 'secret';

                return (
                  <tr
                    key={item.id}
                    className="align-middle text-gray-300 border border-[#1d1d20] bg-[#121214] hover:border-[#27272a] hover:bg-[#18181b] transition-all cursor-pointer"
                  >
                    <td className="py-4 pl-4 pr-5 font-medium text-white truncate">
                      {item.name}
                    </td>

                    <td className="py-4 pl-4 pr-5 font-normal whitespace-nowrap text-gray-400">
                      {item.created}
                    </td>

                    <td className="py-4 pl-4 pr-5 font-normal whitespace-nowrap text-gray-400">
                      {item.author || ''}
                    </td>

                    <td className="py-4 pl-4 pr-5 font-normal align-middle">
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <span className="font-mono text-xs text-gray-300 break-all whitespace-normal leading-relaxed min-w-0">
                          {item.apiKey}
                        </span>
                        <button
                          onClick={function () {
                            handleCopy(item.apiKey, item.id, 'key');
                          }}
                          className="text-gray-500 hover:text-gray-300 transition-colors shrink-0 p-1 focus:outline-none inline-flex items-center justify-center"
                          title="Copy API Key"
                        >
                          {isKeyCopied ? <CheckIcon /> : <CopyIcon />}
                        </button>
                      </div>
                    </td>

                    <td className="py-4 pl-4 pr-5 font-normal align-middle">
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <span className="tracking-widest text-gray-400 font-mono text-xs break-all whitespace-normal leading-relaxed min-w-0">
                          {isSecretVisible ? item.apiSecret : '...............'}
                        </span>
                        <button
                          onClick={function () {
                            handleCopy(item.apiSecret, item.id, 'secret');
                          }}
                          className="text-gray-500 hover:text-gray-300 transition-colors shrink-0 p-1 focus:outline-none inline-flex items-center justify-center"
                          title="Copy API Secret"
                        >
                          {isSecretCopied ? <CheckIcon /> : <CopyIcon />}
                        </button>
                      </div>
                    </td>

                    <td className="py-4 pl-4 pr-5 text-right whitespace-nowrap align-middle">
                      <div className="flex items-center justify-end gap-2.5 text-gray-500">
                        <button
                          onClick={function () {
                            toggleShowSecret(item.id);
                          }}
                          className="hover:text-gray-300 transition-colors p-1 focus:outline-none flex items-center justify-center"
                          title={isSecretVisible ? 'Hide Secret' : 'Show Secret'}
                        >
                          {isSecretVisible ? <EyeClosedIcon /> : <EyeIcon />}
                        </button>

                        <button
                          onClick={function () {
                            onEdit && onEdit(item);
                          }}
                          className="hover:text-gray-300 transition-colors p-1 focus:outline-none flex items-center justify-center"
                          title="Edit API Key"
                        >
                          <EditIcon />
                        </button>

                        <button
                          onClick={function () {
                            onDelete && onDelete(item.id);
                          }}
                          className="hover:text-red-400 transition-colors p-1 focus:outline-none flex items-center justify-center"
                          title="Delete API Key"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-green-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"
      />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 20L20 4"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}