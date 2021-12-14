import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import { updateTask } from '../../requests';
import { TaskData } from '../../types';
import TaskForm from '../TaskForm';

type TaskDialogProps = {
  open: boolean;
  onClose(): void;
  task?: TaskData;
};

const TaskDialog = ({ open, onClose, task }: TaskDialogProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskData>();

  const handleUpdate = async (data: TaskData) => {
    reset({ date: '', title: '', user: '', value: '' });
    await updateTask(data);
    onClose();
  };

  const handleClose = () => {
    reset({ date: '', title: '', user: '', value: '' });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Editar Pagamento</DialogTitle>
      <DialogContent style={{ paddingTop: '1rem' }}>
        <TaskForm
          control={control}
          errors={errors}
          onCancel={handleClose}
          onSubmit={handleSubmit(handleUpdate)}
          dataUpdate={task}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
