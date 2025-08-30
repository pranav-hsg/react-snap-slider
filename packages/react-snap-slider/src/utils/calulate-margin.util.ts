export const calculateMargin = ({ totalWidthAvailable, eachCardWidth, minGap }) => {
    // 1. eachSlideWidth: Effective width occupied by a single card
    //    = card’s width + minimum required gap(margin) between cards ex: 290+10
    const eachSlideWidth = eachCardWidth + minGap

    // 2. sliderCardsPerVisibleWidth: Maximum number of cards that can
    //    fully fit inside the available slider width
    //    Use Math.trunc to ignore the partial card that doesn't fully fit ex: 1600/300  = 5
    const sliderCardsPerVisibleWidth = Math.trunc(totalWidthAvailable / eachSlideWidth)

    // 3. marginPerSlide (return value):
    //    - If equal left/right margin per card is required then, divide it by 2. ex: (1600/5) - 290 = 30
    return totalWidthAvailable / sliderCardsPerVisibleWidth - eachCardWidth;
}
