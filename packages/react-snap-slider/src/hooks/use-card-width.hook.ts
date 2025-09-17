import * as React from "react";


export default function useCardWidth(sliderTrackRef: React.RefObject<HTMLElement>, initialWidth = 0) {
    const [cardWidth, setCardWidth] = React.useState(initialWidth);
    React.useEffect(() => {
        if (sliderTrackRef.current && sliderTrackRef.current.children.length > 0) {
            const firstChild = sliderTrackRef.current.children[0] as HTMLElement;
            setCardWidth(firstChild.offsetWidth);
        }
    }, []);
    return { cardWidth };
}
