import { Link } from "react-router-dom";

interface MyListEmptyProps {
    authenticated: boolean;
    searchQuery?: string;
}

const MyListEmpty = ({
    authenticated,
    searchQuery,
}: MyListEmptyProps) => {
    if (!authenticated) {
        return (
            <main
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-(--bg-primary)
                    px-6
                    pt-20
                    text-center
                "
            >
                <div>
                    <h1
                        className="
                            text-3xl
                            font-black
                            text-white
                        "
                    >
                        Your list is waiting.
                    </h1>

                    <p
                        className="
                            mt-3
                            text-white/60
                        "
                    >
                        Sign in to save movies
                        and pick up where you
                        left off.
                    </p>

                    <Link
                        to="/login"
                        className="
                            mt-6
                            inline-flex
                            rounded-full
                            bg-(--accent-primary)
                            px-6
                            py-3
                            text-sm
                            font-bold
                            text-white
                        "
                    >
                        Sign in
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <div
            className="
                mt-10
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-10
                text-center
            "
        >
            <p className="text-white/70">
                {searchQuery
                    ? `No movies match “${searchQuery}”.`
                    : "No movies in your list yet."}
            </p>

            {!searchQuery && (
                <Link
                    to="/trending"
                    className="
                        mt-4
                        inline-flex
                        font-bold
                        text-(--accent-primary)
                    "
                >
                    Explore trending movies
                </Link>
            )}
        </div>
    );
};

export default MyListEmpty;