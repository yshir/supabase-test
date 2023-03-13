import { Image } from '@/types';
import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { FileObject, StorageError } from '@supabase/storage-js';
export const ImageList: React.FC<{ fileId: number }> = ({ fileId }) => {
  const { data, error } = useImageList({ fileId });

  return (
    <>
      <h3>Images</h3>
      {data ? (
        <div>
          {data.map((url, i) => (
            <img key={i} src={url} style={{ marginRight: 12 }} />
          ))}
        </div>
      ) : (
        'loading...'
      )}
      {error && (
        <div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

const useImageList = ({ fileId }: { fileId: number }) => {
  const [state, setState] = useState<{
    data: string[] | null;
    error: StorageError | PostgrestError | null;
  }>({
    data: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      const resp1 = await supabase.from('images').select('*');
      if (resp1.error) {
        setState({ data: null, error: resp1.error });
        return;
      }

      const paths: string[] = resp1.data.map((image) => image.url);
      const files = await Promise.all(
        paths.map((path) => supabase.storage.from('bucket-1').download(path))
      );

      const urls: string[] = [];
      for (const file of files) {
        if (file.data) {
          urls.push(URL.createObjectURL(file.data));
        }
      }
      setState({ data: urls, error: null });
    })();
  }, [fileId]);

  return {
    ...state,
  };
};
