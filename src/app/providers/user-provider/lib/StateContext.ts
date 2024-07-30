import { createContext } from 'react';

interface StateContextType {
    btnCount: number;
    depthCount: number,
    incrementBtnCount: () => void;
    incrementDepthCount: () => void;
    decrementDepthCount: () => void;
};

export const StateContext = createContext<StateContextType | null>(null);