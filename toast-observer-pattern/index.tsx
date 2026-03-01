/**
 * Minimal Sonner-style Toaster component demonstrating two-phase CSS animation via RAF + setTimeout.
 *
 * The enter animation is triggered on the next paint using `requestAnimationFrame` (avoids
 * the browser batching the mount and the class change into a single paint). The exit animation
 * runs for TIME_BEFORE_UNMOUNT ms before the toast is removed from the DOM, matching the
 * CSS transition duration. A `firedRef` guard makes `startRemove` idempotent so the
 * auto-dismiss timer and any manual dismiss can't race each other.
 */

'use client';

import React from 'react';
import { toast, ToastState, type Toast } from './state';

// How long before the toast auto-dismisses (ms)
const TOAST_LIFETIME = 4000;

// Duration of the exit animation — must match CSS transition in styles.css
const TIME_BEFORE_UNMOUNT = 200;

// ─── ToastItem ──────────────────────────────────────────────────────────────

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [mounted, setMounted] = React.useState(false);
  const [removed, setRemoved] = React.useState(false);
  // Guard so startRemove() is idempotent
  const firedRef = React.useRef(false);

  // Phase 1: trigger the CSS enter transition on the next paint
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Phase 2: auto-dismiss after TOAST_LIFETIME
  React.useEffect(() => {
    const timer = setTimeout(startRemove, TOAST_LIFETIME);
    return () => clearTimeout(timer);
  }, []);

  function startRemove() {
    if (firedRef.current) return;
    firedRef.current = true;
    setRemoved(true);
    // Remove from DOM after the exit animation completes
    setTimeout(onRemove, TIME_BEFORE_UNMOUNT);
  }

  return (
    <li
      data-sonner-toast
      data-mounted={String(mounted)}
      data-removed={String(removed)}
    >
      {toast.title}
    </li>
  );
}

// ─── Toaster ────────────────────────────────────────────────────────────────

export function Toaster() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    return ToastState.subscribe((event) => {
      if ('dismiss' in event) {
        setToasts((prev) => prev.filter((t) => t.id !== event.id));
      } else {
        setToasts((prev) => [...prev, event]);
      }
    });
  }, []);

  const removeToast = (id: number) => ToastState.dismiss(id);

  return (
    <ol data-sonner-toaster aria-live="polite" aria-relevant="additions text" aria-atomic="false">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
      ))}
    </ol>
  );
}

export { toast };
