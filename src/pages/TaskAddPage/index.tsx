import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addTask } from '../../models/tasks/requests';
import TaskForm from '../../models/tasks/components/TaskForm';

import * as S from './styles';

type FormValue = {
  user: string;
  value: string;
  date: string;
  title: string;
};

const TaskAddPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const handleOnSubmit = async (data: FormValue) => {
    await addTask(data);
    navigate('/tasks');
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>Adicionar pagamento</S.Title>

        <TaskForm
          errors={errors}
          control={control}
          onSubmit={handleSubmit(handleOnSubmit)}
          onCancel={handleCancel}
        />
      </S.Content>
    </S.Container>
  );
};

export default TaskAddPage;
