import type { IconComponent } from "../../utils/genreUtils";

interface PreferenceTagProps {
    icon: IconComponent;
    label: string;
}

const PreferenceTag = ({
    icon: Icon,
    label,
}: PreferenceTagProps) => {
    return (
        <div
            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-3
                py-2
                text-xs
                font-semibold
                text-white/50
                transition-all
                duration-300
                hover:border-(--accent-primary)/20
                hover:bg-(--accent-primary)/5
                hover:text-white/70
            "
        >
            <Icon
                className="
                    size-3.5
                    text-(--accent-primary)
                "
            />

            {label}
        </div>
    );
};

export default PreferenceTag;