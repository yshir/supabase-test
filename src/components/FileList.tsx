import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { File } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';

export const FileList: React.FC = () => {
  const { data, error } = useFileList();
  return (
    <>
      <h2>Files</h2>
      <div>
        {!data && 'loading...'}
        {data?.map((file) => (
          <div key={file.id}>
            <Link href={`/files/${file.id}`}>{file.name}</Link>
          </div>
        ))}
      </div>
      <div>
        {error && (
          <div>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

const useFileList = () => {
  const [state, setState] = useState<{
    data: File[] | null;
    error: PostgrestError | null;
  }>({
    data: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('files').select('*');
      setState({
        data: data as File[],
        error,
      });
    })();
  }, []);

  return {
    ...state,
  };
};
