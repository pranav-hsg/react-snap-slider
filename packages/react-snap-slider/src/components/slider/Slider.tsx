import * as React from 'react'
import { useWindowDimensions } from '../../hooks/use-window-dimension.hook';
import { useAutoMargin } from '../../hooks/use-auto-margin.hook';
import { useTouchSlider } from '../../hooks/use-touch-slider.hook';
import { SliderDirection } from '../../types/slider.type';
import { useKeyboardSlider } from '../../hooks/use-keyboard-slider.hook';

type SliderSettings = {
    minGap?: number;
    // todo: Add other settings properties as needed
};

type SliderProps = {
    children: React.ReactNode;
    settings?: SliderSettings;
};

const Slider: React.FC<SliderProps> = ({ children, settings }) => {
    const minGap = settings?.minGap ?? 10;
    const sliderContainer = React.useRef(null);
    const containerRef = React.useRef(null);
    const [cardWidth, setCardWidth] = React.useState(0);
    const [sliderOffset, setSliderOffset] = React.useState(0);
    const { width: windowWidth } = useWindowDimensions();
    const gap = useAutoMargin({ containerRef: sliderContainer, cardWidth, minGap, deps: [windowWidth] });
    const { handleKeyPress } = useKeyboardSlider({
        onKeyup: (direction: SliderDirection) => {
            console.log("key up", direction);
            moveSlider(direction, 1);
        }
    });
    const handleKeyPress1 = (e: React.KeyboardEvent<HTMLElement>) => {
        console.log("key pressed");
        handleKeyPress(e);
    }
    const { handleTouchStart, handleTouchEnd } = useTouchSlider({
        onSwipe: (direction) => {
            moveSlider(direction, 1);
        }
    });
    React.useEffect(() => {
        if (containerRef.current && containerRef.current.children.length > 0) {
            const firstChild = containerRef.current.children[0];
            setCardWidth(firstChild.offsetWidth);
        }
    }, []);
    function moveSlider(direction: SliderDirection, n = 1) {
        let updatedSliderOffset = 0;
        const scrollAmount = n * (cardWidth + gap);
        if (containerRef.current) {
            if (direction === SliderDirection.RIGHT) {
                updatedSliderOffset = Math.min(containerRef.current.offsetWidth - sliderContainer.current.offsetWidth, sliderOffset + scrollAmount);
            } else {
                updatedSliderOffset = Math.max(0, sliderOffset - scrollAmount);
            }
        }
        setSliderOffset(updatedSliderOffset);
    }
    return (
        <>
            <div className="slider-container" ref={sliderContainer} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onKeyUp={handleKeyPress1} tabIndex={0}>
                <button role="button" aria-label="Previous slide" className="navigation navigation-left" onClick={() => { moveSlider(SliderDirection.LEFT, 1) }}>
                    <div className="arrow left" ></div>
                </button>
                <div style={{ display: 'flex', gap: gap + 'px', padding: `0 ${gap / 2}px`, transform: `translateX(${-sliderOffset}px)`, transition: 'transform 0.4s ease-in-out' }} ref={containerRef}>
                    {children}
                </div>

                <button role="button" aria-label="Next slide" className="navigation navigation-right" onClick={() => { moveSlider(SliderDirection.RIGHT, 1) }}>
                    <div className="arrow right"></div>
                </button>
            </div>
        </>
    )
}
export default Slider