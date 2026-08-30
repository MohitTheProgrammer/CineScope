import type { ReactNode } from "react";

interface FloatingCardProps {
    icon: ReactNode;
    label: string;
    className?: string;
}

const FloatingCard = ({
    icon,
    label,
    className = "",
}: FloatingCardProps) => {
    return (
        <div
            className={`
                absolute
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                backdrop-blur-xl
                ${className}
            `}
        >
            <span
                className="
                    flex
                    size-8
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/5
                "
            >
                {icon}
            </span>

            <span
                className="
                    text-xs
                    font-bold
                    text-white/70
                "
            >
                {label}
            </span>
        </div>
    );
};

export default FloatingCard;