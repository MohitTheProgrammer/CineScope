import { useState } from "react";
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";
import {
    loginUser,
    registerUser,
} from "../../services/auth";
const AUTH_BACKDROP =
    "https://image.tmdb.org/t/p/original/wigZBAmNrIhxp2FNGOROUAeHvdh.jpg";

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === "/login";

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            if (!isLogin) {
                if (form.password !== form.confirmPassword) {
                    setError("Passwords do not match.");
                    return;
                }

                if (form.password.length < 6) {
                    setError(
                        "Password must be at least 6 characters."
                    );
                    return;
                }

                await registerUser(
                    form.name.trim(),
                    form.email.trim(),
                    form.password,
                    "01"
                );

                navigate("/");
            } else {
                await loginUser(
                    form.email.trim(),
                    form.password
                );

                navigate("/");
            }
        } catch (error: unknown) {
            console.error("Authentication error:", error);

            const errorCode = typeof error === "object" && error !== null && "code" in error
                ? String(error.code)
                : "";

            switch (errorCode) {
                case "auth/email-already-in-use":
                    setError(
                        "An account with this email already exists."
                    );
                    break;

                case "auth/invalid-email":
                    setError(
                        "Please enter a valid email address."
                    );
                    break;

                case "auth/weak-password":
                    setError(
                        "Password is too weak."
                    );
                    break;

                case "auth/invalid-credential":
                    setError(
                        "Invalid email or password."
                    );
                    break;

                case "auth/user-disabled":
                    setError(
                        "This account has been disabled."
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

    return (
        <main className="relative min-h-screen overflow-hidden bg-black">

            {/* ==========================================================
                BACKGROUND
            ========================================================== */}

            <div className="pointer-events-none absolute inset-0">

                <img
                    src={AUTH_BACKDROP}
                    alt=""
                    aria-hidden="true"
                    className="
                        h-full
                        w-full
                        object-cover
                        object-center
                    "
                />

                {/* Overall darkness */}

                <div className="absolute inset-0 bg-black/65" />

                {/* Left cinematic gradient */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-linear-to-r
                        from-black
                        via-black/80
                        to-black/30
                    "
                />

                {/* Right gradient */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-linear-to-l
                        from-black/60
                        via-transparent
                        to-transparent
                    "
                />

                {/* Bottom fade */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-1/2
                        bg-linear-to-t
                        from-black
                        to-transparent
                    "
                />
            </div>

            {/* Accent glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-1/3
                    size-96
                    rounded-full
                    bg-(--accent-primary)/10
                    blur-[140px]
                "
            />

            {/* ==========================================================
                NAVBAR
            ========================================================== */}

            <header className="absolute inset-x-0 top-0 z-30">
                <div
                    className="
                        mx-auto
                        flex
                        h-20
                        max-w-7xl
                        items-center
                        justify-between
                        px-6
                        lg:px-8
                    "
                >
                    <NavLink
                        to="/"
                        aria-label="CineScope home"
                        className="
                            group
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                text-2xl
                                font-black
                                tracking-[-0.06em]
                                text-white
                            "
                        >
                            Cine
                            <span
                                className="
                                    text-(--accent-primary)
                                    transition-all
                                    duration-300
                                    group-hover:[text-shadow:0_0_18px_var(--accent-glow)]
                                "
                            >
                                Scope
                            </span>
                        </span>

                        <span
                            className="
                                size-1.5
                                rounded-full
                                bg-(--accent-secondary)
                                shadow-[0_0_10px_var(--accent-secondary)]
                            "
                        />
                    </NavLink>

                    <NavLink
                        to="/"
                        className="
                            text-xs
                            font-semibold
                            text-white/40
                            transition-colors
                            hover:text-white
                        "
                    >
                        ← Back to CineScope
                    </NavLink>
                </div>
            </header>

            {/* ==========================================================
                MAIN CONTENT
            ========================================================== */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    max-w-7xl
                    items-center
                    px-6
                    py-28
                    lg:px-8
                "
            >
                <div
                    className="
                        grid
                        w-full
                        items-center
                        gap-16
                        lg:grid-cols-[1fr_420px]
                        xl:gap-24
                    "
                >

                    {/* ==================================================
                        LEFT CONTENT
                    ================================================== */}

                    <div className="hidden max-w-2xl lg:block">

                        {/* Eyebrow */}

                        <div
                            className="
                                mb-6
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    h-px
                                    w-10
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
                                Your movie universe
                            </span>
                        </div>

                        {/* Heading */}

                        <h1
                            className="
                                text-6xl
                                font-black
                                leading-[0.9]
                                tracking-tighter
                                text-white
                                xl:text-8xl
                            "
                        >
                            Movies
                            <br />

                            <span className="text-(--accent-primary)">
                                you'll
                            </span>

                            <br />

                            remember.
                        </h1>

                        <p
                            className="
                                mt-8
                                max-w-lg
                                text-sm
                                leading-7
                                text-white/45
                                xl:text-base
                            "
                        >
                            {isLogin
                                ? "Your movies. Your ratings. Your taste. Pick up where you left off and discover something worth watching."
                                : "Create your CineScope profile and start building a movie collection that actually reflects your taste."}
                        </p>

                        {/* Features */}

                        <div
                            className="
                                mt-10
                                flex
                                flex-wrap
                                items-center
                                gap-x-8
                                gap-y-3
                            "
                        >
                            <Feature text="Personal ratings" />
                            <Feature text="Watchlist" />
                            <Feature text="Recommendations" />
                        </div>
                    </div>

                    {/* ==================================================
                        AUTH CARD
                    ================================================== */}

                    <section
                        className="
                            w-full
                            max-w-md
                            justify-self-center
                            lg:justify-self-end
                        "
                    >

                        {/* Mobile heading */}

                        <div className="mb-7 lg:hidden">
                            <p
                                className="
                                    mb-2
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.3em]
                                    text-(--accent-primary)
                                "
                            >
                                {isLogin
                                    ? "Welcome back"
                                    : "Create account"}
                            </p>

                            <h1
                                className="
                                    text-4xl
                                    font-black
                                    tracking-tight
                                    text-white
                                "
                            >
                                {isLogin
                                    ? "Welcome back"
                                    : "Join CineScope"}
                            </h1>
                        </div>

                        {/* Fixed-size card */}

                        <div
                            className="
                                relative
                                min-h-175
                                w-full
                                overflow-hidden
                                rounded-3xl
                                border
                                border-white/10
                                bg-black/40
                                p-7
                                shadow-[0_25px_80px_rgba(0,0,0,0.5)]
                                backdrop-blur-2xl
                                sm:p-9
                            "
                        >

                            {/* ==================================================
                                CARD HEADER
                            ================================================== */}

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
                                    {isLogin
                                        ? "Sign in"
                                        : "Get started"}
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        text-2xl
                                        font-black
                                        text-white
                                    "
                                >
                                    {isLogin
                                        ? "Continue watching"
                                        : "Create your account"}
                                </h2>
                            </div>

                            {/* ==================================================
                                AUTH TOGGLE
                            ================================================== */}

                            <div
                                className="
                                    relative
                                    mb-7
                                    grid
                                    grid-cols-2
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-1
                                "
                            >
                                {/* Sliding active background */}

                                <div
                                    className={`
                                        pointer-events-none
                                        absolute
                                        inset-y-1
                                        left-1
                                        w-[calc(50%-4px)]
                                        rounded-lg
                                        bg-(--accent-primary)
                                        shadow-[0_0_20px_var(--accent-glow)]
                                        transition-transform
                                        duration-300
                                        ease-out
                                        ${isLogin
                                            ? "translate-x-0"
                                            : "translate-x-full"
                                        }
                                    `}
                                />

                                {/* Sign In */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        !loading && navigate("/login")
                                    }
                                    className={`
                                        relative
                                        z-10
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        text-xs
                                        font-bold
                                        transition-colors
                                        duration-300
                                        ${isLogin
                                            ? "text-white"
                                            : "text-white/40 hover:text-white/70"
                                        }
                                    `}
                                >
                                    Sign In
                                </button>

                                {/* Sign Up */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        !loading && navigate("/register")
                                    }
                                    className={`
                                        relative
                                        z-10
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        text-xs
                                        font-bold
                                        transition-colors
                                        duration-300
                                        ${!isLogin
                                            ? "text-white"
                                            : "text-white/40 hover:text-white/70"
                                        }
                                    `}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {/* ==================================================
                                ERROR
                            ================================================== */}

                            {error && (
                                <div
                                    className="
                                        mb-5
                                        rounded-xl
                                        border
                                        border-red-400/20
                                        bg-red-400/10
                                        px-4
                                        py-3
                                        text-xs
                                        text-red-300
                                    "
                                >
                                    {error}
                                </div>
                            )}

                            {/* ==================================================
                                FORMS
                            ================================================== */}

                            <div className="relative min-h-88.75">

                                {/* ================= LOGIN ================= */}

                                <div
                                    className={`
                                        absolute
                                        inset-x-0
                                        top-0
                                        transition-all
                                        duration-300
                                        ease-out
                                        ${isLogin
                                            ? "translate-x-0 opacity-100"
                                            : "-translate-x-8 pointer-events-none opacity-0"
                                        }
                                    `}
                                >
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <Input
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={form.email}
                                            onChange={
                                                handleChange
                                            }
                                            autoComplete="email"
                                            required
                                        />

                                        <Input
                                            label="Password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={
                                                form.password
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            autoComplete="current-password"
                                            required
                                            minLength={6}
                                        />

                                        <div className="flex justify-end">
                                            <Link
                                                to="/forgot-password"
                                                className="
        text-[11px]
        font-semibold
        text-white/35
        transition-colors
        hover:text-(--accent-primary)
    "
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <AuthButton
                                            loading={loading}
                                            text="Sign In"
                                        />
                                    </form>
                                </div>

                                {/* ================= REGISTER =============== */}

                                <div
                                    className={`
                                        absolute
                                        inset-x-0
                                        top-0
                                        transition-all
                                        duration-300
                                        ease-out
                                        ${!isLogin
                                            ? "translate-x-0 opacity-100"
                                            : "translate-x-8 pointer-events-none opacity-0"
                                        }
                                    `}
                                >
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <Input
                                            label="Name"
                                            name="name"
                                            type="text"
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={
                                                handleChange
                                            }
                                            autoComplete="name"
                                            required
                                        />

                                        <Input
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={form.email}
                                            onChange={
                                                handleChange
                                            }
                                            autoComplete="email"
                                            required
                                        />

                                        <Input
                                            label="Password"
                                            name="password"
                                            type="password"
                                            placeholder="Create a password"
                                            value={
                                                form.password
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            autoComplete="new-password"
                                            required
                                            minLength={6}
                                        />

                                        <Input
                                            label="Confirm password"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={
                                                form.confirmPassword
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            autoComplete="new-password"
                                            required
                                            minLength={6}
                                        />

                                        <AuthButton
                                            loading={loading}
                                            text="Create Account"
                                        />
                                    </form>
                                </div>
                            </div>

                            {/* ==================================================
                                TERMS
                            ================================================== */}

                            <p
                                className="
                                    absolute
                                    inset-x-7
                                    bottom-3
                                    text-center
                                    text-[10px]
                                    leading-5
                                    text-white/25
                                    sm:inset-x-9
                                "
                            >
                                By continuing, you agree to
                                CineScope's Terms of Service
                                and Privacy Policy.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

/* ========================================================================== */
/* Feature                                                                    */
/* ========================================================================== */

interface FeatureProps {
    text: string;
}

const Feature = ({ text }: FeatureProps) => {
    return (
        <div className="flex items-center gap-2">
            <span
                className="
                    size-1.5
                    rounded-full
                    bg-(--accent-primary)
                    shadow-[0_0_8px_var(--accent-primary)]
                "
            />

            <span
                className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-white/40
                "
            >
                {text}
            </span>
        </div>
    );
};

/* ========================================================================== */
/* Input                                                                      */
/* ========================================================================== */

interface InputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    autoComplete?: string;
    required?: boolean;
    minLength?: number;
}

const Input = ({
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    autoComplete,
    required,
    minLength,
}: InputProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isPassword = type === "password";

    return (
        <div>
            <label
                htmlFor={name}
                className="
                    mb-2
                    block
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-white/40
                "
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={isPassword && passwordVisible ? "text" : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    required={required}
                    minLength={minLength}
                    className="
                        w-full
                        border-b
                        border-white/10
                        bg-transparent
                        px-1
                        py-3
                        pr-12
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-white/20
                        transition-all
                        duration-300
                        focus:border-(--accent-primary)
                        focus:[box-shadow:0_1px_0_var(--accent-primary)]
                    "
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setPasswordVisible((visible) => !visible)}
                        aria-label={passwordVisible ? "Hide password" : "Show password"}
                        className="absolute bottom-0 right-0 px-1 py-3 text-[10px] font-bold uppercase tracking-wide text-white/40 transition-colors hover:text-(--accent-primary)"
                    >
                        {passwordVisible ? "Hide" : "Show"}
                    </button>
                )}
            </div>
        </div>
    );
};

/* ========================================================================== */
/* Auth Button                                                                */
/* ========================================================================== */

interface AuthButtonProps {
    loading: boolean;
    text: string;
}

const AuthButton = ({
    loading,
    text,
}: AuthButtonProps) => {
    return (
        <button
            type="submit"
            disabled={loading}
            className="
                mt-3
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-(--accent-primary)
                px-5
                py-3.5
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-white
                shadow-[0_0_25px_var(--accent-glow)]
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-[0_0_35px_var(--accent-glow)]
                disabled:pointer-events-none
                disabled:opacity-50
            "
        >
            {loading ? "Please wait..." : text}
        </button>
    );
};

export default AuthPage;
