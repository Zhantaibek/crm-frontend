import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

interface Props {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: Props) => {
  const isAdmin = useAuthStore((s) => s.isAdmin());

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};