import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../models/auth/types';
import LoginForm from '../../models/auth/components/LoginForm';

import * as S from './styles';
import { useStore } from '../../app/stores';

const LoginPage = () => {
  const navigation = useNavigate();
  const { authStore } = useStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loginError, setLoginError] = useState<string>('');

  const handleSubmitForm = async (data: FormValues) => {
    setLoginError('');
    try {
      await authStore.login(data);

      navigation('/tasks');
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  return (
    <S.Container>
      <S.Content>
        <LoginForm
          control={control}
          errors={errors}
          loginError={loginError}
          onSubmitForm={handleSubmit(handleSubmitForm)}
        />
      </S.Content>

      <S.Background />
    </S.Container>
  );
};

export default LoginPage;
