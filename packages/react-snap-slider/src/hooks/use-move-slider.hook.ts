import { useState, useCallback, useEffect } from "react";
import { useThrottle } from "./use-throttle.hook";
import { SliderDirection } from "../types/slider.type";
import { useWindowDimensions } from "./use-window-dimension.hook";
import { useElementSize } from "./use-element-size.hook";

interface UseSliderOptions {
  cardWidth: number;
  gap: number;
  totalWidthRef?: React.RefObject<HTMLElement>;
  visibleWidthRef?: React.RefObject<HTMLElement>;
}

export function useMoveSlider({ cardWidth, gap, totalWidthRef, visibleWidthRef }: UseSliderOptions) {
  const [sliderOffset, setSliderOffset] = useState(0);
  const { width: windowWidth } = useWindowDimensions({ delay: 200 });
  const { width: visibleWidth } = useElementSize(visibleWidthRef, [windowWidth, gap]);
  const { width: totalWidth } = useElementSize(totalWidthRef, [windowWidth, gap]);
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
  }, [gap, windowWidth]);
  // throttle the movement
  const throttledMoveSlider = useThrottle(moveSlider, 400);

  return {
    sliderOffset,
    setSliderOffset,
    moveSlider: throttledMoveSlider, // expose throttled version
  };
}

