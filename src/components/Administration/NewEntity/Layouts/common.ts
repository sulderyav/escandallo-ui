import { TextsType } from '../../Router';

export interface LayoutProps {
  texts: TextsType;
  mainForm: () => JSX.Element;
  additionalForm?: () => JSX.Element;
  sidebar?: () => JSX.Element;
  renderButtons: () => React.ReactNode;
}
