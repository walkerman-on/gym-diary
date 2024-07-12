import React, { FC } from 'react';
import cl from "./Footer.module.scss"
import { Button } from 'shared/ui/button';
import { useNavigate } from 'react-router-dom';

interface IFooter {
    link: string,
    text: string
}

export const Footer: FC<IFooter> = ({ link, text }) => {
    const navigate = useNavigate();
    const addMoreBtnHandler = () => {
        navigate(link);
    };

    return (
        <div className={cl.footer}>
            <Button height="60px" radius="15px" onClick={addMoreBtnHandler}>
                {text}
            </Button>
        </div>
    );
};
