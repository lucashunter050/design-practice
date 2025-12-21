"use client";
import React, { useEffect, useState } from "react";
import NaiveDot from "./NaiveDot";

interface Entity {
    id: number; 
    x: number; 
    y: number;
}


const NUM_ENTITIES = 5000;

export default function NaiveSimulation() {
    const [entities, setEntities] = useState<Entity[]>([]);

    useEffect(() => {
        const initial = Array.from({length: NUM_ENTITIES }, (_, i) => ({
            id: i, 
            x: Math.random() * 800, 
            y: Math.random() * 600, 
        }));
        setEntities(initial);
    }, []);

    useEffect(() => {
        let frameId: number;

        const update = () => {
            setEntities((prev) =>
                prev.map((e) => ({
                    ...e, 
                    x: e.x + (Math.random() - 0.5) * 2, 
                    y: e.y + (Math.random() - 0.5) * 2, 
                }))
            );
            frameId = requestAnimationFrame(update);
        };

        frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div style={{ position: 'relative', width: '800px', height: '600px', background: '#1a1a1a' }}>
        {entities.map((e) => (
            <NaiveDot 
                key={e.id}
                x={e.x}
                y={e.y}
                id={e.id}
            />
        ))}
        </div>
    );


}

