import {
  alpha,
  Box,
  Card,
  darken,
  CardMedia,
  Typography,
  styled,
  useTheme,
} from '@mui/material';

import { useTranslation } from 'react-i18next';

const BgComposed = styled(Box)(
  ({ theme }) => `
    position: relative;
    z-index: 6;
    background: ${darken(alpha(theme.colors.secondary.main, 0.7), 0.3)};
    box-shadow: inset 0 0 4rem 1rem ${darken(theme.colors.secondary.main, 0.4)};
    border-radius: ${theme.general.borderRadiusLg};
  `
);

type IngredientItemProps = {
  id: string;
  slug: string;
  name: string;
  image: string;
};

function IngredientItem(props: IngredientItemProps) {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          height: '12rem',
        }}
      >
        <BgComposed
          style={{
            height: '100%',
          }}
        >
          <Typography variant="h4" color="white">
            {props.name}
          </Typography>
        </BgComposed>
        <CardMedia
          component="img"
          height={'100%'}
          width={'auto'}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            borderRadius: 'inherit',
            zIndex: 5,
          }}
          alt="..."
          src={
            props.image
              ? props.image
              : 'https://cdn-icons-png.flaticon.com/512/2729/2729077.png'
          }
        />
      </Card>
    </>
  );
}

export default IngredientItem;
