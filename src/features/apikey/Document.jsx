import React from 'react';
import MainLayout from '../../layouts/MainLayout';

export function Document({
  title = "Learn and explore Exotel APIs -",
  docUrl = "#",
  postmanUrl = "#",
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300 font-normal">
      <span>{title}</span>

      <a
        href={docUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[#3b82f6] hover:text-[#60a5fa] underline transition-colors"
      >
        <span>API documentation</span>
        <ExternalLinkIcon />
      </a>

      <a
        href={postmanUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[#3b82f6] hover:text-[#60a5fa] underline transition-colors ml-1"
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

export default function Document() {
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-4">
        <ApiLinksHeader 
          title="Learn and explore Safar APIs -"
          docUrl="https://docs.example.com"
          postmanUrl="https://www.postman.com"
        />
        
        <div className="flex-1 bg-[#0B0F19] rounded-lg p-6 overflow-auto">
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">API Documentation</h2>
              <p className="text-gray-400">
                Access comprehensive API documentation and examples to integrate Safar platform with your applications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Postman Collection</h2>
              <p className="text-gray-400">
                Import our Postman collection to quickly test and explore all available API endpoints with pre-configured requests.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Getting Started</h2>
              <p className="text-gray-400 mb-3">
                Follow these steps to get started with Safar APIs:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-400">
                <li>Generate API credentials from the API Credentials page</li>
                <li>Review the API documentation</li>
                <li>Test endpoints using Postman collection</li>
                <li>Integrate into your application</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}