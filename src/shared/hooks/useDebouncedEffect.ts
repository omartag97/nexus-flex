import { useEffect, useRef, DependencyList } from "react";

/**
 * Custom hook to debounce running of given effect
 * @param {Function} effect - imperative and possibly effectful function
 * @param {Array} deps - the effect deps array literal, keep order
 * @param {number} timeout - delaying time in ms
 * @param {boolean} skipFirstRun - boolean flag to skip run on mount
 * @param {boolean} skipFirstDelay - boolean flag to skip first delay on mount
 */

function useDebouncedEffect<TDeps extends DependencyList>(
  effect: () => void,
  deps: TDeps,
  timeout: number,
  skipFirstRun: boolean = false,
  skipFirstDelay: boolean = false
): void {
  const effectRef = useRef<() => void>(effect);
  const timeoutRef = useRef<number>(timeout);

  const skipFirstRunRef = useRef<boolean>(skipFirstRun);
  const skipFirstDelayRef = useRef<boolean>(skipFirstDelay);

  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    if (skipFirstRunRef.current) {
      skipFirstRunRef.current = false;
      return;
    }

    if (skipFirstDelayRef.current) {
      effectRef.current();
      skipFirstDelayRef.current = false;
      return;
    }

    const timeoutID = setTimeout(() => effectRef.current(), timeoutRef.current);

    return () => {
      clearTimeout(timeoutID);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, deps);
}

export default useDebouncedEffect;
