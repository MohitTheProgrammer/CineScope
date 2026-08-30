import { SearchIcon } from "../../assets/icons/Icons";

interface EmptySearchProps {
    query: string;
}

const EmptySearch = ({
    query,
}: EmptySearchProps) => {
    return (
        <div className="py-20 text-center">
            <div
                className="
                    mx-auto
                    mb-5
                    flex
                    size-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-white/30
                "
            >
                <SearchIcon className="size-5" />
            </div>

            <h2 className="text-lg font-bold text-white">
                No movies found
            </h2>

            <p className="mt-2 text-sm text-white/40">
                We couldn't find anything matching "{query}".
            </p>
        </div>
    );
};

export default EmptySearch;