import { FormEvent, useState } from 'react';
import { AuthError } from '@supabase/supabase-js';
import { useAuthContext } from './AuthContext';

type State = 'init' | 'processing' | 'failed';

const STATE_MESSAGE: { [k in State]: string } = {
  init: 'init',
  processing: 'processing...',
  failed: 'failed',
};

export const SignIn: React.FC = () => {
  const { signIn } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<State>('init');
  const [error, setError] = useState<AuthError | null>(null);

  const canSubmit = email.length > 0 && password.length > 0;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) {
      return;
    }
    setState('processing');
    const { error } = await signIn({ email, password });
    if (error) {
      setError(error);
      setState('failed');
    }
    setEmail('');
    setPassword('');
    setState('init');
  };

  return (
    <>
      <h2>Login Page</h2>
      <div>
        <p>state: {STATE_MESSAGE[state]}</p>
      </div>
      {error && (
        <div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label>email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 24 }}>
          <button type="submit" disabled={!canSubmit}>
            Login
          </button>
        </div>
      </form>
    </>
  );
};
