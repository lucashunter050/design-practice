import React, { createContext, useContext, RefObject } from 'react';

interface SimulationContextType {
    selectedId: number | null;
    entitiesRef: RefObject<any[]>;
}

export const SimulationContext = createContext<SimulationContextType | null>(null);

export const useSimulation = () => {
    const context = useContext(SimulationContext);
    if (!context) throw new Error("useSimulation must be used within CanvasSimulation");
    return context;
};