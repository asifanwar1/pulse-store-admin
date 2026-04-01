import type { ProductIconConfig } from "./productIcons.config";

interface ProductMatrixScrollProps {
    icons: ProductIconConfig[];
}

const COLUMN_COUNT = 4;

const COLUMN_DIRECTIONS: ("up" | "down")[] = ["up", "down", "up", "down"];

const COLUMN_DURATIONS = [22, 30, 25, 18];

const ProductMatrixScroll = ({ icons }: ProductMatrixScrollProps) => {
    const columns = Array.from({ length: COLUMN_COUNT }, (_, colIndex) =>
        icons.filter((_, i) => i % COLUMN_COUNT === colIndex),
    );

    return (
        <div
            className="relative w-full h-full overflow-hidden"
            style={{
                WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
                maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
            }}
        >
            {/* Brand name overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                <div
                    className="flex flex-col items-center gap-2 px-8 py-5 rounded-3xl"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, rgba(249,245,239,0.92) 55%, transparent 100%)",
                    }}
                >
                    <span
                        className="font-bold tracking-widest text-3xl leading-none"
                        style={{ fontFamily: "var(--font-archivo)", color: "#2A5C42" }}
                    >
                        Pulse Store
                    </span>
                    <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#1C2B22", opacity: 0.5 }}>
                        Admin Panel
                    </span>
                </div>
            </div>

            <div className="flex gap-3 h-full px-3">
                {columns.map((col, colIndex) => {
                    const doubled = [...col, ...col];
                    const direction = COLUMN_DIRECTIONS[colIndex];
                    const duration = COLUMN_DURATIONS[colIndex];

                    return (
                        <div key={colIndex} className="flex-1 overflow-hidden">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                    willChange: "transform",
                                    animation: `${
                                        direction === "up"
                                            ? "matrixScrollUp"
                                            : "matrixScrollDown"
                                    } ${duration}s linear infinite`,
                                }}
                            >
                                {doubled.map((item, i) => (
                                    <div
                                        key={`${item.id}-${i}`}
                                        className="flex flex-col items-center justify-center rounded-2xl aspect-square p-2 shrink-0"
                                        style={{ background: "rgba(28,43,34,0.06)", border: "1px solid rgba(28,43,34,0.1)" }}
                                    >
                                        <div className="flex items-center justify-center flex-1">
                                            {item.icon}
                                        </div>
                                        {item.label && (
                                            <span className="text-[9px] mt-1 text-center w-full truncate leading-none" style={{ color: "#1C2B22", opacity: 0.5 }}>
                                                {item.label}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductMatrixScroll;
