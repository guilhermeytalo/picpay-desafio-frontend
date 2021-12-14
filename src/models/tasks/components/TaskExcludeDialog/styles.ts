import styled from 'styled-components';
import Button from '../../../../components/Button';

export const Wrapper = styled.div`
  padding: 0.5rem;
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.black};
`;

export const ButtonCancel = styled(Button)`
  background-color: ${({ theme }) => theme.colors.grey} !important;
  color: ${({ theme }) => theme.colors.black} !important;
  margin-right: ${({ theme }) => theme.spacings.xsmall} !important;
`;
