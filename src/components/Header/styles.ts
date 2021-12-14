import styled from 'styled-components';

export const Header = styled.header`
  width: 100wh;
  height: ${({ theme }) => theme.spacings.xxlarge};
  background: ${({ theme }) => theme.colors.blue};
  padding: 0 ${({ theme }) => theme.spacings.small};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  font-size: ${({ theme }) => theme.font.sizes.large};
  color: ${({ theme }) => theme.colors.white};
`;

export const WrapperAvatar = styled.div`
  display: flex;
  align-items: center;

  button {
    background: transparent;
    border: 0;
    margin-top: ${({ theme }) => theme.spacings.xsmall};
    padding: ${({ theme }) => theme.spacings.xsmall};
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.font.bold};
  }
`;
