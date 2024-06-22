import { Button as MUIButton } from '@mui/material';
import { FC, memo } from 'react';
import { IButtonProps } from './IProps';

const ButtonF: FC<IButtonProps> = (props) => {
  return (
    <MUIButton
      sx={{
        background: 'var(--color-primary-800)',
        borderRadius: props.radius,
        color: 'var(--color-primary-200)',
        height: props.height,
        width: "100%",
        padding: '0 30px',
        '&:hover': {
          backgroundColor: '#FF8E53',
        },
      }}
      style={{ flexGrow: 1, fontWeight: "800" }}
      {...props}
    >
      {props.children}
    </MUIButton>
  );
};

export const Button = memo(ButtonF);
