import * as React from 'react'
import { calculateMargin } from '../utils/calulate-margin.util'
import { useWindowDimensions } from './use-window-dimension.hook'

interface AutoMarginOptions {
    containerRef: React.RefObject<HTMLElement>
    cardWidth: number
    minGap: number
    deps?: React.DependencyList // optional extra dependencies
}

export function useAutoMargin({ containerRef, cardWidth, minGap, deps = [] }: AutoMarginOptions): number {
    const [gap, setGap] = React.useState<number>(minGap)
    const { width } = useWindowDimensions({ delay: 200 });
    React.useEffect(() => {
        if (!containerRef.current || !cardWidth) return
        const marginPerSlide = calculateMargin({
            totalWidthAvailable: containerRef.current.offsetWidth,
            eachCardWidth: cardWidth,
            minGap
        })
        setGap(marginPerSlide)
    }, [cardWidth, minGap, width, ...deps])

    return gap
}
