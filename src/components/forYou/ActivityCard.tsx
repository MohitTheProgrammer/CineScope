import type { IconComponent } from "../../utils/genreUtils";

interface ActivityCardProps {
    icon: IconComponent;
    label: string;
    value: number;
}

const ActivityCard = ({
    icon: Icon,
    label,
    value,
}: ActivityCardProps) => {
    return (
        <div
            className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/2.5
                p-5
                transition-all
                duration-300
                hover:border-(--accent-primary)/30
                hover:bg-(--accent-primary)/5
            "
        >
            <div className="flex items-center justify-between">
                <div
                    className="
                        flex
                        size-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-(--accent-primary)/20
                        bg-(--accent-primary)/10
                        text-(--accent-primary)
                    "
                >
                    <Icon className="size-4.5" />
                </div>

                <span className="text-2xl font-black text-white">
                    {value}
                </span>
            </div>

            <p
                className="
                    mt-5
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white/35
                "
            >
                {label}
            </p>
        </div>
    );
};

export default ActivityCard;