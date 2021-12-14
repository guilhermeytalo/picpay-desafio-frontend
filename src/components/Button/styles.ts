import styled from 'styled-components';
import ButtonUI from '@mui/material/Button';

export const Container = styled(ButtonUI)`
  margin-top: ${({ theme }) => theme.spacings.xsmall} !important;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: none !important;
`;
