/**
 * Observer-based toast state manager — the pub/sub core of a Sonner-style toast system.
 *
 * Decouples the imperative `toast()` call from React by using a plain Observer class
 * that React subscribes to via `useEffect`. This avoids Context, prop drilling, and
 * global React state, making the `toast()` function callable from anywhere (non-React code included).
 */

let toastsCounter = 1;

export interface Toast {
  id: number;
  title: string;
}

type DismissEvent = { id: number; dismiss: true };
type SubscriberEvent = Toast | DismissEvent;

class Observer {
  subscribers: Array<(event: SubscriberEvent) => void> = [];
  toasts: Toast[] = [];

  subscribe = (fn: (event: SubscriberEvent) => void): (() => void) => {
    this.subscribers.push(fn);
    return () => {
      const index = this.subscribers.indexOf(fn);
      this.subscribers.splice(index, 1);
    };
  };

  private publish = (event: SubscriberEvent) => {
    this.subscribers.forEach((fn) => fn(event));
  };

  addToast = (toast: Toast) => {
    this.publish(toast);
    this.toasts = [...this.toasts, toast];
  };

  dismiss = (id: number) => {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.publish({ id, dismiss: true });
  };
}

export const ToastState = new Observer();

export const toast = (message: string): number => {
  const id = toastsCounter++;
  ToastState.addToast({ id, title: message });
  return id;
};
