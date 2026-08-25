import React, { useState } from "react";
import { ShieldCheck, HelpCircleIcon } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainTableHeader from "../../components/Ui/MainLayoutUI/MainTableHeader";

const DEFAULT_API_KEYS = [
  {
    id: "1",
    name: "Default API key",
    author: "SafarTrak",
    created: "08-06-2026",
    apiKey: "96e84702f24b68988fff8c1cf98c0c26dbeabc33e143c84b",
    apiSecret: "secret_live_8f93120194bc823194a20b",
  },
];

export default function ApiKeysTable({
  apiKeys = DEFAULT_API_KEYS,
  onRefresh,
  onEdit,
  onDelete,
  onHelpClick,
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
    <div className="flex flex-col gap-2.5 font-sans select-none">
      {/* Header Section */}
      <div className="flex items-center gap-2 px-1 justify-between">
        <div className="flex items-center gap-2">
        <MainLayoutColor
          as={ShieldCheck}
          color="yellow"
          className="w-4 h-4 shrink-0"
        />
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-bold tracking-tight block"
        >
          Production Credentials
        </MainLayoutColor>
        </div>
        <button
            type="button"
            onClick={onHelpClick}
            className="cursor-pointer flex items-center gap-2"
          >
            <HelpCircleIcon
              size={18}
              className="text-[#FDB914]"
            />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="yellow"
              size="sectionTitle"
              className="font-bold tracking-tight block text-[14px] cursor-pointer"
            >
              Help me understand this table
            </MainLayoutColor>
          </button>
      </div>

      {/* Surface Card Container & Table */}
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full max-w-full border rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="w-full overflow-x-auto [scrollbar-width:thin] custom-scrollbar">
          {apiKeys.length === 0 ? (
            <div className="py-12 text-center">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
              >
                No API keys found.
              </MainLayoutColor>
            </div>
          ) : (
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="sticky top-0 z-10 shadow-sm">
                <MainLayoutColor
                  as="tr"
                  background="tableHeaderBg"
                  border="cardBorder"
                  className="border-b"
                >
                  <MainTableHeader className="py-3 px-4 w-[180px]">
                    Production Credentials
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-4 w-[130px]">
                    Created On
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-4 w-[130px]">
                    Created By
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-4 w-[320px]">
                    API Key (Username)
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-4 w-[220px]">
                    API Token (Password)
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-4 w-[120px] text-right">
                    Action
                  </MainTableHeader>
                </MainLayoutColor>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {apiKeys.map(function (item) {
                  const isSecretVisible = showSecretId === item.id;
                  const isKeyCopied =
                    copiedState.id === item.id && copiedState.type === "key";
                  const isSecretCopied =
                    copiedState.id === item.id && copiedState.type === "secret";

                  return (
                    <tr
                      key={item.id}
                      className="align-middle hover:bg-[#18181b]/50 transition-colors cursor-pointer"
                    >
                      {/* Name */}
                      <td className="py-3.5 px-4 truncate">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="title"
                          size="sectionTitle"
                          className="font-medium truncate block"
                        >
                          {item.name}
                        </MainLayoutColor>
                      </td>

                      {/* Created On */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                          className="font-normal block"
                        >
                          {item.created}
                        </MainLayoutColor>
                      </td>

                      {/* Created By */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                          className="font-normal block"
                        >
                          {item.author || "—"}
                        </MainLayoutColor>
                      </td>

                      {/* API Key */}
                      <td className="py-3.5 px-4 align-middle">
                        <div className="flex items-center justify-between gap-2 min-w-0">
                          <MainLayoutColor
                            as="span"
                            color="subtitle"
                            className="font-mono text-[12px] break-all whitespace-normal leading-relaxed min-w-0"
                          >
                            {item.apiKey}
                          </MainLayoutColor>
                          <button
                            type="button"
                            onClick={function (e) {
                              e.stopPropagation();
                              handleCopy(item.apiKey, item.id, "key");
                            }}
                            className="text-[#71717a] hover:text-white transition-colors shrink-0 p-1 focus:outline-none inline-flex items-center justify-center cursor-pointer"
                            title="Copy API Key"
                          >
                            {isKeyCopied ? <CheckIcon /> : <CopyIcon />}
                          </button>
                        </div>
                      </td>

                      {/* API Token */}
                      <td className="py-3.5 px-4 align-middle">
                        <div className="flex items-center justify-between gap-2 min-w-0">
                          <span
                            className={`tracking-widest font-mono text-[12px] break-all whitespace-normal leading-relaxed min-w-0 ${
                              isSecretVisible
                                ? "text-[var(--color-yellow,#ffd60a)]"
                                : "text-[#71717a]"
                            }`}
                          >
                            {isSecretVisible
                              ? item.apiSecret
                              : "..............."}
                          </span>
                          <button
                            type="button"
                            onClick={function (e) {
                              e.stopPropagation();
                              handleCopy(item.apiSecret, item.id, "secret");
                            }}
                            className="text-[#71717a] hover:text-white transition-colors shrink-0 p-1 focus:outline-none inline-flex items-center justify-center cursor-pointer"
                            title="Copy API Secret"
                          >
                            {isSecretCopied ? <CheckIcon /> : <CopyIcon />}
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap align-middle">
                        <div className="flex items-center justify-end gap-2 text-[#71717a]">
                          <button
                            type="button"
                            onClick={function (e) {
                              e.stopPropagation();
                              toggleShowSecret(item.id);
                            }}
                            className="hover:text-white transition-colors p-1 focus:outline-none flex items-center justify-center cursor-pointer"
                            title={
                              isSecretVisible ? "Hide Secret" : "Show Secret"
                            }
                          >
                            {isSecretVisible ? <EyeClosedIcon /> : <EyeIcon />}
                          </button>

                          <button
                            type="button"
                            onClick={function (e) {
                              e.stopPropagation();
                              onEdit && onEdit(item);
                            }}
                            className="hover:text-white transition-colors p-1 focus:outline-none flex items-center justify-center cursor-pointer"
                            title="Edit API Key"
                          >
                            <EditIcon />
                          </button>

                          <button
                            type="button"
                            onClick={function (e) {
                              e.stopPropagation();
                              onDelete && onDelete(item.id);
                            }}
                            className="hover:text-rose-400 transition-colors p-1 focus:outline-none flex items-center justify-center cursor-pointer"
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
      </MainLayoutColor>
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
      className="w-4 h-4 text-emerald-400"
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L20 4" />
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
