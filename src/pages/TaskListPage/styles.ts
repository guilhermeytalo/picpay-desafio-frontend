import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  padding: ${({ theme }) => theme.spacings.medium};
  padding-bottom: 0;
`;

export const Title = styled.h1`
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${({ theme }) => theme.spacings.medium};
`;
