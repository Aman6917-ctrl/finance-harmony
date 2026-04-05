import { useRef, useState, useCallback } from "react";

export function useTilt3D(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    transition: "transform 0.1s ease",
  });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02,1.02,1.02)`,
      transition: "transform 0.1s ease",
    });
  }, [intensity]);

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.4s ease",
    });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}
