import React from 'react';

export default function Document() {
  return (
    <div className="px-0 py-3 flex flex-wrap items-center gap-2 text-sm text-gray-200 font-normal">
      <span>Learn and explore Safar Trak APIs -</span>

      <a
        href="https://docs.example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[#3b82f6] hover:text-[#60a5fa] underline transition-colors"
      >
        <span>API documentation</span>
        <ExternalLinkIcon />
      </a>

      <a
        href="https://www.postman.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[#3b82f6] hover:text-[#60a5fa] underline transition-colors"
      >
        <span>Postman Collection</span>
        <ExternalLinkIcon />
      </a>
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}