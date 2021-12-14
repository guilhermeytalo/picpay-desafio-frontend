import api from '../../../services/api';
import { FormValues } from '../types';

const login = async ({ email, password }: FormValues) => {
  const { data } = await api.get('account');
  const user = data[0];

  if (user.email === email && user.password === password) {
    return user;
  }

  throw new Error('Usuário ou senha não conferem');
};

export { login };
