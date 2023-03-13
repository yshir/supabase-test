import { NextPage } from 'next';
import { AuthPage } from '@/components/AuthPage';
import { FileDetail } from '@/components/FileDetail';

const Page: NextPage = () => {
  return (
    <AuthPage>
      <FileDetail />
    </AuthPage>
  );
};

export default Page;
