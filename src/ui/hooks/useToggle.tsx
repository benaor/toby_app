import { useState, useCallback } from "react";

export const useToggle = (
  initialState = false,
  onToggle?: (newState: boolean) => void,
) => {
  const [state, setState] = useState(initialState);

  const toggle: VoidFunction = useCallback(() => {
    setState((prevState) => {
      const newState = !prevState;
      onToggle?.(newState);
      return newState;
    });
  }, [onToggle]);

  return [state, toggle] as const;
};
