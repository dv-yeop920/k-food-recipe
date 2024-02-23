import { useEffect, useRef } from "react";

const InfiniteScrollObserver = ({ fetchNextPage, canFetchMore }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && canFetchMore) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, canFetchMore]);

  return <div ref={observerRef} />;
};

export default InfiniteScrollObserver;
