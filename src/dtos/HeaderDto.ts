export interface NavigationLink {
    label: string;
    url: string;
  }
  
  export interface HeaderProps {
    title?: string;
    logo?: string | null;
    navigationLinks?: NavigationLink[];
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
  }
  
  