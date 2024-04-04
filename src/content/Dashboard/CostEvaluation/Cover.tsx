import { FC } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  CardMedia,
  Button,
  IconButton,
  styled,
  TextField,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate, useLocation } from 'react-router-dom';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

import { useUploadFile } from 'src/hooks';

const Input = styled('input')({
  display: 'none',
});

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(38)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

interface RecipeCoverProps {
  name: string;
  slug: string;
  coverImageURL: string;
  setFieldValue: (field: string, value: any) => void;
  nameError: boolean;
  nameHelperText: React.ReactNode;
  slugError: boolean;
  slugHelperText: React.ReactNode;
}

const RecipeCover: FC<RecipeCoverProps> = ({
  name,
  slug,
  coverImageURL,
  setFieldValue,
  nameError,
  nameHelperText,
}) => {
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { uploadFile, loading: uploadingCoverImage } = useUploadFile({
    destination: 'recipes/images',
  });

  const handleBack = (): void => {
    return navigate(`/management/recipes`);
  };

  const handleFileUpload = async (file: File) => {
    const fileUrl = await uploadFile(file);
    setFieldValue('coverImage', fileUrl);
  };

  return (
    <>
      <Box display="flex" pt={3} mb={3}>
        <Tooltip arrow placement="top" title={t('Go back')}>
          <IconButton
            onClick={handleBack}
            color="primary"
            sx={{
              p: 2,
              mr: 2,
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Receta:
              <TextField
                label="Nombre de la receta"
                placeholder="Ej. Ceviche de Camarón"
                sx={{ ml: 2 }}
                error={nameError}
                helperText={nameHelperText}
                value={name}
                onChange={(e) => setFieldValue('name', e.target.value)}
              />
              <TextField
                label="Slug"
                placeholder="Ej. ceviche-de-camaron"
                sx={{ ml: 2 }}
                error={nameError}
                helperText={nameHelperText}
                value={slug}
                onChange={(e) => setFieldValue('slug', e.target.value)}
              />
            </Box>
          </Typography>
          <Typography variant="subtitle2">
            Crea una nueva receta para tu repositorio
          </Typography>
        </Box>
      </Box>

      {/* <CardCover>
        <CardMedia image={coverImageURL} component="img" />
        <CardCoverAction>
          <Input
            accept="image/*"
            id="change-cover"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleFileUpload(file);
            }}
          />
          <label htmlFor="change-cover">
            <Button
              startIcon={
                uploadingCoverImage ? (
                  <CircularProgress size={20} />
                ) : (
                  <UploadTwoToneIcon />
                )
              }
              variant="contained"
              component="span"
            >
              Actualizar portada
            </Button>
          </label>
        </CardCoverAction>
      </CardCover> */}
    </>
  );
};

export default RecipeCover;
