import Cloud from "./deco/Cloud";

type CloudConfig = {
    x: number;
    y: number;
    scale: number;
    driftSpeed: number;
    direction: 1 | -1;
};

const CLOUDS: CloudConfig[] = [
    { x: 100, y: 100, scale: 1, driftSpeed: 0.2, direction: 1 },
    { x: 500, y: 150, scale: 0.8, driftSpeed: 0.15, direction: -1 },
    { x: 800, y: 80, scale: 1.2, driftSpeed: 0.25, direction: 1 },
    { x: 1200, y: 120, scale: 0.9, driftSpeed: 0.1, direction: -1 },
    { x: 1600, y: 60, scale: 1.1, driftSpeed: 0.18, direction: 1 },
    { x: 1900, y: 150, scale: 1, driftSpeed: 0.20, direction: 1 },
    { x: 1800, y: 200, scale: 1.6, driftSpeed: 0.24, direction: -1 },
    { x: 1700, y: 480, scale: 2, driftSpeed: 0.07, direction: -1 },
    { x: 200, y: 680, scale: 1.8, driftSpeed: 0.07, direction: 1 },
    { x: 1000, y: 1000, scale: 2.5, driftSpeed: 0.05, direction: 1 },
    { x: 1900, y: 1500, scale: 2, driftSpeed: 0.05, direction: -1 },
]

export default function CloudLayer() {
    return (
        <g>
            {CLOUDS.map((config, index) => (
                <Cloud key={index} {...config} />
            ))}
        </g>
    )
}