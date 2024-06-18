import { Input as MUIInput } from '@mui/material';
import { FC, memo } from 'react';
import { IInputProps } from './IProps';

const InputF: FC<IInputProps> = (props) => {
  return (
    <MUIInput
        sx={{
          background: 'var(--color-primary-600)',
          borderRadius: 2,
          height: props.height,
          color: 'var(--color-primary-800)',
          padding: '0 30px',
          // textAlign: "center",
          width: "100%",
        }}
          disableUnderline={true}
          placeholder={props.placeholder}
        {...props}
      />
  );
};

export const Input = memo(InputF);
