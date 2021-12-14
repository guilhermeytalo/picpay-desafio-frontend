import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../../pages/LoginPage';
import TaskListPage from '../../pages/TaskListPage';
import TaskAddPage from '../../pages/TaskAddPage';

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <PrivateRoute>
              <TaskAddPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
