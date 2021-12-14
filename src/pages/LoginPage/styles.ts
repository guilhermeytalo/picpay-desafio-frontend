import styled from 'styled-components';
import media from 'styled-media-query';

import SignInBackground from '../../assets/signinbackground.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;

  ${media.greaterThan('large')`
    flex-direction: row;
    background-size: auto;
    align-items: stretch;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
  color: ${({ theme }) => theme.colors.black};

  form {
    margin: 80px 0;
    width: 340px;
    text-align: left;

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacings.xxsmall};

    h1 {
      font-weight: 600;
      margin-bottom: ${({ theme }) => theme.spacings.xsmall};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignInBackground}) no-repeat center;
  background-color: ${({ theme }) => theme.colors.white};
  background-size: contain;

  ${media.greaterThan('large')`
    background-size: auto;
    align-items: stretch;
  `}
`;
