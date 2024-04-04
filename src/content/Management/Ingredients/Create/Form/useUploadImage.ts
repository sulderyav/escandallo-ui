import { useState } from 'react';

import { useApiAuth } from 'src/hooks';

export const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const { post } = useApiAuth();

  const uploadImage = async (image: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', image);
      const response = await post<{ fileUrl: string; key: string }>(
        '/uploads/ingredients/images',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setImageUrl(response.fileUrl);
    } catch (error) {
      setError('Error uploading image');
    }
    setLoading(false);
  };

  return { loading, imageUrl, error, uploadImage };
};
