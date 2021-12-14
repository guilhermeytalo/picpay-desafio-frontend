import styled from 'styled-components';

export const Image = styled.img`
  width: 150px;
`;

export const Error = styled.p`
  margin-left: ${({ theme }) => theme.spacings.xxsmall};
  color: ${({ theme }) => theme.colors.error};
`;
