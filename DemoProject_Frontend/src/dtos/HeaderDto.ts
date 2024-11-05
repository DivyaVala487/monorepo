export interface NavigationLink {
  label: string;
  icon?: React.ComponentType<{ size: number }>;
  url: string;
}

export interface HeaderProps {
  title?: string;
  logo?: string | null;
  navLinks?: NavigationLink[] | undefined;
  showSearch?: boolean;
  customStyles?: {
    container?: React.CSSProperties;
    searchContainer?: React.CSSProperties;
    searchInput?: React.CSSProperties;
    navList?: React.CSSProperties;
    navItem?: React.CSSProperties;
    navLink?: React.CSSProperties;
    logoutButton?: React.CSSProperties;
  };
  profile?: string;
  inputType?: string;
  inputPlaceHolder?: string;
  maxLinks?: number;
}
