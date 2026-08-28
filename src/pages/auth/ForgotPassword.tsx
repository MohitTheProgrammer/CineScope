import { useState } from "react";
import type { FormEvent } from "react";


import { sendPasswordReset } from "../../services/userService";

import {
    ArrowLeftIcon,
    CheckIcon,
    FilmIcon,
    LockIcon,
} from "../../assets/icons/Icons";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError("Please enter your email address.");
            return;
        }

        setLoading(true);

        try {
            await sendPasswordReset(trimmedEmail);

            setSent(true);
        } catch (error: any) {
            console.error(
                "Failed to send password reset email:",
                error
            );

            switch (error.code) {
                case "auth/invalid-email":
                    setError(
                        "Please enter a valid email address."
                    );
                    break;

                case "auth/user-not-found":
                    setError(
                        "No account exists with this email."
                    );
                    break;

                case "auth/too-many-requests":
                    setError(
                        "Too many attempts. Please try again later."
                    );
                    break;

                default:
                    setError(
                        "Something went wrong. Please try again."
                    );
            }
        } finally {
            setLoading(false);
        }
    };

    /* ---------------------------------------------------------------------- */
    /* Success state                                                          */
    /* ---------------------------------------------------------------------- */

    if (sent) {
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
                <div className="w-full max-w-md text-center">

                    {/* Logo */}

                    <div
                        className="
                            mx-auto
                            flex
                            size-16
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-(--accent-primary)/20
                            bg-(--accent-primary)/10
                            text-(--accent-primary)
                            shadow-[0_0_40px_var(--accent-glow)]
                        "
                    >
                        <CheckIcon className="size-8" />
                    </div>

                    <h1
                        className="
                            mt-7
                            text-3xl
                            font-black
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        Check your email
                    </h1>

                    <p
                        className="
                            mx-auto
                            mt-4
                            max-w-sm
                            text-sm
                            leading-6
                            text-white/40
                        "
                    >
                        We've sent a secure password reset
                        link to
                    </p>

                    <p
                        className="
                            mt-2
                            break-all
                            text-sm
                            font-bold
                            text-(--accent-primary)
                        "
                    >
                        {email}
                    </p>

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-sm
                            text-xs
                            leading-5
                            text-white/25
                        "
                    >
                        Open the email and follow the link
                        to create a new password. You can
                        safely close this page.
                    </p>

                    <a
                        href="/login"
                        className="
                            mt-8
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-bold
                            text-white/60
                            transition-colors
                            hover:text-(--accent-primary)
                        "
                    >
                        <ArrowLeftIcon className="size-4" />
                        Back to login
                    </a>

                </div>
            </main>
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Forgot password form                                                   */
    /* ---------------------------------------------------------------------- */

    return (
        <main
            className="
                relative
                flex
                min-h-screen
                items-center
                justify-center
                overflow-hidden
                bg-(--bg-primary)
                px-6
                py-12
                text-white
            "
        >

            {/* Ambient glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    size-150
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-(--accent-primary)/5
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    w-full
                    max-w-md
                "
            >

                {/* Back */}

                <a
                    href="/login"
                    className="
                        mb-8
                        inline-flex
                        items-center
                        gap-2
                        text-xs
                        font-bold
                        text-white/35
                        transition-colors
                        hover:text-white
                    "
                >
                    <ArrowLeftIcon className="size-4" />
                    Back to login
                </a>

                {/* Card */}

                <div
                    className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-7
                        shadow-[0_30px_100px_rgba(0,0,0,0.25)]
                        sm:p-9
                    "
                >

                    {/* Icon */}

                    <div
                        className="
                            flex
                            size-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-(--accent-primary)/20
                            bg-(--accent-primary)/10
                            text-(--accent-primary)
                            shadow-[0_0_30px_var(--accent-glow)]
                        "
                    >
                        <LockIcon className="size-6" />
                    </div>

                    {/* Heading */}

                    <div className="mt-7">

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <span
                                className="
                                    size-1.5
                                    rounded-full
                                    bg-(--accent-primary)
                                    shadow-[0_0_12px_var(--accent-glow)]
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.3em]
                                    text-(--accent-primary)
                                "
                            >
                                Account recovery
                            </span>
                        </div>

                        <h1
                            className="
                                mt-3
                                text-3xl
                                font-black
                                tracking-tight
                                sm:text-4xl
                            "
                        >
                            Forgot your
                            <br />
                            <span className="text-(--accent-primary)">
                                password?
                            </span>
                        </h1>

                        <p
                            className="
                                mt-4
                                text-sm
                                leading-6
                                text-white/40
                            "
                        >
                            No worries. Enter the email
                            connected to your CineScope
                            account and we'll send you a
                            secure reset link.
                        </p>

                    </div>

                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8"
                    >

                        <label
                            htmlFor="email"
                            className="
                                mb-2
                                block
                                text-xs
                                font-bold
                                text-white/50
                            "
                        >
                            Email address
                        </label>

                        <div
                            className="
                                relative
                            "
                        >

                            <FilmIcon
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    size-4
                                    -translate-y-1/2
                                    text-white/25
                                "
                            />

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                placeholder="you@example.com"
                                autoComplete="email"
                                disabled={loading}
                                className="
                                    h-14
                                    w-full
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/20
                                    pl-11
                                    pr-4
                                    text-sm
                                    text-white
                                    outline-none
                                    placeholder:text-white/20
                                    transition-all
                                    focus:border-(--accent-primary)/40
                                    focus:bg-white/4
                                    focus:shadow-[0_0_25px_var(--accent-glow)]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            />

                        </div>

                        {/* Error */}

                        {error && (
                            <div
                                className="
                                    mt-3
                                    rounded-xl
                                    border
                                    border-red-500/20
                                    bg-red-500/5
                                    px-4
                                    py-3
                                    text-xs
                                    font-medium
                                    text-red-400
                                "
                            >
                                {error}
                            </div>
                        )}

                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                group
                                relative
                                mt-5
                                flex
                                h-14
                                w-full
                                items-center
                                justify-center
                                gap-3
                                overflow-hidden
                                rounded-2xl
                                bg-(--accent-primary)
                                px-6
                                text-sm
                                font-black
                                text-black
                                shadow-[0_15px_45px_var(--accent-glow)]
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-[0_20px_60px_var(--accent-glow)]
                                active:translate-y-0
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            <span
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-y-0
                                    -left-full
                                    w-1/2
                                    -skew-x-12
                                    bg-white/20
                                    transition-all
                                    duration-700
                                    group-hover:left-[120%]
                                "
                            />

                            {loading ? (
                                <>
                                    <span
                                        className="
                                            size-4
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-black/30
                                            border-t-black
                                        "
                                    />

                                    Sending reset link...
                                </>
                            ) : (
                                <>
                                    <LockIcon className="relative size-4.5" />

                                    <span className="relative">
                                        Send Reset Link
                                    </span>
                                </>
                            )}

                        </button>

                    </form>

                    {/* Footer */}

                    <p
                        className="
                            mt-7
                            text-center
                            text-[10px]
                            leading-5
                            text-white/20
                        "
                    >
                        If you didn't request a password
                        reset, you can safely ignore the
                        email.
                    </p>

                </div>

                {/* Branding */}

                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-white/15
                    "
                >
                    <FilmIcon className="size-3.5" />
                    CineScope
                </div>

            </div>

        </main>
    );
};

export default ForgotPassword;