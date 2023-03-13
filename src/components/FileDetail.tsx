import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { File } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ImageUpload } from './ImageUpload';
import { ImageList } from './ImageList';
import Link from 'next/link';
import { FileIsPublic } from './FileIsPublic';

export const FileDetail: React.FC = () => {
  const { data, error } = useFileDetail();
  return (
    <>
      <h2>File</h2>
      <div>
        {error && (
          <div>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        {!data ? (
          'loading...'
        ) : (
          <>
            <div>
              <Link href={`/pub/files/${data.id}`}>public</Link>
            </div>
            <div>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
            <FileIsPublic file={data} />
            <ImageList fileId={data.id} />
            <ImageUpload fileId={data.id} />
          </>
        )}
      </div>
    </>
  );
};

const useFileDetail = () => {
  const router = useRouter();
  const [state, setState] = useState<{
    data: File | null;
    error: PostgrestError | null;
  }>({
    data: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      if (!router.query.id) {
        return;
      }
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('id', router.query.id)
        .single();
      setState({
        data: data as File | null,
        error,
      });
    })();
  }, [router.query.id]);

  return {
    ...state,
  };
};
