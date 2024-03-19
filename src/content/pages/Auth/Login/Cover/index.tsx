import { Box, Card, Hidden, Typography, Container } from '@mui/material';
import ContentWrapper from 'src/components/ContentWrapper';
import JWTLogin from '../LoginJWT';
import { experimentalStyled } from '@mui/material';
import Logo from 'src/components/Logo';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Content = experimentalStyled(Box)(
  () => `
    display: flex;
    height: 100%;
    flex: 1;
`
);

const MainContent = experimentalStyled(Box)(
  () => `
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
`
);

const SidebarWrapper = experimentalStyled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};
    width: 440px;
`
);

const SidebarContent = experimentalStyled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: ${theme.spacing(6)};
`
);

const CardImg = experimentalStyled(Card)(
  ({ theme }) => `
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid ${theme.colors.alpha.black[10]};
    transition: ${theme.transitions.create(['border'])};

    &:hover {
      border-color: ${theme.colors.primary.main};
    }
`
);

const TypographyH1 = experimentalStyled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(33)};
`
);

function LoginCover() {
  return (
    <ContentWrapper title="Ingreso">
      <Content>
        <Hidden mdDown>
          <SidebarWrapper>
            <Scrollbars autoHide>
              <SidebarContent>
                <Logo />
                <Box mt={6}>
                  <TypographyH1 variant="h1" sx={{ mb: 7 }}>
                    Escandallo
                  </TypographyH1>
                </Box>
              </SidebarContent>
            </Scrollbars>
          </SidebarWrapper>
        </Hidden>
        <MainContent>
          <Container maxWidth="sm">
            <Card sx={{ mt: 3, px: 4, py: 5 }}>
              <Box textAlign="center">
                <Typography variant="h2" sx={{ mb: 1 }}>
                  Ingresar
                </Typography>
              </Box>

              <JWTLogin />
            </Card>
          </Container>
        </MainContent>
      </Content>
    </ContentWrapper>
  );
}

export default LoginCover;
