import { FC, ReactNode, useState } from "react";
import { StateContext } from "../lib/StateContext";

interface ICounterProvider {
    children: ReactNode;
}

export const StateProvider: FC<ICounterProvider> = ({ children }) => {
    const [btnCount, setBtnCount] = useState<number>(0);
    const [depthCount, setDepthCount] = useState<number>(1);

    const incrementBtnCount = () => {
        setBtnCount(btnCount => btnCount + 1);
    };

    const incrementDepthCount = () => {
        setDepthCount(depthCount => depthCount + 1);
    };

    const decrementDepthCount = () => {
        if (depthCount > 1) {
            setDepthCount(depthCount => depthCount - 1);
        }
    };

    return (
        <StateContext.Provider value={{ btnCount, depthCount, incrementBtnCount, incrementDepthCount, decrementDepthCount }}>
            {children}
        </StateContext.Provider>
    );
};
