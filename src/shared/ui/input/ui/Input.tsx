import { Input as MUIInput } from '@mui/material';
import { FC, memo } from 'react';
import { IInputProps } from './IProps';

const InputF: FC<IInputProps> = ({placeholder}) => {
  return (
    <MUIInput
        sx={{
          background: 'var(--color-primary-600)',
          borderRadius: 2,
          height: 40,
          color: 'var(--color-primary-800)',
          padding: '0 30px',
          textAlign: "center"
        }}
          disableUnderline={true}
          placeholder={placeholder}

      />
  );
};

export const Input = memo(InputF);
