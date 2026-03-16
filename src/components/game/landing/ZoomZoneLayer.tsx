export type ZoomZone = {
  id: string
  x: number
  y: number
  width: number
  height: number
  scale: number
}

const ZONES: ZoomZone[] = [
  { id: 'zone1', x: 100, y: 350, width: 400, height: 300, scale: 2.5 }, //cusar, spsc
  { id: 'zone2', x: 500, y: 300, width: 300, height: 350, scale: 2.5 }, //psy, ahs
  { id: 'zone3', x: 500, y: 650, width: 300, height: 350, scale: 3 }, //bascii
  { id: 'zone4', x: 850, y: 450, width: 250, height: 200, scale: 3 }, //pharm
  { id: 'zone5', x: 1100, y: 300, width: 400, height: 400, scale: 2.5 }, //dent, vet
  { id: 'zone6', x: 820, y: 750, width: 300, height: 400, scale: 3 }, //arch
  { id: 'zone7', x: 1150, y: 750, width: 300, height: 400, scale: 2.5 }, //arts, faa
  { id: 'zone8', x: 500, y: 1200, width: 300, height: 400, scale: 3 }, //edu, commarts, law
  { id: 'zone9', x: 820, y: 1200, width: 300, height: 500, scale: 3 }, //sci, cbs
  { id: 'zone10', x: 1150, y: 1200, width: 300, height: 500, scale: 3 }, //eng, polsci, econ
  { id: 'zone11', x: 1550, y: 1200, width: 250, height: 500, scale: 3 }, //md
]

export default function ZoomZoneLayer({
  onZoom,
}: {
  onZoom: (zone: ZoomZone) => void
}) {
  return (
    <>
      {ZONES.map((zone) => (
        <rect
          key={zone.id}
          x={zone.x}
          y={zone.y}
          width={zone.width}
          height={zone.height}
          fill="transparent"
          // fill="rgba(255, 0, 0, 0.25)"
          onClick={() => onZoom(zone)}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </>
  )
}
