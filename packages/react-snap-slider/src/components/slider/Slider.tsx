import * as React from 'react'
import { useWindowDimensions } from '../../hooks/use-window-dimension.hook';
import { useAutoMargin } from '../../hooks/use-auto-margin.hook';
import { useTouchSlider } from '../../hooks/use-touch-slider.hook';
import { SliderDirection, SliderProps } from '../../types/slider.type';
import { useKeyboardSlider } from '../../hooks/use-keyboard-slider.hook';
import { useMoveSlider } from '../../hooks/use-move-slider.hook';
import useCardWidth from '../../hooks/use-card-width.hook';

const Slider: React.FC<SliderProps> = ({ children, settings }) => {
    const minGap = settings?.minGap ?? 10;
    const sliderContainer = React.useRef(null);
    const sliderTrackRef = React.useRef(null);
    const { cardWidth } = useCardWidth(sliderTrackRef, 0);
    const gap = useAutoMargin({ containerRef: sliderContainer, cardWidth, minGap });
    const { handleKeyPress } = useKeyboardSlider({
        onKeyup: (direction: SliderDirection) => {
            moveSlider(direction, 1);
        },
    });
    const { handleTouchStart, handleTouchEnd } = useTouchSlider({
        onSwipe: (direction) => {
            moveSlider(direction, 1);
        }
    });
    const { moveSlider, sliderOffset } = useMoveSlider({
        cardWidth: cardWidth,
        gap: gap,
        totalWidth: sliderTrackRef.current?.scrollWidth,
        visibleWidth: sliderContainer.current?.offsetWidth
    });

    return (
        <>
            <div className="slider-container" ref={sliderContainer} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onKeyUp={handleKeyPress} tabIndex={0}>
                <button role="button" aria-label="Previous slide" className="navigation navigation-left" disabled={sliderOffset == 0} onClick={() => { moveSlider(SliderDirection.LEFT, 4) }}>
                    <div className="arrow left" ></div>
                </button>
                <div style={{ display: 'flex', gap: settings?.carouselMode ? 0 : gap + 'px', padding: `0 ${gap / 2}px`, transform: `translateX(${-sliderOffset}px)`, transition: 'transform 0.4s ease-in-out' }} ref={sliderTrackRef} className={"slider-track " + (settings?.carouselMode ? "carousel-mode" : "")}>
                    {children}
                </div>

                <button disabled={(sliderOffset + sliderContainer.current?.offsetWidth) === sliderTrackRef.current?.offsetWidth} role="button" aria-label="Next slide" className="navigation navigation-right" onClick={() => { moveSlider(SliderDirection.RIGHT, 4) }}>
                    <div className="arrow right"></div>
                </button>
            </div>
        </>
    )
}
export default Slider