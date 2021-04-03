export interface StoreInterface {
  example: unknown;
}

export interface User {
  id_user: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface NavItem {
  text: string;
  icon: string;
  link: string;
  current: boolean;
  target: boolean;
}

export interface StateAuth {
  accessKey?: string,
  isLogged: boolean,
  isLoading: boolean,
  dataUser: User
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface OptionSnackBar {
  type?: 'success' | 'error' | 'warning' | 'info';
  directionX?: 'center' | 'left' | 'right';
  directionY?: 'top' | 'bottom';
  text?: string;
}

