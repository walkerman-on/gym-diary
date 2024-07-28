import { useContext } from "react";
import { StateContext } from "./StateContext";

export const useCounter = () => {
    const context = useContext(StateContext);

    if (context === null) {
        throw new Error('useCounter must be used within a CounterContextProvider');
    }

    return context;
};