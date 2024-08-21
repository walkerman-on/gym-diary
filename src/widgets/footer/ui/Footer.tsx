import React, { FC, useCallback } from 'react';
import cl from "./Footer.module.scss"
import { Button } from 'shared/ui/button';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import classNames from 'classnames';

interface IFooter {
    link: string,
    text: string,
    small?: boolean
}


export const Footer: FC<IFooter> = React.memo(({ link, text, small }) => {
    const navigate = useNavigate();

    const addMoreBtnHandler = useCallback(() => {
        navigate(link);
    }, [])
    return (
        <footer className={classNames(cl.footer, { [cl.training__page]: small })}>
            {
                small ? <ArrowLeftIcon onClick={addMoreBtnHandler} />
                    :
                    <Button height="60px" radius="15px" onClick={addMoreBtnHandler}>
                        {text}
                    </Button>
            }
        </footer>
    );
})
