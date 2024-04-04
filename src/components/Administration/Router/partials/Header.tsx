import React from 'react';
import { Box, Typography, styled, Avatar, alpha, lighten } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === 'dark'
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === 'dark'
          ? '0 1px 0 ' +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ', 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)'
          : '0px 2px 4px -3px ' +
            alpha(theme.colors.alpha.black[100], 0.4) +
            ', 0px 5px 16px -4px ' +
            alpha(theme.colors.alpha.black[100], 0.2)
      };
`
);

const Header = ({
  title,
  subtitle,
  actions = () => null,
  icon,
}: {
  title: string;
  subtitle?: string;
  actions?: () => React.ReactNode;
  icon?: (props: { fontSize: 'small' | 'medium' | 'large' }) => React.ReactNode;
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Box
        className="MuiPageTitle-wrapper"
        sx={{
          paddingBottom: 2,
        }}
        style={{
          marginBottom: 0,
        }}
      >
        <Box
          display="flex"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            {icon && (
              <AvatarPageTitle variant="rounded">
                {icon({
                  fontSize: 'medium',
                })}
              </AvatarPageTitle>
            )}
            <Box>
              <Typography variant="h4" component="h4" gutterBottom>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="subtitle1">{subtitle}</Typography>
              )}
            </Box>
          </Box>

          <Box mt={{ xs: 3, md: 0 }}>{actions()}</Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
