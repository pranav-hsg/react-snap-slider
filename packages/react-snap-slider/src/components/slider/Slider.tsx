import * as React from 'react'
import { useWindowDimensions } from '../../hooks/use-window-dimension.hook';
import { useAutoMargin } from '../../hooks/use-auto-margin';

const Slider: React.FC<any> = ({ children, settings }) => {
    const minGap = settings?.minGap ?? 10;
    const sliderContainer = React.useRef(null);
    const containerRef = React.useRef(null);
    const [cardWidth, setCardWidth] = React.useState(0);
    const [sliderOffset, setSliderOffset] = React.useState(0);
    const { width: windowWidth } = useWindowDimensions();
    const gap = useAutoMargin({ containerRef: sliderContainer, cardWidth, minGap, deps: [windowWidth] });

    React.useEffect(() => {
        if (containerRef.current && containerRef.current.children.length > 0) {
            const firstChild = containerRef.current.children[0];
            setCardWidth(firstChild.offsetWidth);
        }
    }, []);
    function navigate(direction: 'l' | 'r', scrollAmount = cardWidth + gap) {
        let updatedSliderOffset = 0;
        if (containerRef.current) {
            if (direction === 'r') {
                updatedSliderOffset = Math.min(containerRef.current.offsetWidth - sliderContainer.current.offsetWidth, sliderOffset + scrollAmount);
            } else {
                updatedSliderOffset = Math.max(0, sliderOffset - scrollAmount);
            }
        }
        setSliderOffset(updatedSliderOffset);
    }
    React.useEffect(() => {

    }, []);
    return (
        <>
            <div className="slider-container" ref={sliderContainer}>
                <button role="button" aria-label="Previous slide" className="navigation navigation-left" onClick={() => { navigate('l') }}>
                    <div className="arrow left" ></div>
                </button>
                <div style={{ display: 'flex', gap: gap + 'px', padding: `0 ${gap / 2}px`, transform: `translateX(${-sliderOffset}px)`, transition: 'transform 0.4s ease-in-out' }} ref={containerRef}>
                    {children}
                </div>

                <button role="button" aria-label="Next slide" className="navigation navigation-right" onClick={() => { navigate('r') }}>
                    <div className="arrow right"></div>
                </button>
            </div>
        </>
    )
}
export default Slider