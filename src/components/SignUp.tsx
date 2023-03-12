import { supabase } from '@/lib/supabase';
import { AuthError } from '@supabase/supabase-js';
import { useState, FormEvent } from 'react';

type State = 'init' | 'processing' | 'failed';

const STATE_MESSAGE: { [k in State]: string } = {
  init: 'init',
  processing: 'processing...',
  failed: 'failed',
};

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<State>('init');
  const [authError, setAuthError] = useState<AuthError | null>(null);

  const canSubmit = email !== '' && password !== '';

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) {
      return;
    }
    setState('processing');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setAuthError(error);
      setState('failed');
      return;
    }
    setState('init');
  };

  return (
    <div>
      <h1>Sign up</h1>
      <div>
        <p>state: {STATE_MESSAGE[state]}</p>
      </div>
      {authError && (
        <div>
          <p>error:</p>
          <pre>{JSON.stringify(authError, null, 2)}</pre>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label style={{ marginRight: 12 }}>email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: 12 }}>password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 18 }}>
          <button type="submit" disabled={!canSubmit}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
