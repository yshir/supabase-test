import Link from 'next/link';
import { useAuthContext } from './AuthContext';

export const Header: React.FC = () => {
  const { user, signOut } = useAuthContext();

  return (
    <div>
      <h1>supabase-test</h1>
      <p>logged in user: {user ? user.email : 'none'}</p>
      <Link href="/" style={{ marginRight: 6 }}>
        Home
      </Link>
      <Link href="/signup" style={{ marginRight: 6 }}>
        SignUp
      </Link>
      {user && <button onClick={signOut}>SignOut</button>}
    </div>
  );
};
