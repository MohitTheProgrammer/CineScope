import { DnaIcon } from "../../assets/icons/Icons";

interface ForYouErrorProps {
    message: string;
}

const ForYouError = ({
    message,
}: ForYouErrorProps) => {
    return (
        <main
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-(--bg-primary)
                px-6
                text-white
            "
        >
            <div className="text-center">
                <DnaIcon
                    className="
                        mx-auto
                        size-10
                        text-(--accent-primary)
                    "
                />

                <h1
                    className="
                        mt-5
                        text-2xl
                        font-black
                    "
                >
                    Something went wrong
                </h1>

                <p
                    className="
                        mt-2
                        text-sm
                        text-white/40
                    "
                >
                    {message}
                </p>
            </div>
        </main>
    );
};

export default ForYouError;