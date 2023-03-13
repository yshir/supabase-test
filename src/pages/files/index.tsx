import { NextPage } from 'next';
import { FileList } from '@/components/FileList';
import { AuthPage } from '@/components/AuthPage';

const Page: NextPage = () => {
  return (
    <AuthPage>
      <FileList />
    </AuthPage>
  );
};

export default Page;
