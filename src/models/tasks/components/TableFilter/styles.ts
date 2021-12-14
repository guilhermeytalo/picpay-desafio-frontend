import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border: 2px solid ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.border.radius};
`;

export const InputFilter = styled.input`
  color: ${({ theme }) => theme.colors.darkGrey};
  border: 0;

  ::placeholder {
    color: ${({ theme }) => theme.colors.darkGrey};
    font-weight: 500;
  }
`;

export const ButtonFilter = styled.button`
  background: ${({ theme }) => theme.colors.grey};
  margin-left: 0.5rem;
  padding: 0.6rem;
  color: ${({ theme }) => theme.colors.black};
  border: 0;
  border-radius: ${({ theme }) => theme.border.radius};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.font.normal};

  display: flex;
  align-items: center;
  > svg {
    margin-right: 0.4rem;
  }
`;
