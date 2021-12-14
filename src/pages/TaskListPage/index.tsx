import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Button from '../../components/Button';
import Header from '../../components/Header';
import TableGrid from '../../models/tasks/components/TableGrid';

import * as S from './styles';

const TaskListPage = () => {
  const naviagte = useNavigate();

  const handleAddTaks = () => {
    naviagte('/add-task');
  };

  return (
    <S.Container>
      <Header />
      <S.Main>
        <S.Title>Meus Pagamentos</S.Title>
        <Box width="100%" textAlign="right" mb={2} pr={2}>
          <Button variant="contained" onClick={handleAddTaks}>
            Adicionar Pagamento
          </Button>
        </Box>
        <TableGrid />
      </S.Main>
    </S.Container>
  );
};

export default TaskListPage;
