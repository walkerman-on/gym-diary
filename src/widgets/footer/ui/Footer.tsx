import React, { FC, useCallback } from 'react';
import cl from "./Footer.module.scss"
import { Button } from 'shared/ui/button';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import classNames from 'classnames';
import { useAppSelector } from 'shared/lib/hooks';

interface IFooter {
    link: string,
    text: string,
    big?: boolean
}


export const Footer: FC<IFooter> = React.memo(({ link, text, big }) => {
    const { exercises } = useAppSelector(state => state?.workout.workout__current)
    const navigate = useNavigate();
    const addMoreBtnHandler = useCallback(() => {
        navigate(link);
    }, [])
    return (
        <footer className={classNames(cl.footer, { [cl.training__page]: big })}>
            {
                exercises.length === 0 && !big ? <ArrowLeftIcon onClick={addMoreBtnHandler} />
                    :
                    <Button height="60px" radius="15px" onClick={addMoreBtnHandler}>
                        {text}
                    </Button>
            }
        </footer>
    );
})
