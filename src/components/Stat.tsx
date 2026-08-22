interface StatProps {
    value: string;
    label: string;
}

const Stat = ({ value, label }: StatProps) => {
    return (
        <div>
            <p className="text-lg font-black text-white">
                {value}
            </p>

            <p
                className="
                    mt-0.5
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-white/40
                "
            >
                {label}
            </p>
        </div>
    );
};

export default Stat