import { useEffect, useState } from "react";

import { getRandomHeroBackdrop } from "../../services/heroBackdrop";

interface HeroText {
    first: string;
    accent: string;
    last: string;
}

export const HERO_TEXTS: HeroText[] = [
    {
        first: "Discover",
        accent: "something",
        last: "unforgettable.",
    },
    {
        first: "Explore",
        accent: "incredible",
        last: "adventures.",
    },
    {
        first: "Uncover",
        accent: "captivating",
        last: "storylines.",
    },
    {
        first: "Experience",
        accent: "extraordinary",
        last: "masterpieces.",
    },
];

interface UseHeroResult {
    heroTextIndex: number;
    heroBackdrop: string;
}

const useHero = (
    uid?: string
): UseHeroResult => {
    const [heroTextIndex, setHeroTextIndex] =
        useState(() =>
            Math.floor(
                Math.random() *
                    HERO_TEXTS.length
            )
        );

    const [heroBackdrop, setHeroBackdrop] =
        useState("");

    useEffect(() => {
        let mounted = true;

        const loadBackdrop = async () => {
            try {
                const backdrop =
                    await getRandomHeroBackdrop(
                        uid ?? ""
                    );

                if (
                    mounted &&
                    backdrop
                ) {
                    setHeroBackdrop(backdrop);
                }
            } catch {
                return;
            }
        };

        void loadBackdrop();

        const interval = window.setInterval(() => {
            setHeroTextIndex(
                (previous) =>
                    (previous + 1) %
                    HERO_TEXTS.length
            );
        }, 5000);

        return () => {
            mounted = false;
            window.clearInterval(interval);
        };
    }, [uid]);

    return {
        heroTextIndex,
        heroBackdrop,
    };
};

export default useHero;
