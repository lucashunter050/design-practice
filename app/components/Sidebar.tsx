"use client"
import React, {RefObject, useEffect, useState} from 'react'
import { useSimulation } from '../canvas-simulation/SimulationContext';


export default function Sidebar() {
  const { selectedId, entitiesRef } = useSimulation();
  const [currentPos, setCurrentPos] = useState({x: 0, y: 0});

  useEffect(() => {
    if (selectedId == null || !entitiesRef.current) return;

    let frameId: number;
    const sync = () => {
        const entity = entitiesRef.current?.find(e => e.id === selectedId);
        if (entity) {
            setCurrentPos({ x: entity.x, y: entity.y });
        }

        frameId = requestAnimationFrame(sync);
    };

    frameId = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(frameId);
  }, [selectedId, entitiesRef]);

  if (selectedId === null) return <div className="p-4">Select an entity</div>;
  
  return (
      <div className="p-4 border-l border-gray-700 w-64 bg-gray-900 text-white">
      <h2 className="font-bold">Entity Details</h2>
      <p>ID: {selectedId}</p>
      <p>X: {currentPos.x.toFixed(2)}</p>
      <p>Y: {currentPos.y.toFixed(2)}</p>
    </div>
  );
}
