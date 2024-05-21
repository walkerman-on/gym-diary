import styled from 'styled-components';

import { Button as MUIButton } from '@mui/material';
import { theme} from 'app/styles/theme'

export const Button = styled(MUIButton)`
  background-color: ${theme.colors.background} !important;
  border-color: ${theme.colors.primary_200};
  padding: 0 !important;
  align-self: center;
`;
