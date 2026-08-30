const MyListSkeleton = () => {
    return (
        <div
            className="
                mt-10
                grid
                grid-cols-2
                gap-x-5
                gap-y-9
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
            "
        >
            {Array.from(
                { length: 12 },
                (_, index) => (
                    <div
                        key={index}
                        className="
                            animate-pulse
                        "
                    >
                        <div
                            className="
                                aspect-2/3
                                rounded-2xl
                                bg-white/5
                            "
                        />

                        <div
                            className="
                                mt-3
                                h-4
                                w-3/4
                                rounded
                                bg-white/5
                            "
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default MyListSkeleton;