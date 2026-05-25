export function AtomLoader({ size = 80 }: { size?: number }) {
    const cx = size / 2;
    const rx = size * 0.37;
    const ry = size * 0.14;
    const eR = size * 0.075;
    const nR = size * 0.12;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Loading">
            <style>{`
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { r: ${nR}px; } 50% { r: ${nR * 1.3}px; } }
        .atom-nucleus { animation: pulse 2s ease-in-out infinite; transform-origin: ${cx}px ${cx}px; }
        .atom-e1 { animation: orbit 2.4s linear infinite; transform-origin: ${cx}px ${cx}px; }
        .atom-e2 { animation: orbit 3.2s linear infinite; transform-origin: ${cx}px ${cx}px; }
        .atom-e3 { animation: orbit 1.8s linear infinite; transform-origin: ${cx}px ${cx}px; }
      `}</style>

            {/* Orbit rings */}
            {[0, 60, 120].map((angle) => (
                <ellipse
                    key={angle}
                    cx={cx} cy={cx} rx={rx} ry={ry}
                    fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3"
                    transform={`rotate(${angle} ${cx} ${cx})`}
                />
            ))}

            {/* Nucleus */}
            <circle className="atom-nucleus" cx={cx} cy={cx} r={nR} fill="currentColor" opacity="0.9" />

            {/* Electrons */}
            <g className="atom-e1">
                <circle cx={cx + rx} cy={cx} r={eR} fill="#4a9eff" />
            </g>
            <g className="atom-e2" transform={`rotate(60 ${cx} ${cx})`}>
                <circle cx={cx + rx} cy={cx} r={eR} fill="#3ecf8e" />
            </g>
            <g className="atom-e3" transform={`rotate(120 ${cx} ${cx})`}>
                <circle cx={cx + rx} cy={cx} r={eR} fill="#f5a623" />
            </g>
        </svg>
    );
}