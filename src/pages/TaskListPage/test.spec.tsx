import { render, screen } from '../../app/config/test-utils';
import TaskListPage from '.';

describe('<TaskListPage />', () => {
  it('should be able to render', () => {
    render(<TaskListPage />);

    expect(
      screen.getByRole('heading', { name: /meus pagamentos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /adicionar pagamento/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /usuário/i })
    ).toBeInTheDocument();
  });
});
