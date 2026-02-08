import { Piece, PieceProps } from "@/components/game/Piece"

type PieceOnMapProps = PieceProps & {
  x: number
  y: number
  scale?: number
}

export default function PieceOnMap({
  x,
  y,
  scale = 1,
  ...pieceProps
}: PieceOnMapProps) {
  const size = pieceProps.size ?? 120
  

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <foreignObject   
        x={-size / 2}
        y={-size / 2}
        width={size}
        height={size}
        >
            <div
                {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as unknown as React.HTMLAttributes<HTMLDivElement>)}
            >
                <Piece {...pieceProps} size={size} />
            </div>
        </foreignObject>
    </g>
  )
}
