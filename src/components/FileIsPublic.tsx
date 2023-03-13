import { supabase } from '@/lib/supabase';
import { File } from '@/types';
import { useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';

export const FileIsPublic: React.FC<{ file: File }> = ({ file }) => {
  const [isPublic, setIsPublic] = useState(file.is_public);
  const [error, setError] = useState<PostgrestError | null>(null);

  const onChange = async () => {
    const next = !isPublic;
    setIsPublic(next);
    const { error } = await supabase
      .from('files')
      .update({ is_public: next })
      .eq('id', file.id);
    if (error) {
      setError(error);
    } else {
      setError(null);
    }
  };

  return (
    <div>
      <label>public:</label>
      <input type="checkbox" checked={isPublic} onChange={onChange} />
      {error && (
        <div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
