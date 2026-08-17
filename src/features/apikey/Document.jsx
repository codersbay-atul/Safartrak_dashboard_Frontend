import React from 'react';

export default function Document() {
  return (
    <div className="px-0 py-3 flex flex-wrap items-center gap-2 text-sm text-gray-200 font-normal">
      <span>Learn and explore SafarTrak APIs -</span>

      <a
        href="/Docs/SafarTrakDocs.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-baseline gap-1.5 text-[#F5B700] transition-all duration-200 no-underline hover:underline hover:decoration-[#F5B700] hover:decoration-1 hover:underline-offset-[3px] focus-visible:underline focus-visible:decoration-[#F5B700] focus-visible:decoration-1 focus-visible:underline-offset-[3px]"
      >
        <span className="leading-none">API documentation</span>
        <ExternalLinkIcon />
      </a>

      <a
        href="https://www.postman.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-baseline gap-1.5 text-[#F5B700] transition-all duration-200 no-underline hover:underline hover:decoration-[#F5B700] hover:decoration-1 hover:underline-offset-[3px] focus-visible:underline focus-visible:decoration-[#F5B700] focus-visible:decoration-1 focus-visible:underline-offset-[3px]"
      >
        <span className="leading-none">Postman Collection</span>
        <ExternalLinkIcon />
      </a>
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-[#F5B700] translate-y-1"
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