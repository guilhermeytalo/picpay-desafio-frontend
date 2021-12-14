import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../../app/config/test-utils';
import TaskDialog from '.';

describe('<TaskDialog />', () => {
  it('should be able to render', () => {
    render(<TaskDialog open onClose={jest.fn} />);

    expect(
      screen.getByRole('heading', { name: /editar pagamento/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument();
  });

  it('should be close dialog when press cancel button', async () => {
    const cancelButtonMock = jest.fn();
    render(<TaskDialog open onClose={cancelButtonMock} />);

    const button = screen.getByRole('button', { name: /cancelar/i });
    userEvent.click(button);

    await waitFor(() => {
      expect(cancelButtonMock).toHaveBeenCalled();
    });
  });
});
