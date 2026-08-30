import type { ReactNode } from "react";

interface HowItWorksStepProps {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    reverse?: boolean;
    children: ReactNode;
}

const HowItWorksStep = ({
    number,
    eyebrow,
    title,
    description,
    reverse = false,
    children,
}: HowItWorksStepProps) => {
    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-6
                py-12
                sm:py-16
                lg:px-8
            "
        >
            <div
                className={`
                    grid
                    items-center
                    gap-10
                    lg:grid-cols-2
                    lg:gap-20
                    ${
                        reverse
                            ? "lg:[&>*:first-child]:order-2"
                            : ""
                    }
                `}
            >
                {/* Text */}

                <div>
                    <div className="flex items-center gap-3">
                        <span
                            className="
                                text-4xl
                                font-black
                                tracking-tighter
                                text-white/10
                                sm:text-5xl
                            "
                        >
                            {number}
                        </span>

                        <span
                            className="
                                h-px
                                w-8
                                bg-(--accent-primary)/40
                                sm:w-10
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.25em]
                                text-(--accent-primary)
                            "
                        >
                            {eyebrow}
                        </span>
                    </div>

                    <h2
                        className="
                            mt-4
                            max-w-xl
                            text-3xl
                            font-black
                            tracking-tight
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        {title}
                    </h2>

                    <p
                        className="
                            mt-4
                            max-w-xl
                            text-sm
                            leading-7
                            text-white/40
                            sm:text-base
                        "
                    >
                        {description}
                    </p>
                </div>

                {/* Demo */}

                <div className="w-full">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksStep;