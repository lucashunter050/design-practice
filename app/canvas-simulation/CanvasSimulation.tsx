"use client";
import React, { useRef, useEffect, useState, MouseEvent, ReactNode } from 'react';
import { SimulationContext } from './SimulationContext';


export default function CanvasSimulation({children}: {children: ReactNode}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const SIMULATION_ENTITIES = 100;

    function getRandomUint32(): number {
        const maxUint32 = 4294967296; // 2**32
        return (Math.random() * maxUint32) >>> 0;
    }

    const entitiesRef = useRef(Array.from({length: SIMULATION_ENTITIES}, () => ({
        id: getRandomUint32(),
        x: Math.random() * 800, 
        y: Math.random() * 600, 
        vx: (Math.random() - 0.5) * 2, 
        vy: (Math.random() - 0.5) * 2, 
    })));

    const selectedIdRef = useRef<number | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleCanvasClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return; 

        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const clickRadius = 10;
        let foundId: number | null = null; 

        for (const entity of entitiesRef.current) {
            const dx = clickX - entity.x;
            const dy = clickY - entity.y; 
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < clickRadius) {
                foundId = entity.id;
                break;
            }
        }

        selectedIdRef.current = foundId;
        setSelectedId(foundId);

        setSelectedId(foundId);
    }

    useEffect(() => {
        const canvas = canvasRef.current; 
        if (!canvas) return; 

        const ctx = canvas.getContext('2d');
        if (!ctx) return; 

        const dpr = window.devicePixelRatio || 1;
        canvas.width = 800 * dpr;
        canvas.height = 600 * dpr;
        ctx.scale(dpr, dpr);

        const render = () => {
            entitiesRef.current.forEach(e => {
                e.x += e.vx;
                e.y += e.vy;

                if (e.x < 0 || e.x > 800) e.vx *= -1;
                if (e.y < 0 || e.y > 600) e.vy *= -1;
            });

            ctx.clearRect(0, 0, 800, 600);
            entitiesRef.current.forEach(e => {
                if (e.id == selectedIdRef.current) {
                    ctx.fillStyle = '#ffffff'
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#ffffff'
                    ctx.fillRect(e.x - 2, e.y, 6, 6);
                    ctx.shadowBlur = 0;
                } else {
                    ctx.fillStyle = '#00ff00';
                    ctx.fillRect(e.x, e.y, 2, 2);
                }
            });

            requestAnimationFrame(render);
        }

        const frameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <SimulationContext.Provider value={{ selectedId, entitiesRef }}>
            <div className="flex">
                <canvas 
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onClick={handleCanvasClick}
                    style={{ background: '#1a1a1a', border: '1px solid #333' }}
                />
                {children}
            </div>
        </SimulationContext.Provider>
    );
}