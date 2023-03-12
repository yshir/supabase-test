import { useAuthContext } from './AuthContext';
import { SignIn } from './SignIn';

export const AuthPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuthContext();
  if (!user) {
    return <SignIn />;
  }

  return <>{children}</>;
};
