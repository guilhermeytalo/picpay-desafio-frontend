import { TaskData } from '../types/index';
import api from '../../../services/api';

const addTask = async (data: TaskData) => {
  await api.post('tasks', data);
};

const updateTask = async (data: TaskData) => {
  await api.put(`tasks/${data.id}`, data);
};

const deleteTask = async (id: string) => {
  await api.delete(`tasks/${id}`);
};

export { addTask, updateTask, deleteTask };
