import React from 'react';

import { Container } from './styles';

type ErrorMenssageProps = {
  children: string;
};
const ErrorMenssage = ({ children }: ErrorMenssageProps) => {
  return <Container>{children}</Container>;
};

export default ErrorMenssage;
