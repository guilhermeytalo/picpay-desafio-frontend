import styled from 'styled-components';
import Button from '../../../../components/Button';

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  > div:last-child {
    padding-right: 0;
  }
`;

export const ContentInput = styled.div`
  padding-right: ${({ theme }) => theme.spacings.small};
  padding-bottom: ${({ theme }) => theme.spacings.small};
`;

export const InputDate = styled.input`
  padding: 1rem;
  margin-right: 0rem;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding-right: 2.5rem;
  color: rgba(0, 0, 0, 0.6);
`;

export const ButtonCancel = styled(Button)`
  background-color: ${({ theme }) => theme.colors.grey} !important;
  color: ${({ theme }) => theme.colors.black} !important;
  margin-right: ${({ theme }) => theme.spacings.xsmall} !important;
`;
