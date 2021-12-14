import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../../app/config/test-utils';
import { TaskData } from '../../types';
import TaskForm from '.';

describe('<TaskForm />', () => {
  it('should be able to render', () => {
    const { result } = renderHook(() => useForm<TaskData>());

    render(
      <TaskForm
        control={result.current.control}
        errors={{}}
        onCancel={jest.fn}
        onSubmit={jest.fn}
      />
    );

    expect(
      screen.getByRole('textbox', { name: /usuário\*/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /título/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });

  it('should be present error message when required field not filled', async () => {
    const { result } = renderHook(() => useForm<TaskData>());

    render(
      <TaskForm
        control={result.current.control}
        errors={{}}
        onCancel={jest.fn}
        onSubmit={jest.fn}
      />
    );

    const button = screen.getByRole('button', { name: /salvar/i });
    userEvent.click(button);

    waitFor(() => {
      expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    });
  });
});
