import { ButtonProps } from '@mui/material/Button';

import { Container } from './styles';

const Button = ({ children, ...rest }: ButtonProps) => {
  return <Container {...rest}>{children}</Container>;
};

export default Button;
