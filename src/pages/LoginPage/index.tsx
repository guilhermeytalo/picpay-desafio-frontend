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

        {/* <form onSubmit={handleSubmit(handleSubmitForm)}>
          <S.Image src={Logo} alt="Logo com a escrita Pay Friends" />
          <h1>Bem vindo de volta</h1>

          {loginError && <S.Error>{loginError}</S.Error>}

          <Controller
            name="email"
            control={control}
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <TextField error={!!errors.email} label="Email" {...field} />
            )}
          />
          {errors.email && <S.Error>{errors.email.message}</S.Error>}

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <TextField
                type="password"
                error={!!errors.password}
                label="Senha"
                {...field}
              />
            )}
          />
          {errors.password && <S.Error>{errors.password.message}</S.Error>}

          <S.Button type="submit" variant="contained">
            Entrar
          </S.Button>
        </form> */}
      </S.Content>

      <S.Background />
    </S.Container>
  );
};

export default LoginPage;
