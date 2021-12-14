import { Control, Controller, FieldErrors } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { Box, TextField } from '@mui/material';
import Button from '../../../../components/Button';
import { TaskData } from '../../types';

import * as S from './styles';

type TaskFormProps = {
  errors: FieldErrors;
  control: Control<TaskData, object>;
  onSubmit(): void;
  onCancel(): void;
  dataUpdate?: TaskData;
};

const TaskForm = ({
  errors,
  control,
  onSubmit,
  onCancel,
  dataUpdate,
}: TaskFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <S.WrapperInput>
        <S.ContentInput>
          <Controller
            name="user"
            defaultValue={dataUpdate?.user}
            control={control}
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <TextField error={!!errors.user} label="Usuário*" {...field} />
            )}
          />
          {errors.user && <p>{errors.user.message}</p>}
        </S.ContentInput>

        <S.ContentInput>
          <Controller
            name="value"
            defaultValue={dataUpdate?.value}
            control={control}
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <NumberFormat
                customInput={TextField}
                label="label"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                isNumericString
                prefix="R$ "
                {...field}
              />
            )}
          />

          {errors.value && <p>{errors.value.message}</p>}
        </S.ContentInput>
      </S.WrapperInput>

      <S.WrapperInput>
        <S.ContentInput>
          <Controller
            name="date"
            control={control}
            defaultValue={dataUpdate?.date}
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <TextField label="Data*" type="text" {...field} />
            )}
          />
          {errors.date && <p>{errors.date.message}</p>}
        </S.ContentInput>

        <S.ContentInput>
          <Controller
            name="title"
            defaultValue={dataUpdate?.title}
            control={control}
            render={({ field }) => (
              <TextField type="text" label="Título" {...field} />
            )}
          />
        </S.ContentInput>
      </S.WrapperInput>

      <Box textAlign="right">
        <S.ButtonCancel type="button" variant="contained" onClick={onCancel}>
          Cancelar
        </S.ButtonCancel>
        <Button type="submit" variant="contained">
          Salvar
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;
