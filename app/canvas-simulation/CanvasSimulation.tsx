"use client";
import React, { useRef, useEffect } from 'react';


export default function CanvasSimulation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const entitiesRef = useRef(Array.from({length: 10000}, () => ({
        x: Math.random() * 800, 
        y: Math.random() * 600, 
        vx: (Math.random() - 0.5) * 2, 
        vy: (Math.random() - 0.5) * 2, 
    })));

    useEffect(() => {
        const canvas = canvasRef.current; 
        if (!canvas) return; 

        const ctx = canvas.getContext('2d');
        if (!ctx) return; 

        const render = () => {
            entitiesRef.current.forEach(e => {
                e.x += e.vx;
                e.y += e.vy;

                if (e.x < 0 || e.x > 800) e.vx *= -1;
                if (e.y < 0 || e.y > 600) e.vy *= -1;
            });

            ctx.clearRect(0, 0, 800, 600);
            ctx.fillStyle = '#00ff00';
            entitiesRef.current.forEach(e => {
                ctx.fillRect(e.x, e.y, 2, 2);
            });

            requestAnimationFrame(render);
        }

        const frameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <canvas 
        ref={canvasRef}
        width={800}
        height={600}
        style={{background: '#1a1a1a', border: '1px solid #333'}}
        />
    )
}