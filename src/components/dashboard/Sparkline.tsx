import { useMemo } from "react";
import { motion } from "framer-motion";

interface Props {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

const Sparkline = ({ data, color, width = 80, height = 32 }: Props) => {
  const path = useMemo(() => {
    if (data.length < 2) return "";
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);

    const points = data.map((v, i) => ({
      x: i * stepX,
      y: height - ((v - min) / range) * (height - 4) - 2,
    }));

    // Smooth curve
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  }, [data, width, height]);

  const areaPath = useMemo(() => {
    if (!path) return "";
    return `${path} L ${width} ${height} L 0 ${height} Z`;
  }, [path, width, height]);

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#spark-${color})`}
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {data.length > 0 && (
        <motion.circle
          cx={width}
          cy={(() => {
            const max = Math.max(...data);
            const min = Math.min(...data);
            const range = max - min || 1;
            return height - ((data[data.length - 1] - min) / range) * (height - 4) - 2;
          })()}
          r={2.5}
          fill={color}
          initial={false}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
        />
      )}
    </svg>
  );
};

export default Sparkline;
