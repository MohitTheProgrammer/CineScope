import { CheckIcon } from "../../assets/icons/Icons";
import { AVATARS } from "../../constent/file";


interface AvatarPickerProps {
    selectedAvatar: string;
    onChange: (avatarId: string) => void;
}

const AvatarPicker = ({
    selectedAvatar,
    onChange,
}: AvatarPickerProps) => {
    return (
        <div className="mt-7">
            <p
                className="
                    mb-4
                    text-xs
                    font-semibold
                    text-white/60
                "
            >
                Choose your avatar
            </p>

            <div className="flex flex-wrap gap-4">
                {AVATARS.map((avatar) => {
                    const active =
                        selectedAvatar ===
                        avatar.id;

                    return (
                        <button
                            key={avatar.id}
                            type="button"
                            onClick={() =>
                                onChange(
                                    avatar.id
                                )
                            }
                            aria-label={`Choose avatar ${avatar.id.replace(
                                "avatar-",
                                ""
                            )}`}
                            aria-pressed={active}
                            className={`
                                relative
                                size-16
                                overflow-hidden
                                rounded-full
                                border-2
                                transition-all
                                duration-300
                                sm:size-20
                                ${active
                                    ? "scale-105 border-(--accent-primary) shadow-[0_0_25px_var(--accent-glow)]"
                                    : "border-white/10 opacity-60 hover:scale-105 hover:border-white/30 hover:opacity-100"
                                }
                            `}
                        >
                            <img
                                src={avatar.src}
                                alt=""
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />

                            {active && (
                                <span
                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        bg-black/30
                                    "
                                >
                                    <CheckIcon />
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AvatarPicker;