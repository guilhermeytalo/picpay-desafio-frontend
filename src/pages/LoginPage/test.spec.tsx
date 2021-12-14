import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../app/config/test-utils';
import LoginPage from '.';

describe('<LoginPage />', () => {
  it('should be able to render', () => {
    render(<LoginPage />);

    expect(
      screen.getByRole('heading', { name: /bem vindo de volta/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should be appear error message when input fields not filled', async () => {
    render(<LoginPage />);

    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);

    waitFor(() => {
      expect(screen.getByText(/campo obrigatório/i)).toBeInTheDocument();
    });
  });
});
