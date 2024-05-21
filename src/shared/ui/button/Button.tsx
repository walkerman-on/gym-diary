import { FC, memo } from 'react';
import { Button as StyledButton } from './styles';
import { IButtonProps } from './IProps';

const ButtonF: FC<IButtonProps> = (props) => {
  return (
    <StyledButton color="inherit" {...props}>
      {props.children}
    </StyledButton>
  );
};

export const Button = memo(ButtonF);
