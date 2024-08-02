import { Button as MUIButton } from '@mui/material';
import { FC, memo } from 'react';
import { IButtonProps } from './IProps';

const ButtonF: FC<IButtonProps> = (props) => {
  return (
    <MUIButton
      sx={{
        background: 'var(--color-primary-400)',
        borderRadius: props.radius,
        color: 'var(--color-primary-white)',
        height: props.height,
        flexGrow: "1",
        padding: '0 30px',
        '&:hover': {
          backgroundColor: 'var(--color-primary-400)',
        },
        '&:active': {
          backgroundColor: 'var(--color-primary-200)',
        },
      }}
      style={{ fontWeight: "800" }}
      {...props}
    >
      {props.children}
    </MUIButton>
  );
};

export const Button = memo(ButtonF);
