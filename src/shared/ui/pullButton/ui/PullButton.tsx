import React, { FC } from 'react';
import cl from "./PullButton.module.scss"

interface IPullButton {
    onClick: () => void;
}

export const PullButton:FC<IPullButton> = ({onClick}) => {
    return (
         <div className={cl.PullButton} onClick={onClick}></div>
    );
};
