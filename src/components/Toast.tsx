import { useEffect } from "react";

interface ToastProps {
    message: string;
    type?: "success" | "error";
    onClose: () => void;
}

const Toast = ({
    message,
    type = "success",
    onClose,
}: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className="
                fixed
                bottom-6
                left-1/2
                z-50
                -translate-x-1/2
                animate-in
                fade-in
                slide-in-from-bottom-3
                rounded-xl
                border
                border-white/10
                bg-black/80
                px-4
                py-3
                text-sm
                font-medium
                text-white
                shadow-2xl
                backdrop-blur-xl
            "
        >
            <div className="flex items-center gap-2">
                <span
                    className={
                        type === "success"
                            ? "text-green-400"
                            : "text-red-400"
                    }
                >
                    {type === "success" ? "✓" : "!"}
                </span>

                {message}
            </div>
        </div>
    );
};

export default Toast;