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
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate, useLocation } from 'react-router-dom';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

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
  coverImageURL: string;
}

const RecipeCover: FC<RecipeCoverProps> = ({ name, coverImageURL }) => {
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = (): void => {
    return navigate(`/${location.pathname.split('/')[1]}/recipes`);
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
            Receta: {name}
          </Typography>
          <Typography variant="subtitle2">
            Crea una nueva receta para tu repositorio
          </Typography>
        </Box>
      </Box>

      <CardCover>
        <CardMedia image={coverImageURL} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Actualizar portada
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
    </>
  );
};

export default RecipeCover;
