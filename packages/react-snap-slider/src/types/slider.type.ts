export const enum SliderDirection {
    LEFT = "left",
    RIGHT = "right",
}

export type SliderSettings = {
    minGap?: number;
    carouselMode?: boolean;
};

export type SliderProps = {
    children: React.ReactNode;
    settings?: SliderSettings;
};