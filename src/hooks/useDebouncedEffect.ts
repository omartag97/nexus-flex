"use client";

import { useEffect, useRef, DependencyList } from "react";

/**
 * @param effect - The effect callback function to run after the delay.
 * @param deps - The dependency array; the effect will re-run when these change.
 * @param delay - Delay in milliseconds before running the effect.
 * @param options - Optional configuration:
 */

interface DebouncedEffectOptions {
  skipFirstRun?: boolean;
  runImmediately?: boolean;
}

export function useDebouncedEffect(
  effect: () => void | (() => void),
  deps: DependencyList,
  delay: number,
  options: DebouncedEffectOptions = {}
): void {
  const { skipFirstRun = false, runImmediately = false } = options;

  const effectRef = useRef(effect);
  const delayRef = useRef(delay);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    if (skipFirstRun && !hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (runImmediately && !hasMountedRef.current) {
      hasMountedRef.current = true;
      const cleanup = effectRef.current();
      if (typeof cleanup === "function") cleanup();
      return;
    }

    const handler = setTimeout(() => {
      const cleanup = effectRef.current();
      if (typeof cleanup === "function") cleanup();
    }, delayRef.current);

    return () => clearTimeout(handler);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
