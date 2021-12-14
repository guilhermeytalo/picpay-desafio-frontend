/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import {
  EditOutline,
  CloseCircleOutline,
} from '@styled-icons/evaicons-outline';
import api from '../../../../services/api';
import { Data, HeadCell, TaskData } from '../../types';
import TableFilter from '../TableFilter';
import TaskDialog from '../TaskDialog';
import TaskExcludeDialog from '../TaskExcludeDialog';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells: readonly HeadCell[] = [
  {
    id: 'username',
    numeric: false,
    disablePadding: true,
    label: 'Usuário',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Título',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Data',
  },
  {
    id: 'value',
    numeric: true,
    disablePadding: false,
    label: 'Valor',
  },
  {
    id: 'isPayed',
    numeric: false,
    disablePadding: false,
    label: 'Pago',
  },
  {
    id: 'edit',
    numeric: false,
    disablePadding: false,
    label: 'Editar',
  },
  {
    id: 'exclude',
    numeric: false,
    disablePadding: false,
    label: 'Excluir',
  },
];

type EnhancedTableProps = {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
};

function Header(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ pl: 3 }}
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <strong>{headCell.label}</strong>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableGrid() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [tasks, setTasks] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openExcludeDialog, setOpenExcludeDialog] = React.useState(false);
  const [taskData, setTaskData] = React.useState<TaskData>();
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    async function getTasks() {
      const response = await api.get('tasks');

      setTasks(response.data);
    }

    getTasks();
  }, [reload]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleEdit = (row: any) => {
    const data: TaskData = {
      id: row.id,
      user: row.name,
      value: row.value,
      date: new Date(row.date).toLocaleDateString(),
      title: row.title,
    };
    setTaskData(data);
    setOpenDialog(true);
  };

  const handleExclude = (row: any) => {
    const data = {
      id: row.id,
      user: row.name,
      value: row.value,
      date: new Date(row.date).toLocaleDateString(),
      title: row.title,
    };
    setTaskData(data);
    setOpenExcludeDialog(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 10, padding: '1rem' }}>
        <TableFilter />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <Header
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(tasks, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  // const date = new Date(row.date).toLocaleDateString('pt-BR');
                  const newDate = new Date(row.date);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.username)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.username}
                    >
                      <TableCell
                        sx={{ pl: 3 }}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <p>{row.name}</p>
                        <p style={{ color: '#69788C' }}>{`@${row.username}`}</p>
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">
                        {new Intl.DateTimeFormat('pt-BR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }).format(newDate)}
                      </TableCell>
                      <TableCell align="left">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(row.value)}
                      </TableCell>
                      <TableCell align="left">
                        <Checkbox color="primary" checked={row.isPayed} />
                      </TableCell>
                      <TableCell
                        style={{ cursor: 'pointer' }}
                        align="left"
                        onClick={() => handleEdit(row)}
                      >
                        <EditOutline size={22} />
                      </TableCell>
                      <TableCell
                        style={{ cursor: 'pointer' }}
                        align="left"
                        onClick={() => handleExclude(row)}
                      >
                        <CloseCircleOutline size={22} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <TaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        task={taskData}
      />
      <TaskExcludeDialog
        open={openExcludeDialog}
        onClose={() => {
          setOpenExcludeDialog(false);
          setReload(!reload);
        }}
        task={taskData}
      />
    </Box>
  );
}
