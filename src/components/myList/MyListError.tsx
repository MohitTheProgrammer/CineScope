interface MyListErrorProps {
    message: string;
    onRetry: () => void;
}

const MyListError = ({
    message,
    onRetry,
}: MyListErrorProps) => {
    return (
        <div
            className="
                mt-10
                rounded-2xl
                border
                border-red-400/30
                bg-red-400/10
                p-5
                text-red-200
            "
        >
            <p>{message}</p>

            <button
                type="button"
                onClick={onRetry}
                className="
                    mt-3
                    font-bold
                    underline
                    underline-offset-4
                "
            >
                Try again
            </button>
        </div>
    );
};

export default MyListError;