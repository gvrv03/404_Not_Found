"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

export function LocationPicker({XCordinate=50,YCordinates=50,setXCordinate,setYCordinate}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: XCordinate, y: YCordinates });

  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const container = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - container.left) / container.width) * 100;
      const y = ((e.clientY - container.top) / container.height) * 100;

      setPosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
      setXCordinate(Math.max(0, Math.min(100, x)))
      setYCordinate(Math.max(0, Math.min(100, y)))
    }
  };

  return (
    <div
      className="relative w-[100%] h-[100%]  rounded-md bg-cover bg-center cursor-move"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute flex flex-col items-center"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -100%)",
        }}
      >
        <MapPin className="h-8 w-8 text-primary" />
        <div className="bg-background shadow-md rounded-md px-2 py-1 text-xs font-medium -mt-1">
          Drag to position
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-background/90 p-2 rounded-md text-xs">
        Campus Map - Click and drag the pin to mark location
      </div>
    </div>
  );
}
