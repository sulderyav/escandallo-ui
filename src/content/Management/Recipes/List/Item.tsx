import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Typography,
  styled,
  Divider,
  Button,
  Tooltip,
  lighten,
  Link,
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import Text from 'src/components/Text';
import { RecipeIngredient, Subject } from 'src/utils/types';
import RecipeModal from '../Recipe';
import { useState } from 'react';

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.75)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

const CardWrapper = styled(Card)(
  ({ theme }) => `

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
    transition: ${theme.transitions.create(['box-shadow'])};
  }
      
    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.colors.primary.main};
    }
  `
);

type RecipeItemProps = {
  id: string;
  slug: string;
  name: string;
  image: string;
  portions: number;
  onClick: () => void; // Add onClick handler
  recipeIngredients: RecipeIngredient[];
};

function RecipeItem(props: RecipeItemProps) {
  const [open, setOpen] = useState(false);

  const handleOpenRecipeModal = () => {
    setOpen(true);
  };

  const handleCloseRecipeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <CardWrapper>
        <Box
          sx={{
            position: 'relative',
            zIndex: '2',
          }}
        >
          <Divider />
          <CardMedia
            sx={{
              minHeight: 180,
              cursor: 'pointer',
            }}
            component="img"
            src={props.image}
            onError={(e: any) => {
              e.currentTarget.src =
                'https://cdn-icons-png.flaticon.com/512/2729/2729077.png';
            }}
            onClick={handleOpenRecipeModal}
          />
          <Divider />
          <Box px={2} py={1}>
            <Link
              variant="h4"
              noWrap
              onClick={handleOpenRecipeModal}
              style={{ cursor: 'pointer' }}
            >
              {props.name}
            </Link>
          </Box>
          <Box px={2} display="flex" flexDirection="column">
            <Box>
              <Typography variant="subtitle2">
                Porciones: <Text color="black"> {props.portions}</Text>
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box>
              <Button
                sx={{
                  mr: 1,
                }}
                size="small"
                variant="contained"
                color="primary"
              >
                Editar
              </Button>
              <Tooltip title="Borrar" arrow>
                <IconButtonError onClick={() => {}} color="primary">
                  <DeleteTwoToneIcon fontSize="small" />
                </IconButtonError>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </CardWrapper>

      <RecipeModal
        onClose={handleCloseRecipeModal}
        open={open}
        recipeId={props.id}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    </>
  );
}

export default RecipeItem;
