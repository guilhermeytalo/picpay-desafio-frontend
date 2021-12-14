import { Control, Controller, FieldErrors } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '../../../../components/Button';
import { FormValues } from '../../types';
import Logo from '../../../../assets/Logo.svg';

import * as S from './styles';
import ErrorMenssage from '../../../../components/ErrorMenssage';

type LoginFormProps = {
  errors: FieldErrors;
  control: Control<FormValues, object>;
  loginError: string;
  onSubmitForm(): void;
};

const LoginForm = ({
  errors,
  control,
  loginError,
  onSubmitForm,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmitForm}>
      <S.Image src={Logo} alt="Logo com a escrita Pay Friends" />
      <h1>Bem vindo de volta</h1>

      {loginError && <ErrorMenssage>{loginError}</ErrorMenssage>}

      <Controller
        name="email"
        control={control}
        rules={{ required: 'Campo obrigatório' }}
        render={({ field }) => (
          <TextField error={!!errors.email} label="Email" {...field} />
        )}
      />
      {errors.email && <ErrorMenssage>{errors.email.message}</ErrorMenssage>}

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
      {errors.password && (
        <ErrorMenssage>{errors.password.message}</ErrorMenssage>
      )}

      <Button type="submit" variant="contained">
        Entrar
      </Button>
    </form>
  );
};

export default LoginForm;
