"use client";

import React, { ReactNode, useRef, useState } from "react";

interface TitleTagProps {
  title: string | ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  children: ReactNode;
}

const TitleTag: React.FC<TitleTagProps> = ({
  title,
  position = "top",
  delay = 300,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };

  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case "top":
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(-8px)",
        };
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(8px)",
        };
      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%) translateX(-8px)",
        };
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%) translateX(8px)",
        };
      default:
        return {};
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className="absolute z-50 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white"
          style={getPositionStyles()}
        >
          {title}
          <div
            className={`absolute h-2 w-2 rotate-45 transform bg-gray-800 ${
              position === "top"
                ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                : position === "bottom"
                  ? "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  : position === "left"
                    ? "right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
                    : "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default TitleTag;
