import { Input as MUIInput } from '@mui/material';
import { FC, memo } from 'react';
import { IInputProps } from './IProps';

const InputF: FC<IInputProps> = ({
  height,
  background = 'var(--color-primary-200)',
  placeholder,
  ...otherProps
}) => {
  return (
    <MUIInput
      sx={{
        background: background,
        borderRadius: 2,
        height: height,
        color: 'var(--color-primary-800)',
        padding: '0 30px',
        width: "100%",
      }}
      disableUnderline={true}
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

export const Input = memo(InputF);
