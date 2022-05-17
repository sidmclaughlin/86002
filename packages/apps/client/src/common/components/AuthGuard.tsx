import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface Props {
  children: JSX.Element;
  redirectTo: string;
}

const AuthGuard = ({ children, redirectTo }: Props) => {
  const isAuthenticated = useAppSelector(state => state.authentication.user) == null ? false : true;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default AuthGuard;
