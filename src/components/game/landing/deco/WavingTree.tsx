import tree from '@/assets/game/deco/purple-tree.svg?url'

export default function WavingTree({
  x,
  y,
  scale = 1,
}: {
  x: number
  y: number
  scale?: number
}) {
    const delay = -(Math.random() * 5)
    const duration = 4 + Math.random() * 3

    return (
        <g transform={`translate(${x}, ${y})`}>
        <g transform={`scale(${scale})`}>
            <image
            href={tree}
            width={57}
            height={144}
            x={-28.5}
            y={-144}
            className="tree-sway"
            style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
            }}
            />
        </g>
        </g>
    )
}
