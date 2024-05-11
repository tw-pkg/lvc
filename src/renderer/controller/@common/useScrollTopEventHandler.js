import {
  useEffect,
  useRef,
} from 'react';

function useScrollTopHandler({
  isCallable,
  callback,
  dependencyData,
  scrollOffset,
  touchDistanceCriterion,
  wheelDistanceCriterion,
}) {
  const isCalled = useRef(false);
  const isCalledFetch = useRef(false);

  const wheelPosition = useRef({ default: 0, move: 0, scroll: 0 });
  const touchPosition = useRef({ start: 0, end: 0 });
  const scrollPosition = useRef();
  const prevScrollPosition = useRef(0);

  const onWheel = (event) => {
    if (!scrollPosition.current) return;

    wheelPosition.current.move = event.deltaY;

    if (
      wheelPosition.current.move < wheelDistanceCriterion &&
      scrollPosition.current.scrollTop < scrollOffset &&
      !isCalled.current
    ) {
      if (isCallable) {
        prevScrollPosition.current = scrollPosition.current.scrollHeight;
        isCalledFetch.current = true;
        callback();
      }
      isCalled.current = true;
      return;
    }

    if (
      wheelPosition.current.move > wheelDistanceCriterion &&
      isCalled.current
    ) {
      isCalled.current = false;
      return;
    }
  };

  const onTouchStart = (event) => {
    touchPosition.current.start = event.changedTouches[0].clientY;
  };

  const onTouchEnd = (event) => {
    if (!scrollPosition.current) return;

    touchPosition.current.end = event.changedTouches[0].clientY;
    const { start: touchStart, end: touchEnd } = touchPosition.current;

    if (
      touchStart - touchEnd < touchDistanceCriterion &&
      scrollPosition.current.scrollTop < scrollOffset
    ) {
      isCallable && callback();
      return;
    }
  };

  useEffect(() => {
    if (isCalledFetch.current && scrollPosition.current) {
      scrollPosition.current.scrollTo({
        top: scrollPosition.current.scrollHeight - prevScrollPosition.current,
      });
      isCalledFetch.current = false;
    }
  }, [dependencyData]);

  return {
    onWheel,
    onTouchStart,
    onTouchEnd,
    scrollRef: scrollPosition,
  };
}

export default useScrollTopHandler;