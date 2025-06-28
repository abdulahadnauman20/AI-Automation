import { useEffect, useRef } from "react";

function StatsChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive canvas sizing
    const size = Math.min(window.innerWidth < 640 ? 160 : 200, 200);
    canvas.width = size;
    canvas.height = size;

    // Set up the circular progress chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius =
      Math.min(centerX, centerY) - (window.innerWidth < 640 ? 15 : 20);

    // Draw segments
    const segments = [
      { color: "#7a858b", value: 17 },
      { color: "#4285f4", value: 17 },
      { color: "#fb8805", value: 17 },
      { color: "#1baf6b", value: 16 },
      { color: "#9747ff", value: 16 },
      { color: "#fbbc05", value: 17 },
    ];

    let startAngle = -Math.PI / 2;
    segments.forEach((segment) => {
      const endAngle = startAngle + (2 * Math.PI * segment.value) / 100;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineWidth = window.innerWidth < 640 ? 10 : 13;
      ctx.strokeStyle = segment.color;
      ctx.stroke();

      startAngle = endAngle;
    });
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="relative flex items-center justify-center group w-fit mx-auto">
        {/* Canvas (Moves Left on Hover) */}
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="transition-transform duration-300 ease-in-out transform group-hover:-translate-x-6 sm:group-hover:-translate-x-9"
        />

        {/* Text (Appears on Hover) */}
        <div className="absolute left-[105%] sm:left-[110%] opacity-0 translate-x-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0">
          <div className="text-lg sm:text-2xl font-semibold">2</div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            Replies
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 text-center divide-x divide-gray-300">
        {[
          { value: 200, label: "No's. Dialed", color: "#7a858b" },
          { value: 1200, label: "Emails sent", color: "#4285f4" },
          { value: 520, label: "Replied", color: "#fb8805" },
          { value: 30, label: "Calls Clicked", color: "#1baf6b" },
          { value: 600, label: "Opened", color: "#9747ff" },
          { value: 10, label: "Opportunities", color: "#fbbc05" },
        ].map((item, index) => (
          <div key={index} className="px-2 sm:px-4 py-2 sm:py-3">
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <div className="text-sm sm:text-xl font-semibold">
                  {item.value}
                </div>
              </div>
              <div className="text-[10px] sm:text-[12px] text-gray-500 text-center leading-tight">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsChart;
