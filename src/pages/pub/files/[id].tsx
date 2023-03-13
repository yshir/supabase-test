import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ImageList } from '@/components/ImageList';

const Page: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  if (typeof id !== 'string') {
    return <></>;
  }

  if (!/^\d+$/.test(id)) {
    return <></>;
  }

  const fileId = Number(id);

  return (
    <>
      <ImageList fileId={fileId} />
    </>
  );
};

export default Page;
