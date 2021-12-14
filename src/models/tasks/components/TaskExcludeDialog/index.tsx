import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Button from '../../../../components/Button';
import { deleteTask } from '../../requests';
import { TaskData } from '../../types';

import * as S from './styles';

type TaskExcludeDialogProps = {
  open: boolean;
  onClose(): void;
  task?: TaskData;
};

const TaskExcludeDialog = ({ open, onClose, task }: TaskExcludeDialogProps) => {
  const handleDelete = async (id: string) => {
    await deleteTask(id);

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Excluir Pagamento</DialogTitle>
      <DialogContent style={{ paddingTop: '1rem' }}>
        <S.Wrapper>
          <S.Label>Usuário: </S.Label>
          <span>{task?.user}</span>
        </S.Wrapper>
        <S.Wrapper>
          <S.Label>Data: </S.Label>
          <span>{task?.date}</span>
        </S.Wrapper>
        <S.Wrapper>
          <S.Label>Valor: </S.Label>
          <span>R$ {task?.value}</span>
        </S.Wrapper>
      </DialogContent>
      <DialogActions>
        <S.ButtonCancel type="button" variant="contained" onClick={onClose}>
          Cancelar
        </S.ButtonCancel>
        <Button
          type="button"
          variant="contained"
          onClick={() => handleDelete(task?.id || '')}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskExcludeDialog;
