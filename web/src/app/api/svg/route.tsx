import { ImageResponse } from "next/og"

export const runtime = "edge"

const palette = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFBE0B", "#FB5607", "#8338EC", "#3A86FF"]
const rand = (max: number) => Math.floor(Math.random() * max)
const randFloat = (min = 0.4, max = 0.8) => Math.random() * (max - min) + min

export async function GET() {
  // const { searchParams } = new URL(request.url)
  // const title = searchParams.get("title") ?? "Abstract Design"

  const shapes = Array.from({ length: 6 }).map((_, i) => {
    const x = rand(1500)
    const y = rand(500)
    const x2 = rand(1500)
    const y2 = rand(500)
    // const size = rand(180) + 60
    const fill = palette[rand(palette.length)]
    const opacity = randFloat().toFixed(2)

    // switch (i % 3) {
    //   case 0:
    //     return <circle key={i} cx={x} cy={y} r={size / 2} fill={fill} fillOpacity={opacity} />
    //   case 1:
    //     return <rect key={i} x={x} y={y} width={size} height={size} fill={fill} fillOpacity={opacity} />
    //   default:
        return (
          // <polygon
          //   key={i}
          //   points={`${x},${y} ${x + size},${y + size} ${x - size / 2},${y + size}`}
          //   fill={fill}
          //   fillOpacity={opacity}
          // />
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x2}
            y2={y2}
            stroke={fill}
            strokeWidth={rand(10) + 5}
            strokeOpacity={opacity}/>
        )
    // }
  })

  return new ImageResponse(
    <svg width="1500" height="500" viewBox="0 0 1500 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="1500" height="500" fill="#304b54" />
      {shapes}
      {/* <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="sans-serif"
        fontSize="64"
        fontWeight="700"
        fill="#333"
      >
        {title}
      </text> */}
    </svg>,
    { width: 1500, height: 500},
  )
}