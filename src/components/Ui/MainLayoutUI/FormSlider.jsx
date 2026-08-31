import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronLeft, X } from "lucide-react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";
import MainLayoutIcon from "./MainLayoutIcon";

const SLIDE_MS = 360;

function StepMarker({ state }) {
  if (state === "error") {
    return (
      <span className="relative z-[1] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ef4444] text-white shrink-0">
        <X size={10} strokeWidth={3} />
      </span>
    );
  }

  if (state === "complete") {
    return (
      <span className="relative z-[1] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FDB914] text-black shrink-0">
        <Check size={10} strokeWidth={3.5} />
      </span>
    );
  }

  if (state === "current") {
    return (
      <span className="relative z-[1] h-[18px] w-[18px] rounded-full bg-[#FDB914] shrink-0 ring-4 ring-[#FDB914]/15" />
    );
  }

  return (
    <span className="relative z-[1] h-[18px] w-[18px] rounded-full border-[1.5px] border-[#52525b] bg-[#141414] shrink-0" />
  );
}

function StepRail({ steps, currentStep, errorStepIds = [], onStepSelect }) {
  return (
    <nav aria-label="Form steps" className="w-[148px] shrink-0 px-4 py-5">
      <ol className="relative flex flex-col">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const hasError = errorStepIds.includes(step.id);
          const state =
            index === currentStep
              ? "current"
              : hasError
                ? "error"
                : index < currentStep
                  ? "complete"
                  : "upcoming";
          const isActive = index === currentStep;

          return (
            <li
              key={step.id}
              className={`relative flex items-start gap-2.5 ${isLast ? "" : "pb-5"}`}
            >
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[8px] top-[22px] bottom-0 w-px bg-[#FDB914]"
                />
              ) : null}

              <button
                type="button"
                onClick={() => onStepSelect?.(index)}
                className="relative flex items-start gap-2.5 text-left py-1.5 cursor-pointer group min-w-0 w-full"
              >
                <StepMarker state={state} />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color={isActive || hasError ? "title" : "muted"}
                  size="subInfoText"
                  className={`pt-px leading-[18px] ${
                    isActive ? "font-semibold" : "font-medium group-hover:text-white"
                  }`}
                >
                  {step.label}
                </MainLayoutColor>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function FormSliderPanel({
  isOpen,
  onClose,
  title,
  titleId,
  steps,
  currentStep,
  errorStepIds,
  onStepSelect,
  children,
  footer,
  panelClassName,
}) {
  const generatedId = useId();
  const labelledById = titleId || generatedId;
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

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
        className={`announcement-slider-panel absolute inset-y-0 right-0 w-[min(100vw,70vw)] min-w-[min(100vw,560px)] border-l border-[#27272a] shadow-2xl flex flex-col font-sans ${
          isVisible ? "is-open" : "is-closing"
        } ${panelClassName}`.trim()}
      >
        {/* <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 h-[56px] w-7 rounded-l-md bg-[#27272a] border border-r-0 border-[#3f3f46] flex items-center justify-center text-[#e4e4e7] hover:bg-[#3f3f46] hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button> */}

        <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-[#27272a] shrink-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            id={labelledById}
            color="title"
            size="sectionTitle"
            className="truncate font-medium tracking-tight"
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

        <div className="flex-1 min-h-0 flex">
          <div className="border-r border-[#27272a] shrink-0">
            <StepRail
              steps={steps}
              currentStep={currentStep}
              errorStepIds={errorStepIds}
              onStepSelect={onStepSelect}
            />
          </div>

          <div className="flex-1 min-w-0 min-h-0 overflow-y-auto custom-scrollbar px-5 py-5">
            {children}
          </div>
        </div>

        {footer ? (
          <div className="px-5 py-3 border-t border-[#27272a] shrink-0 flex items-center justify-end gap-2.5">
            {footer}
          </div>
        ) : null}
      </MainLayoutColor>
    </div>,
    document.body,
  );
}

export default function FormSlider({
  title = "Form",
  steps = [],
  currentStep = 0,
  onStepSelect,
  errorStepIds = [],
  isOpen: isOpenProp,
  onClose,
  onOpen,
  children,
  footer,
  trigger,
  panelClassName = "",
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
      {trigger ? (
        <button
          type="button"
          onClick={open}
          aria-label={title}
          className={`cursor-pointer ${className}`.trim()}
        >
          {trigger}
        </button>
      ) : null}

      <FormSliderPanel
        isOpen={isOpen}
        onClose={close}
        title={title}
        steps={steps}
        currentStep={currentStep}
        errorStepIds={errorStepIds}
        onStepSelect={onStepSelect}
        footer={footer}
        panelClassName={panelClassName}
      >
        {children}
      </FormSliderPanel>
    </>
  );
}
