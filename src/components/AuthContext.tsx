import { supabase } from '@/lib/supabase';
import { User, AuthResponse } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthStateContext = {
  user: User | null;
  init: boolean;
};

const authStateContext = createContext<AuthStateContext>({
  user: null,
  init: false,
});

type AuthDispatchContext = {
  signUp: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<AuthResponse>;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
};

const authDispatchContext = createContext<AuthDispatchContext>({
  signUp: async () => {
    throw new Error('unreachable');
  },
  signIn: async () => {
    throw new Error('unreachable');
  },
  signOut: async () => {
    throw new Error('unreachable');
  },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthStateContext>({
    user: null,
    init: false,
  });

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await supabase.auth.signUp({
      email,
      password,
    });
    setState((s) => ({ ...s, user: response.data.user }));
    return response;
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setState((s) => ({ ...s, user: response.data.user }));
    return response;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    setState((s) => ({ ...s, user: null }));
  };

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setState({
        user,
        init: true,
      });
    })();
  }, []);

  if (!state.init) {
    return <>auth processing...</>;
  }

  return (
    <authStateContext.Provider value={state}>
      <authDispatchContext.Provider value={{ signUp, signIn, signOut }}>
        {children}
      </authDispatchContext.Provider>
    </authStateContext.Provider>
  );
};

export const useAuthContext = (): AuthStateContext & AuthDispatchContext => {
  return {
    ...useContext(authStateContext),
    ...useContext(authDispatchContext),
  };
};
