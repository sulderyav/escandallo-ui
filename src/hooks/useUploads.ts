import axios from 'src/utils/axios';
import { HandleChangeType } from 'src/utils/types';

export const useUploads = () => {
  const upload = async ({
    e,
    location,
    size,
  }: HandleChangeType): Promise<string> => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (size) {
        const url = window.URL.createObjectURL(file);
        const imageDimensions = await imageSize(url);

        if (
          imageDimensions.width !== size.width ||
          imageDimensions.height !== size.height
        ) {
          alert(`La imagen cargada debe ser de ${size.width} x ${size.height}`);
        } else {
          const url = await uploadFile(file, location);
          return url;
        }
        // };
      } else {
        // If it's just a PDF, then I upload it directly
        const url = await uploadFile(file, location);
        return url;
      }
    }
  };

  function imageSize(url: string): Promise<{ width: number; height: number }> {
    const img = document.createElement('img');

    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        // Natural size is the actual image size regardless of rendering.
        // The 'normal' `width`/`height` are for the **rendered** size.
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // Resolve promise with the width and height
        resolve({ width, height });
      };

      // Reject promise on error
      img.onerror = reject;
    });

    // Setting the source makes it start downloading and eventually call `onload`
    img.src = url;

    return promise as Promise<{ width: number; height: number }>;
  }

  const uploadFile = async (file: File, location: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileDestination', location);

      const { data: url } = await axios.post<string>('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return url;
    } catch (e) {
      console.error(e);
    }
  };

  return { upload };
};
