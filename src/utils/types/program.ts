export interface Program {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  logo: null;
  logoBig: null;
  isStoreActive: boolean;
  loginScreen: null;
  hero1: null;
  hero2: null;
  hero3: null;
  heroSection1: null;
  heroSection2: null;
  firstSecion1: null;
  firstSecion2: null;
  firstSecion3: null;
  secondSecion1: null;
  secondSecion2: null;
  shopSection1: null;
  mainBanner: null;
  banner2: null;
  banner3: null;
  faq: null | string;
  rules: null;
  howToEarnPoints: null;
  supportPhone: string;
  termsAndConditions: null;
  colorPrimary: string;
  colorHeadings: string;
  colorHeaderIcons: string;
  colorIcons: string;
  deactivationStoreImage: null;
  coinName: string;
  storeUrl: string;
  appLoginLogo: string;
  appLoginBackground: null;
  appBackground: string;
  appBackgroundWithLogo: null;
  appBackgroundOnly: null;
  appBanner1: string;
  appBanner2: string;
  appBanner3: string;
  appLogo: null;
  storeBackground: null;
  googleAnalyticsId: string;
  isDemo: boolean;
  hasAcademy: boolean;
  academyUrl: null;
  isDeleted: boolean;
  deletedAt: null;
}

export interface Company {
  id: number;
  ruc: string | null;
  name: string | null;
  commercialName: string | null;
  contactName: null;
  email: string;
  phone: string;
  address: string;
  isEditing?: boolean;
}

export type ProgramMediaTypes = "image" | "document";

export interface CreateCompany extends Omit<Company, "id"> {}
