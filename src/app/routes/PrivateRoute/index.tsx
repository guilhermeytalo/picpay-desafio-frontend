import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = observer(({ children }: PrivateRouteProps) => {
  const { authStore } = useStore();

  if (!authStore.hasUser()) {
    return <Navigate to="/" />;
  }
  return children;
});

export default PrivateRoute;
