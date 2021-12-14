import { render, screen } from '../../../../app/config/test-utils';
import TableFilter from '.';

describe('<TableFilter />', () => {
  it('should be able to render', () => {
    render(<TableFilter />);

    expect(
      screen.getByPlaceholderText(/pesquisar por usuário/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /filtrar/i })
    ).toBeInTheDocument();
  });
});
