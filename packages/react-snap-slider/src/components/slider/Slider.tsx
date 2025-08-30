import * as React from 'react'
import styles from './slider.module.css';
import { useWindowDimensions } from '../../hooks/use-window-dimension.hook';
import { calculateMargin } from '../../utils/calulate-margin.util';
import { useAutoMargin } from '../../hooks/use-auto-margin';

const Slider: React.FC<any> = ({ children, settings }) => {
    const minGap = settings?.minGap ?? 10;
    const sliderContainer = React.useRef(null);
    const containerRef = React.useRef(null);
    const [s, ss] = React.useState(0);
    const [cardWidth, setCardWidth] = React.useState(55);
    const { width: windowWidth } = useWindowDimensions();
    const gap = useAutoMargin({ containerRef: sliderContainer, cardWidth, minGap, deps: [windowWidth] });

    React.useEffect(() => {
        if (containerRef.current && containerRef.current.children.length > 0) {
            const firstChild = containerRef.current.children[0];
            setCardWidth(firstChild.offsetWidth);
        }
    }, []);

    React.useEffect(() => {

    }, []);
    return (
        <>
            <div className="slider-container" ref={sliderContainer}>
                <button role="button" aria-label="Previous slide" className="navigation navigation-left" >
                    <div className="arrow left" ></div>
                </button>
                <div style={{ display: 'flex', gap: gap + 'px', padding: `0 ${gap / 2}px` }} ref={containerRef}>
                    {children}
                </div>

                <button role="button" aria-label="Next slide" className="navigation navigation-right">
                    <div className="arrow right"></div>
                </button>
            </div>
        </>
    )
}
export default Slider