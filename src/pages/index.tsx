import { AuthPage } from '@/components/AuthPage';
import { NextPage } from 'next';

const Page: NextPage<{ error: any; data: any }> = ({ error, data }) => {
  return (
    <AuthPage>
      <h2>index page</h2>
    </AuthPage>
  );
};

export default Page;
