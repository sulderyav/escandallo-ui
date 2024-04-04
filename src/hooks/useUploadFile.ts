import { useState } from 'react';
import { useApiAuth } from 'src/hooks';

interface UploadFileProps {
  destination: string;
}

export const useUploadFile = ({ destination }: UploadFileProps) => {
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');
  const { post } = useApiAuth();

  const uploadFile = async (image: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', image);
      const response = await post<{ fileUrl: string; key: string }>(
        `/uploads/${destination}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setFileUrl(response.fileUrl);
      return response.fileUrl;
    } catch (error) {
      setError('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFileUrl('');
    setError('');
  };

  return { loading, fileUrl, error, uploadFile, resetForm };
};
