import { useEffect, useLayoutEffect } from "preact/hooks";

const useEventListener = (
  eventName: string,
  handler: EventListener,
  options?: EventListenerOptions,
) => {
  const useIsomorphicLayoutEffect = typeof window !== "undefined"
    ? useLayoutEffect
    : useEffect;

  useIsomorphicLayoutEffect(() => {
    globalThis.addEventListener(eventName, handler, options);
    return () => {
      globalThis.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, options]);
};

export default useEventListener;
