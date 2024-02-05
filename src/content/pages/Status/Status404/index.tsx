import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { useTranslation } from 'react-i18next';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f4f6f8;
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function Status404() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent
      // style={{
      //   backgroundColor: '#f4f6f8',
      //   display: 'flex',
      //   // flex: 1,
      //   // overflow: 'auto',
      //   flexDirection: 'column',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      // }}
      >
        <Container maxWidth="md">
          <Box textAlign="center" sx={{ mt: 10 }}>
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography
              variant="h2"
              sx={{
                my: 2,
              }}
            >
              {t('La página que estás buscando no existe')}
            </Typography>
            {/* <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{
                mb: 4,
              }}
            >
              {t(
                "It's on us, we moved the content to a different page. The search below should help!"
              )}
            </Typography> */}
          </Box>
          <Container
            maxWidth="sm"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button href="/" variant="outlined">
              {t('Ir al inicio')}
            </Button>
            {/* <Card
              sx={{
                textAlign: 'center',
                mt: 3,
                p: 4,
              }}
            >
              <FormControl variant="outlined" fullWidth>
                <OutlinedInputWrapper
                  type="text"
                  placeholder={t('Search terms here...')}
                  endAdornment={
                    <InputAdornment position="end">
                      <ButtonSearch variant="contained" size="small">
                        {t('Search')}
                      </ButtonSearch>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Divider
                sx={{
                  my: 4,
                }}
              >
                OR
              </Divider>
              <Button href="/" variant="outlined">
                {t('Go to homepage')}
              </Button>
            </Card> */}
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
