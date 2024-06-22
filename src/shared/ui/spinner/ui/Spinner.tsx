import React from 'react';
import cl from "./Spinner.moduel.scss"

export const Spinner = () => {
    return (
        <div className={cl.spinner}>
            <div className={cl.ball}></div>
            <p className={cl.title}>Loading</p>
        </div>
    );
};
