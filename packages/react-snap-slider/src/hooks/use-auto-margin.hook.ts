import * as React from 'react'
import { calculateMargin } from '../utils/calulate-margin.util'

interface AutoMarginOptions {
    containerRef: React.RefObject<HTMLElement>
    cardWidth: number
    minGap: number
    deps?: React.DependencyList // optional extra dependencies
}
export interface UseAutoMargin {
    gap: number
    visibleCards: number
}

export function useAutoMargin({ containerRef, cardWidth, minGap, deps = [] }: AutoMarginOptions): UseAutoMargin {
    const [gap, setGap] = React.useState<number>(minGap);
    const [visibleCards, setVisibleCards] = React.useState<number>(0);
    React.useEffect(() => {
        if (!containerRef.current || !cardWidth) return
        const [marginPerSlide, cards] = calculateMargin({
            totalWidthAvailable: containerRef.current.offsetWidth,
            eachCardWidth: cardWidth,
            minGap
        })
        setGap(marginPerSlide)
        setVisibleCards(cards);
    }, [cardWidth, minGap, containerRef, ...deps])

    return { gap, visibleCards };
}
