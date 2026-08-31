import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";
import MainHeaderActionButton from "./MainHeaderActionButton";
import Logo from "../../../assets/images/Logo.svg";

const SLIDE_MS = 360;
const MOBILE_MAX_WIDTH = 767;

function useIsMobileScreen() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const onChange = (event) => setIsMobile(event.matches);
    setIsMobile(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

function DesktopOnlyScreen({ isOpen, onClose, productName = "SafarTrak" }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] select-none">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" />
      <MainLayoutColor
        as="div"
        role="dialog"
        aria-modal="true"
        aria-label={`${productName} desktop only`}
        background="background"
        className="absolute inset-0 flex flex-col"
      >
        <div className="flex items-center justify-end px-4 py-3.5 shrink-0">
          <MainHeaderActionButton
            variant="secondary"
            icon={X}
            onClick={onClose}
            aria-label="Close"
            title="Close"
            className="w-8 !px-0"
          />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-16">
          <div className="w-full max-w-sm flex flex-col items-center text-center gap-5">
            <img
              src={Logo}
              alt={productName}
              className="h-7 w-auto select-none pointer-events-none"
            />
            <div className="flex flex-col items-center gap-2">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
                className="font-semibold tracking-tight block text-[16px] sm:text-[18px]"
              >
                {productName} is available on desktop.
              </MainLayoutColor>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-normal leading-5 block max-w-[280px]"
              >
                Please switch to desktop for a better experience.
              </MainLayoutColor>
            </div>
          </div>
        </div>
      </MainLayoutColor>
    </div>,
    document.body,
  );
}

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
    <nav aria-label="Form steps" className="w-[250px] shrink-0 px-4 py-5">      <ol className="relative flex flex-col">
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

function CloseConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 select-none">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs"
        onClick={onCancel}
        aria-hidden="true"
      />
      <MainLayoutColor
        as="div"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="form-slider-close-title"
        background="surface"
        className="relative w-full max-w-[420px] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col gap-4"
      >
        <div className="flex items-start justify-between gap-3">
          <MainLayoutColor
            as={MainLayoutTextSize}
            id="form-slider-close-title"
            color="title"
            size="sectionTitle"
            className="font-semibold tracking-tight block pr-2"
          >
            {title}
          </MainLayoutColor>
          <MainHeaderActionButton
            variant="secondary"
            icon={X}
            onClick={onCancel}
            aria-label="Dismiss"
            title="Dismiss"
            className="w-8 !px-0"
          />
        </div>

        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="font-normal leading-5 block"
        >
          {message}
        </MainLayoutColor>

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <MainHeaderActionButton variant="secondary" onClick={onCancel}>
            No
          </MainHeaderActionButton>
          <MainHeaderActionButton onClick={onConfirm}>
            Yes
          </MainHeaderActionButton>
        </div>
      </MainLayoutColor>
    </div>,
    document.body,
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
  closeConfirmTitle,
  closeConfirmMessage,
}) {
  const generatedId = useId();
  const labelledById = titleId || generatedId;
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);

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

    setIsCloseConfirmOpen(false);
    const hideFrame = requestAnimationFrame(() => setIsVisible(false));
    const timeout = setTimeout(() => setIsMounted(false), SLIDE_MS);
    return () => {
      cancelAnimationFrame(hideFrame);
      clearTimeout(timeout);
    };
  }, [isOpen]);

  if (!isMounted) return null;

  function requestClose() {
    setIsCloseConfirmOpen(true);
  }

  function confirmClose() {
    setIsCloseConfirmOpen(false);
    onClose?.();
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000] select-none">
      <div
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

          <MainHeaderActionButton
            variant="secondary"
            icon={X}
            onClick={requestClose}
            aria-label="Close"
            title="Close"
            className="w-8 !px-0"
          />
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

          <div className="flex-1 min-w-0 min-h-0 overflow-y-auto custom-scrollbar px-4 py-4 sm:px-5 sm:py-5 lg:pr-[20%] xl:pr-[30%] 2xl:pr-[40%]">
            {children}
          </div>
        </div>

        {footer ? (
          <div className="px-5 py-3 border-t border-[#27272a] shrink-0 flex items-center justify-end gap-2.5">
            {footer}
          </div>
        ) : null}
      </MainLayoutColor>

      <CloseConfirmModal
        isOpen={isCloseConfirmOpen}
        title={closeConfirmTitle}
        message={closeConfirmMessage}
        onConfirm={confirmClose}
        onCancel={() => setIsCloseConfirmOpen(false)}
      />
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
  closeConfirmTitle = "Are you sure you want to close?",
  closeConfirmMessage = "All the info you've entered will be lost.",
  desktopOnly = true,
}) {
  const isControlled = typeof isOpenProp === "boolean";
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = isControlled ? isOpenProp : uncontrolledOpen;
  const isMobile = useIsMobileScreen();

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

      {desktopOnly && isMobile ? (
        <DesktopOnlyScreen isOpen={isOpen} onClose={close} />
      ) : (
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
          closeConfirmTitle={closeConfirmTitle}
          closeConfirmMessage={closeConfirmMessage}
        >
          {children}
        </FormSliderPanel>
      )}
    </>
  );
}
