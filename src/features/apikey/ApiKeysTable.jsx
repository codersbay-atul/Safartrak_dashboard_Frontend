import React, { useState } from 'react';

const DEFAULT_API_KEYS = [
  {
    id: '1',
    name: 'Default API key',
    author: 'JD India',
    created: '08-06-2026',
    apiKey: '96e84702f24b68988fff8c1cf987a1d2e',
    apiKeyTruncated: '96e84702f24b68988fff8c1cf98...',
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
    <div className="w-full space-y-2">
      <div className="bg-[#080808] border border-[#1b1e22] rounded-xl overflow-hidden text-gray-300 w-full shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b1e22]">
          <h2 className="text-white font-semibold text-base">
            API Keys ({apiKeys.length})
          </h2>
          <button
            onClick={onRefresh}
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-md focus:outline-none"
            title="Refresh"
            aria-label="Refresh API keys"
          >
            <RefreshIcon />
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          {apiKeys.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <p className="text-sm">No API keys found.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="text-[#626875] text-[11px] font-semibold tracking-wider border-b border-[#1b1e22] bg-[#080808]">
                  <th className="py-3.5 px-6 font-medium uppercase">NAME</th>
                  <th className="py-3.5 px-6 font-medium uppercase">CREATED</th>
                  <th className="py-3.5 px-6 font-medium uppercase">API KEY</th>
                  <th className="py-3.5 px-6 font-medium uppercase">API SECRET</th>
                  <th className="py-3.5 px-6 font-medium uppercase text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171a1e]/60">
                {apiKeys.map(function (item) {
                  const isSecretVisible = showSecretId === item.id;
                  const isKeyCopied = copiedState.id === item.id && copiedState.type === 'key';
                  const isSecretCopied = copiedState.id === item.id && copiedState.type === 'secret';

                  const authorText = item.author
                    ? item.author.startsWith('by ')
                      ? item.author
                      : `by ${item.author}`
                    : null;

                  return (
                    <tr
                      key={item.id}
                      className="align-middle hover:bg-[#0d0f12] transition-colors"
                    >
                      <td className="py-4 px-6 leading-tight max-w-[140px]">
                        <div className="text-white font-medium text-sm sm:text-base break-words">
                          {item.name}
                        </div>
                        {authorText && (
                          <div className="text-xs text-[#5f6672] mt-1 font-normal break-words">
                            {authorText}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6 text-gray-400 font-normal whitespace-nowrap">
                        <div className="text-sm text-gray-300">{item.created}</div>
                      </td>

                      <td className="py-4 px-6 font-mono text-xs sm:text-sm text-gray-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>
                            {item.apiKeyTruncated || `${item.apiKey.substring(0, 24)}...`}
                          </span>
                          <button
                            onClick={function () {
                              handleCopy(item.apiKey, item.id, 'key');
                            }}
                            className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                            title="Copy API Key"
                          >
                            {isKeyCopied ? <CheckIcon /> : <CopyIcon />}
                          </button>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-mono text-xs sm:text-sm text-gray-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="tracking-widest">
                            {isSecretVisible
                              ? item.apiSecret
                              : '••••••••••••••••••••...'}
                          </span>

                          <button
                            onClick={function () {
                              toggleShowSecret(item.id);
                            }}
                            className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                            title={isSecretVisible ? 'Hide Secret' : 'Show Secret'}
                          >
                            {isSecretVisible ? <EyeOffIcon /> : <EyeIcon />}
                          </button>

                          <button
                            onClick={function () {
                              handleCopy(item.apiSecret, item.id, 'secret');
                            }}
                            className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                            title="Copy API Secret"
                          >
                            {isSecretCopied ? <CheckIcon /> : <CopyIcon />}
                          </button>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-3 text-gray-500">
                          <button
                            onClick={function () {
                              onEdit && onEdit(item);
                            }}
                            className="hover:text-gray-300 transition-colors p-1"
                            title="Edit API Key"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={function () {
                              onDelete && onDelete(item.id);
                            }}
                            className="hover:text-red-400 transition-colors p-1"
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

      <p className="text-xs text-gray-500 px-1">
        Keep API secrets private. Anyone with a key and secret can access your fleet data.
      </p>
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <rect x="9" y="9" width="12" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908A8.982 8.982 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}