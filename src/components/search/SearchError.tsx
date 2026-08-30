interface SearchErrorProps {
    message: string;
    onRetry: () => void;
}

const SearchError = ({
    message,
    onRetry,
}: SearchErrorProps) => {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-10
                text-center
            "
        >
            <p className="text-sm text-white/50">
                {message}
            </p>

            <button
                type="button"
                onClick={onRetry}
                className="
                    mt-4
                    font-bold
                    text-(--accent-primary)
                    transition-colors
                    hover:text-white
                    hover:underline
                "
            >
                Try again
            </button>
        </div>
    );
};

export default SearchError;