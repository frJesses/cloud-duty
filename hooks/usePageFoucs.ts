import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

export function usePageFocus(refreshFn: () => void, skipFirst = false) {
  const isFirst = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (skipFirst && isFirst.current) {
        isFirst.current = false;
        return;
      }
      refreshFn();
    }, [refreshFn, skipFirst])
  );
}
