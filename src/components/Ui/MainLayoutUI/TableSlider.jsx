import { isValidElement, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";
import MainLayoutIcon from "./MainLayoutIcon";
import MainStatusBadge from "./MainStatusBadge";

const SLIDE_MS = 360;

function isPlainFooterConfig(footer) {
  return (
    Boolean(footer) &&
    typeof footer === "object" &&
    !Array.isArray(footer) &&
    !isValidElement(footer)
  );
}

function renderItemIcon(icon) {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;

  return (
    <MainLayoutIcon icon={icon} size="md" className="text-[#FDB914] mt-0.5" />
  );
}

function FooterBlock({ footer }) {
  if (!footer) return null;

  if (!isPlainFooterConfig(footer)) {
    return footer;
  }

  const FooterIcon = footer.icon || Info;
  const isExternal = footer.external !== false;

  return (
    <div className="flex flex-col gap-1.5">
      {footer.header ? (
        <div className="flex items-center gap-2">
          <MainLayoutIcon icon={FooterIcon} size="sm" className="text-white" />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
          >
            {footer.header}
          </MainLayoutColor>
        </div>
      ) : null}

      {footer.content ? (
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="muted"
          size="subInfoText"
          className="font-normal pl-6"
        >
          {footer.content}
        </MainLayoutColor>
      ) : null}

      {footer.linkLabel ? (
        <a
          href={footer.href || "#"}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onClick={footer.onClick}
          className="inline-flex items-center gap-1.5 pl-6 text-[#FDB914] hover:text-[#FDB914]/80 transition-colors no-underline hover:underline hover:underline-offset-[3px]"
        >
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="yellow"
            size="sectionTitle"
            className="text-[#FDB914]"
          >
            {footer.linkLabel}
          </MainLayoutColor>
          <ArrowRight size={13} className="shrink-0" />
          {isExternal ? <ExternalLink size={12} className="shrink-0" /> : null}
        </a>
      ) : null}
    </div>
  );
}

function StatusLegend({ statuses }) {
  if (!statuses?.length) return null;

  return (
    <ul className="grid grid-cols-[auto_auto_1fr] items-start gap-x-2 gap-y-2 mt-2">
      {statuses.map((row, index) => (
        <li
          key={row.status || row.label || index}
          className="contents"
        >
          <MainStatusBadge
            status={row.status || row.label}
            showDot={false}
            className="w-full justify-center"
          />
          {row.content ? (
            <>
              <MainLayoutColor
                as="span"
                color="muted"
                className="inline-flex h-[18px] items-center shrink-0 leading-none"
              >
                –
              </MainLayoutColor>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="muted"
                size="subInfoText"
                className="font-normal leading-4.5 min-w-0 mt-px"
              >
                {row.content}
              </MainLayoutColor>
            </>
          ) : (
            <>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

function TableSliderItems({ items }) {
  if (!items?.length) return null;

  return (
    <ul className="flex flex-col gap-6">
      {items.map((item, index) => (
        <li
          key={item.id || item.header || index}
          className="flex items-start gap-3"
        >
          {renderItemIcon(item.icon)}
          <div className="flex flex-col gap-1 min-w-0">
            {item.header ? (
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
              >
                {item.header}
              </MainLayoutColor>
            ) : null}
            {item.content ? (
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="muted"
                size="subInfoText"
                className="font-normal leading-4.5"
              >
                {item.content}
              </MainLayoutColor>
            ) : null}
            <StatusLegend statuses={item.statuses} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function TableSliderPanel({
  isOpen,
  onClose,
  title,
  titleId,
  items,
  children,
  footer,
  footers,
}) {
  const generatedId = useId();
  const labelledById = titleId || generatedId;
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const footerBlocks = footers || (footer ? [footer] : []);

  if (isOpen && !isMounted) {
    setIsMounted(true);
  }

  useEffect(() => {
    if (isOpen) {
      let innerFrame = 0;
      const outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => setIsVisible(true));
      });
      return () => {
        cancelAnimationFrame(outerFrame);
        cancelAnimationFrame(innerFrame);
      };
    }

    const hideFrame = requestAnimationFrame(() => setIsVisible(false));
    const timeout = setTimeout(() => setIsMounted(false), SLIDE_MS);
    return () => {
      cancelAnimationFrame(hideFrame);
      clearTimeout(timeout);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] select-none">
      <div
        onClick={onClose}
        className={`announcement-slider-backdrop absolute inset-0 bg-black/70 backdrop-blur-xs ${
          isVisible ? "is-open" : ""
        }`}
      />

      <MainLayoutColor
        as="aside"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
        background="surface"
        className={`announcement-slider-panel absolute inset-y-0 right-0 w-[min(100vw,380px)] border-l border-[#27272a] shadow-2xl flex flex-col ${
          isVisible ? "is-open" : "is-closing"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-[#27272a] shrink-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            id={labelledById}
            color="title"
            size="sectionTitle"
            className="truncate"
          >
            {title}
          </MainLayoutColor>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
          >
            <MainLayoutIcon name="close" size="close" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 py-4">
          <TableSliderItems items={items} />
          {children}
        </div>

        {footerBlocks.length > 0 ? (
          <div className="px-4 py-3.5 border-t border-[#27272a] shrink-0 flex flex-col gap-3">
            {footerBlocks.map((block, index) => (
              <FooterBlock
                key={block?.header || block?.linkLabel || index}
                footer={block}
              />
            ))}
          </div>
        ) : null}
      </MainLayoutColor>
    </div>,
    document.body,
  );
}

export default function TableSlider({
  title = "Help me understand this table",
  items,
  footer,
  footers,
  isOpen: isOpenProp,
  onClose,
  onOpen,
  children,
  className = "",
}) {
  const isControlled = typeof isOpenProp === "boolean";
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = isControlled ? isOpenProp : uncontrolledOpen;

  function open() {
    if (!isControlled) setUncontrolledOpen(true);
    onOpen?.();
  }

  function close() {
    if (!isControlled) setUncontrolledOpen(false);
    onClose?.();
  }

  return (
    <>
      {children ? (
        <button
          type="button"
          onClick={open}
          aria-label={title}
          className={`cursor-pointer ${className}`.trim()}
        >
          {children}
        </button>
      ) : null}

      <TableSliderPanel
        isOpen={isOpen}
        onClose={close}
        title={title}
        items={items}
        footer={footer}
        footers={footers}
      />
    </>
  );
}
