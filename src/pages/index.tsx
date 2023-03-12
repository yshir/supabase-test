import { NextPage } from 'next';
import { supabase, TBL_USERS } from './lib/supabase';

const Page: NextPage<{ error: any; data: any }> = ({ error, data }) => {
  return (
    <>
      <h1>supabase-test</h1>
      {!!error && (
        <div>
          <p>error:</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      {!!data && (
        <div>
          <p>data:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps() {
  const { data, error } = await supabase.from(TBL_USERS).select();
  return {
    props: {
      data,
      error,
    },
  };
}

export default Page;
