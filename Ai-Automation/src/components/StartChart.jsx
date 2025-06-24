import { useEffect, useRef } from "react"

function StatsChart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up the circular progress chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    // Draw segments
    const segments = [
      { color: "#7a858b", value: 17 }, 
      { color: "#4285f4", value: 17 },
      { color: "#fb8805", value: 17 }, 
      { color: "#1baf6b", value: 16 },
      { color: "#9747ff", value: 16 },
      { color: "#fbbc05", value: 17 }, 
    ]

    let startAngle = -Math.PI / 2
    segments.forEach((segment) => {
      const endAngle = startAngle + (2 * Math.PI * segment.value) / 100

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.lineWidth = 13
      ctx.strokeStyle = segment.color
      ctx.stroke()

      startAngle = endAngle
    })
  }, [])

  return (
    <div className="space-y-6">
      <div className="relative flex items-center justify-center group w-fit mx-auto">
        {/* Canvas (Moves Left on Hover) */}
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="transition-transform duration-300 ease-in-out transform group-hover:-translate-x-9"
        />

        {/* Text (Appears on Hover) */}
        <div
          className="absolute left-[110%] opacity-0 translate-x-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0"
        >
          <div className="text-2xl font-semibold">2</div>
          <div className="text-sm text-muted-foreground">Replies</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-semibold">200</div>
          <div className="text-sm text-muted-foreground">No's. Dialed</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">1200</div>
          <div className="text-sm text-muted-foreground">Emails sent</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">520</div>
          <div className="text-sm text-muted-foreground">Replied</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">30</div>
          <div className="text-sm text-muted-foreground">Calls Clicked</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">600</div>
          <div className="text-sm text-muted-foreground">Opened</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">10</div>
          <div className="text-sm text-muted-foreground">Opportunities</div>
        </div>
      </div>
    </div>
  )
}


export default StatsChart;