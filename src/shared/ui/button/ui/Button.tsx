import { Button as MUIButton } from '@mui/material';
import { FC, memo } from 'react';
import { IButtonProps } from './IProps';

const ButtonF: FC<IButtonProps> = (props) => {
  return (
    <MUIButton
        sx={{
          background: 'var(--color-primary-800)',
          borderRadius: 5,
          color: 'var(--color-primary-200)',
          height: 60,
          padding: '0 30px',
          '&:hover': {
            backgroundColor: '#FF8E53',
          },
        }}
        style={{ flexGrow: 1 }}
      >
        {props.children}
      </MUIButton>
  );
};

export const Button = memo(ButtonF);
