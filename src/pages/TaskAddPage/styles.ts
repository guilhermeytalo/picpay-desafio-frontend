import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.main`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.border.radius};
  padding: ${({ theme }) => theme.spacings.medium};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${({ theme }) => theme.spacings.medium};
`;
