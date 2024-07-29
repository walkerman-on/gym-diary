import React, { FC } from 'react';
import cl from "./Footer.module.scss"
import { Button } from 'shared/ui/button';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';

interface IFooter {
    link: string,
    text: string
}

export const Footer: FC<IFooter> = React.memo(({ link, text }) => {
    const navigate = useNavigate();
    const addMoreBtnHandler = () => {
        navigate(link);
    };

    return (
        <footer className={cl.footer}>
            <ArrowLeftIcon onClick={addMoreBtnHandler} />
            <Button height="60px" radius="15px" onClick={addMoreBtnHandler}>
                {text}
            </Button>
        </footer>
    );
})
