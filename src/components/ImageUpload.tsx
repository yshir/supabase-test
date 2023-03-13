import { supabase } from '@/lib/supabase';
import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StorageError } from '@supabase/storage-js';
import { PostgrestError } from '@supabase/supabase-js';

export const ImageUpload: React.FC<{ fileId: number }> = ({ fileId }) => {
  const [state, setState] = useState<
    'init' | 'processing' | 'success' | 'failed'
  >('init');
  const [error, setError] = useState<StorageError | PostgrestError | null>(
    null
  );

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setState('processing');
    const { data, error } = await supabase.storage
      .from('bucket-1')
      .upload(`folder-1/${fileId}/${uuidv4()}`, file);
    if (error) {
      setState('failed');
      setError(error);
      return;
    }

    const { error: insError } = await supabase.from('images').insert({
      file_id: fileId,
      url: data.path,
    });
    if (insError) {
      setState('failed');
      setError(insError);
      return;
    }

    setState('success');
    setError(null);
  };
  return (
    <>
      <h3>Upload image</h3>
      <input type="file" accept="image/*" onChange={onUpload} />
      <p>state: {state}</p>
      {error && (
        <div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </>
  );
};
