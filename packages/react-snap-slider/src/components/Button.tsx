import { useState } from "react";
export interface ButtonProps {
    label: string;
    onClick: () => void;
}
export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(true);
        onClick();
    };
    return (
        <button className="custom-button" onClick={handleClick}>
            {clicked ? "Clicked!" : label}
        </button>
    );
};

export interface meow {
    hello: 'world';
}