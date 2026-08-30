import type { Video } from "../../types/movie";

interface TrailerPlayerProps {
    trailer: Video;
}

const TrailerPlayer = ({
    trailer,
}: TrailerPlayerProps) => {
    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-black
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            "
        >
            <iframe
                key={trailer.key}
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                title={trailer.name}
                className="aspect-video w-full"
                allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share
                "
                allowFullScreen
            />
        </div>
    );
};

export default TrailerPlayer;