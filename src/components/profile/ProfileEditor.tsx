import AvatarPicker from "./AvatarPicker";

interface ProfileEditorProps {
    displayName: string;
    selectedAvatar: string;
    saving: boolean;
    onDisplayNameChange: (
        value: string
    ) => void;
    onAvatarChange: (
        avatarId: string
    ) => void;
    onSave: () => void;
}

const ProfileEditor = ({
    displayName,
    selectedAvatar,
    saving,
    onDisplayNameChange,
    onAvatarChange,
    onSave,
}: ProfileEditorProps) => {
    return (
        <section
            className="
                mt-6
                rounded-3xl
                border
                border-white/10
                bg-white/[0.035]
                p-6
                sm:p-8
            "
        >
            <div className="mb-7">
                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-(--accent-primary)
                    "
                >
                    Profile Settings
                </p>

                <h2
                    className="
                        mt-2
                        text-2xl
                        font-black
                        text-white
                    "
                >
                    Customize your profile
                </h2>
            </div>

            <div className="max-w-xl">
                <label
                    htmlFor="displayName"
                    className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-white/60
                    "
                >
                    Display name
                </label>

                <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    maxLength={40}
                    onChange={(event) =>
                        onDisplayNameChange(
                            event.target.value
                        )
                    }
                    placeholder="Your name"
                    className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-(--bg-primary)
                        px-4
                        py-3
                        text-sm
                        text-white
                        outline-none
                        transition-all
                        placeholder:text-white/25
                        hover:border-white/20
                        focus:border-(--accent-primary)/60
                        focus:ring-1
                        focus:ring-(--accent-primary)/30
                    "
                />
            </div>

            <AvatarPicker
                selectedAvatar={selectedAvatar}
                onChange={onAvatarChange}
            />

            <button
                type="button"
                onClick={onSave}
                disabled={
                    saving ||
                    !displayName.trim()
                }
                className="
                    mt-8
                    inline-flex
                    min-w-32
                    items-center
                    justify-center
                    rounded-xl
                    bg-(--accent-primary)
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_0_25px_var(--accent-glow)]
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:brightness-110
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    disabled:hover:scale-100
                "
            >
                {saving
                    ? "Saving..."
                    : "Save Changes"}
            </button>
        </section>
    );
};

export default ProfileEditor;