import styled from 'styled-components';

export const Container = styled.p`
  margin-left: ${({ theme }) => theme.spacings.xxsmall};
  color: ${({ theme }) => theme.colors.error};
`;
