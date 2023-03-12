import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  `https://${process.env.SUPABASE_PROJECT_ID!}.supabase.co`,
  process.env.SUPABASE_ANON_KEY!
);

export const TBL_USERS = 'users';
export const TBL_USERS_PRIVATE = 'users_private';

export const signInWithOtp = async ({ email }: { email: string }) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
