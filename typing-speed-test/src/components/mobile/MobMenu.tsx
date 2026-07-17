import clsx from "clsx";
import { useState } from "react";
import arrowIcon from "../../assets/images/icon-down-arrow.svg";

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
                "flex gap-2 items-center px-2 py-1 min-w-[150px] relative cursor-pointer z-100",
                hasBorder && "border-b border-neutral-600"
            )}
        >
            <span
                className={clsx(
                    "inline-block w-3.5 h-3.5 rounded-full border",
                    checked && "ring-4 ring-inset ring-blue-600 border-none"
                )}
            ></span>
            <p>{title}</p>
        </div>
    );
};

export default function MobMenu({ title, options }: { title: string; options: string[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="relative">
            <button
                style={{"--arrow-url": `url(${arrowIcon});`} as React.CSSProperties}
                onClick={() => setIsOpen(!isOpen)}
                className="text-center text-neutral-0 min-w-[150px] py-1 border-neutral-400 border rounded mb-2 cursor-pointer"
            >
                {selected ?? title}
                <img src={arrowIcon} className={clsx("inline-block w-4 h-4 ml-2 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>
            <div
                className={clsx(
                    "bg-neutral-800 rounded text-neutral-0 transition-all duration-200 absolute",
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
