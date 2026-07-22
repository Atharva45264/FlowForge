"use client";

import { animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1,
  className,
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [motionValue, value, duration]);

  return <span className={className}>{displayValue}</span>;
}