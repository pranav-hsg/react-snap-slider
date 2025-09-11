import * as React from 'react'
import { useWindowDimensions } from '../../hooks/use-window-dimension.hook';
import { useAutoMargin } from '../../hooks/use-auto-margin.hook';
import { useTouchSlider } from '../../hooks/use-touch-slider.hook';
import { SliderDirection } from '../../types/slider.type';
import { useKeyboardSlider } from '../../hooks/use-keyboard-slider.hook';
import { useThrottle } from '../../hooks/use-throttle.hook';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll.hook';

type SliderSettings = {
    minGap?: number;
    carouselMode?: boolean;
};

type SliderProps = {
    children: React.ReactNode;
    settings?: SliderSettings;
};

const Slider: React.FC<SliderProps> = ({ children, settings }) => {
    const minGap = settings?.minGap ?? 10;
    const sliderContainer = React.useRef(null);
    const containerRef = React.useRef(null);
    const [cardsToSlide, setCardsToSlide] = React.useState<number>(3);
    const [cardWidth, setCardWidth] = React.useState(0);
    const [sliderOffset, setSliderOffset] = React.useState(0);
    const { width: windowWidth } = useWindowDimensions({ delay: 200 });
    const { gap, visibleCards } = useAutoMargin({ containerRef: sliderContainer, cardWidth, minGap, deps: [windowWidth] });
    const { handleKeyPress } = useKeyboardSlider({
        onKeyup: (direction: SliderDirection) => {
            moveSlider(direction, cardsToSlide);
        },
    });
    const { handleTouchStart, handleTouchEnd } = useTouchSlider({
        onSwipe: (direction) => {
            moveSlider(direction, cardsToSlide);
        }
    });
    React.useEffect(() => {
        if (containerRef.current && containerRef.current.children.length > 0) {
            const firstChild = containerRef.current.children[0];
            setCardWidth(firstChild.offsetWidth);
        }
    }, []);
    React.useEffect(() => {
        setSliderOffset(0);
    }, [windowWidth]);
    function computeScrollAmount(
        n: number,
        mode: 'item' | 'page' = 'item',
        containerWidth: number,
        totalItemWidth: number,
    ) {
        return n * (mode === 'page' ? containerWidth : totalItemWidth);
    }
    function moveSlider(direction: SliderDirection, n = 1, mode: 'item' | 'page' = 'item') {
        let updatedSliderOffset = 0;
        containerRef.current.style.transition = 'transform 0.4s ease-in-out';
        const scrollAmount = computeScrollAmount(n, mode, sliderContainer.current?.offsetWidth ?? 0, cardWidth + gap);
        const maxOffset = containerRef.current.offsetWidth - sliderContainer.current.offsetWidth;
        if (containerRef.current) {
            if (direction === SliderDirection.RIGHT) {
                if (sliderOffset === maxOffset) {
                    // 1. Animate to cloned "end" normally
                    updatedSliderOffset = sliderOffset + scrollAmount;

                    // 2. After transition ends → jump back to start without animation
                    containerRef.current.addEventListener("transitionend", () => {
                        containerRef.current.style.transition = "none";
                        setSliderOffset(scrollAmount);

                        // force reflow before restoring transition
                        void containerRef.current.offsetWidth;

                        containerRef.current.style.transition = "transform 0.4s ease-in-out";
                    }, { once: true });
                } else {
                    if (sliderOffset === 0) {
                        updatedSliderOffset = maxOffset;
                    }
                    updatedSliderOffset = Math.min(maxOffset, sliderOffset + scrollAmount);
                }
            } else {
                updatedSliderOffset = Math.max(0, sliderOffset - scrollAmount);
            }
        }
        console.log({ updatedSliderOffset, maxOffset, scrollAmount });
        setSliderOffset(updatedSliderOffset);
    }
    const throttledMoveSlider = useThrottle(moveSlider, 400);
    // function ceilMultiple(base: number, minimum: number): number {
    //     return Math.ceil(minimum / base) * base;
    // }

    const { postCloneCount } = useInfiniteScroll({ totalSlides: React.Children.count(children), slidesToScroll: cardsToSlide, visibleSlidesCount: visibleCards });
    console.log({ postCloneCount });
    const slides = React.Children.toArray(children);
    return (
        <>
            <div className="slider-container" ref={sliderContainer} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onKeyUp={handleKeyPress} tabIndex={0}>
                <button role="button" aria-label="Previous slide" className="navigation navigation-left" onClick={() => { throttledMoveSlider(SliderDirection.LEFT, cardsToSlide, 'page') }}>
                    <div className="arrow left" ></div>
                </button>
                <div style={{ display: 'flex', gap: settings?.carouselMode ? 0 : gap + 'px', padding: `0 ${gap / 2}px`, transform: `translateX(${-sliderOffset}px)`, transition: 'transform 0.4s ease-in-out' }} ref={containerRef} className={"slider-track " + (settings?.carouselMode ? "carousel-mode" : "")}>
                    {React.Children.toArray(children).splice(slides.length - postCloneCount, postCloneCount)}
                    {children}
                    {React.Children.toArray(children).splice(0, postCloneCount)}
                </div>

                <button role="button" aria-label="Next slide" className="navigation navigation-right" onClick={() => { throttledMoveSlider(SliderDirection.RIGHT, cardsToSlide, 'item') }}>
                    <div className="arrow right"></div>
                </button>
            </div>
        </>
    )
}
export default Slider