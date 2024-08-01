import React, { FC } from 'react';
import cl from "./Footer.module.scss"
import { Button } from 'shared/ui/button';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import classNames from 'classnames';

interface IFooter {
    link: string,
    text: string,
    training__page?: boolean
}

export const Footer: FC<IFooter> = React.memo(({ link, text, training__page }) => {
    const navigate = useNavigate();
    const addMoreBtnHandler = () => {
        navigate(link);
    };

    return (
        <footer className={classNames(cl.footer, { [cl.training__page]: training__page })}>
            {
                !training__page && <ArrowLeftIcon onClick={addMoreBtnHandler} />
            }
            <Button height="60px" radius="15px" onClick={addMoreBtnHandler}>
                {text}
            </Button>
        </footer>
    );
})
