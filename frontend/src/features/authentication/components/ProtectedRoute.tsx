import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AuthPropmptModal from './AuthPropmptModal';

interface IProtectedRouteProps {
  children: React.ReactNode;
  type: 'redirect' | 'modal';
}

const ProtectedRoute = (props: IProtectedRouteProps) => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user && props.type === 'redirect') {
      navigate('/login');
    }
  }, [user, navigate, props.type]);

  if (!user && props.type === 'modal') {
    return (
      <AuthPropmptModal />
    );
  }

  return props.children;
};

export default ProtectedRoute;
