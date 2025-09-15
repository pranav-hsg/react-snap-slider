import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useThrottle } from "./use-throttle.hook";
import { SliderDirection } from "../types/slider.type";
import { useWindowDimensions } from "./use-window-dimension.hook";

interface UseSliderOptions {
  cardWidth: number;
  gap: number;
  totalWidthRef?: React.RefObject<HTMLElement>;
  visibleWidthRef?: React.RefObject<HTMLElement>;
}

export function useMoveSlider({ cardWidth, gap, totalWidthRef, visibleWidthRef }: UseSliderOptions) {
  const [sliderOffset, setSliderOffset] = useState(0);
  const { width: windowWidth } = useWindowDimensions({ delay: 200 });

  const computeScrollAmount = useCallback(
    (n: number, mode: "item" | "page" = "item") => {
      return n * (mode === "page"
        ? totalWidthRef?.current?.offsetWidth ?? 0
        : cardWidth + gap);
    },
    [cardWidth, gap]
  );

  const moveSlider = useCallback(
    (direction: SliderDirection, n = 1, mode: "item" | "page" = "item") => {
      const totalWidth = totalWidthRef?.current?.scrollWidth ?? 0;
      const visibleWidth = visibleWidthRef?.current?.offsetWidth ?? 0;
      let updatedSliderOffset = 0;
      const scrollAmount = computeScrollAmount(n, mode);

      if (direction === SliderDirection.RIGHT) {
        updatedSliderOffset = Math.min(
          totalWidth - visibleWidth,
          sliderOffset + scrollAmount
        );
      } else {
        updatedSliderOffset = Math.max(0, sliderOffset - scrollAmount);
      }

      setSliderOffset(updatedSliderOffset);
    },
    [computeScrollAmount, sliderOffset]
  );

  useEffect(() => {
    setSliderOffset(0);
  }, [windowWidth]);
  // throttle the movement
  const throttledMoveSlider = useThrottle(moveSlider, 400);

  return {
    sliderOffset,
    setSliderOffset,
    moveSlider: throttledMoveSlider, // expose throttled version
  };
}
