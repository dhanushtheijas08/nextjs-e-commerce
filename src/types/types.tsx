export enum Role {
  USER,
  ADMIN,
}

export type UserSession = {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: Date | null;
  isOAuth: boolean | null;
  role: Role;
};

export type NavItem = {
  title: string;
  href: string;
  icon: string;
  label: string;
};
