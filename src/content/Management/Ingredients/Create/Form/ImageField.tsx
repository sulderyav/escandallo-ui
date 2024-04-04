import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  styled,
} from '@mui/material';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';

import { useUploadImage } from './useUploadImage';
import { useEffect } from 'react';

const AvatarWrapper = styled(Box)(
  ({ theme }) => `
    position: relative;

    .MuiAvatar-root {
      // width: ${theme.spacing(16)};
      width: 100%;
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(6)};
    // height: ${theme.spacing(6)};
    bottom: -${theme.spacing(2)};
    right: -${theme.spacing(2)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const Input = styled('input')({
  display: 'none',
});

type DateFromProps = {
  setFieldValue: (field: string, value: any) => void;
  value: string;
  error: boolean;
  helperText: React.ReactNode;
  className?: string;
};

function ImageField({
  setFieldValue,
  value,
  error,
  helperText,
  className,
}: DateFromProps) {
  const { uploadImage, loading, imageUrl } = useUploadImage();

  useEffect(() => {
    if (imageUrl) setFieldValue('image', imageUrl);
  }, [imageUrl, setFieldValue]);

  return (
    <AvatarWrapper className={className}>
      <Avatar variant="rounded" alt="Banner" src={value} />
      <ButtonUploadWrapper>
        <Input
          accept="image/*"
          id="icon-button-file"
          name="icon-button-file"
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            uploadImage(file);
          }}
          disabled={loading}
          multiple={false}
        />
        <label htmlFor="icon-button-file">
          <IconButton component="span" color="primary" disabled={loading}>
            {!loading ? (
              <CloudUploadTwoToneIcon />
            ) : (
              <CircularProgress size={24} color="warning" />
            )}
          </IconButton>
        </label>
      </ButtonUploadWrapper>
    </AvatarWrapper>
  );
}

export default ImageField;
