import clsx from "clsx";
import { useState } from "react";
import arrowIcon from "/images/icon-down-arrow.svg";

type ButtonProps = {
    title: string;
    hasBorder: boolean;
    checked: boolean;
    onSelect: () => void;
};

const Button = ({ title, hasBorder, checked, onSelect }: ButtonProps) => {
    return (
        <div
            onClick={onSelect}
            className={clsx(
                "flex gap-2 items-center px-2 py-1  relative cursor-pointer",
                hasBorder && "border-b border-neutral-600"
            )}
        >
            <span
                className={clsx(
                    "inline-block w-3.5 h-3.5 rounded-full border",
                    checked && "ring-4 ring-inset ring-blue-400 border-none"
                )}
            ></span>
            <p>{title}</p>
        </div>
    );
};

export  function Menu({ title, options }: { title: string; options: string[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="relative w-1/2 sm:w-1/3">
            <button
                style={{"--arrow-url": `url(${arrowIcon});`} as React.CSSProperties}
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-center items-center gap-3 py-0.5 w-full text-neutral-0 border-neutral-400 border rounded-lg  cursor-pointer sm:text-lg"
            >
                <span>{selected ?? title}</span>
                <img src={arrowIcon} className={clsx("w-3 h-3  transition-transform duration-200", isOpen && "rotate-180")} />
            </button>
            <div
                className={clsx(
                    "absolute z-10 w-full bg-neutral-800 rounded-lg text-neutral-0 transition-all duration-200",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            >
                {options.map((option, index) => (
                    <Button
                        key={option}
                        title={option}
                        hasBorder={options.length !== index + 1}
                        checked={selected === option}
                        onSelect={() => {
                            setSelected(option);
                            setIsOpen(false);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
