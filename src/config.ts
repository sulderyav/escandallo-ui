export const auth0Config = {
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const lalaConfig = {
  lala2participantId: process.env.REACT_APP_LALA2_PARTICIPANT_ID,
};

export const generalConfig = {
  tenant: {
    id: process.env.REACT_APP_TENANT_ID,
  },
  uploadLocations: {
    documents: 'uploads/documents',
    images: 'uploads/images',
    awardImages: 'uploads/award-images',
    awardVariantsImages: 'uploads/award-images/variants',
    invoicesFiles: 'uploads/invoices',
  },
  logoSize: {
    width: 156,
    height: 32,
  },
  loginScreenSize: {
    width: 1920,
    height: 1080,
  },
  mainBannerSize: {
    width: 1230,
    height: 425,
  },
  bannerSize: {
    width: 390,
    height: 193,
  },
  awardImageSize: {
    width: 1000,
    height: 1000,
  },
};
