import { useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = ({ onIntersect, enabled = true }) => {
  const sentinelRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      // FIX 2: Early return is cleaner and prevents any implicit fall-through
      if (!entry.isIntersecting || !enabled) return;
      onIntersect();
    },
    [onIntersect, enabled]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,        // viewport
      rootMargin: '200px', // trigger 200px before the sentinel is visible
      threshold: 0,
    });

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [handleIntersect]);

  return sentinelRef;
};

export default useInfiniteScroll;
