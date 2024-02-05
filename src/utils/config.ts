export const config = {
  server: {
    apiUrl: process.env.REACT_APP_API_URL,
  },
  socioAmigoProgramDefaultPassword: 'socioamigo.123',
  socioMaestroProgramDefaultPassword: 'maestro.123',
  socioAmigoProgramId: 2,
  socioMaestroProgramId: 3,
  store: {
    url: process.env.REACT_APP_STORE_URL,
    size: {
      hero: {
        width: 880,
        height: 474,
      },
      award: {
        width: 300,
        height: 300,
      },
      logo: {
        width: 153,
        height: 44,
      },
      section: {
        width: 430,
        height: 189,
      },
      modal: {
        width: 720,
        height: 384,
      },
    },
  },
  keys: {
    muiX: process.env.REACT_APP_MUI_LICENSE_KEY,
  },
};
