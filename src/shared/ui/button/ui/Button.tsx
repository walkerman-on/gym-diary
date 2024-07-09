import { Button as MUIButton } from '@mui/material';
import { FC, memo } from 'react';
import { IButtonProps } from './IProps';

const ButtonF: FC<IButtonProps> = (props) => {
  return (
    <MUIButton
      sx={{
        background: '#282828',
        borderRadius: props.radius,
        color: 'var(--color-primary-white)',
        height: props.height,
        width: "100%",
        padding: '0 30px',
      }}
      style={{ flexGrow: 1, fontWeight: "800" }}
      {...props}
    >
      {props.children}
    </MUIButton>
  );
};

export const Button = memo(ButtonF);
