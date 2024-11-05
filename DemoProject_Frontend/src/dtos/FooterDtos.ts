export interface NavLink {
    label: string;
    url: string;
  }
  
  export interface SocialMediaLink {
    icon: React.ComponentType<{ size: number }>;
    url: string;
  }
  
  export interface CustomStyles {
    container?: React.CSSProperties;
    logo?: React.CSSProperties;
    navList?: React.CSSProperties;
    navItem?: React.CSSProperties;
    navLink?: React.CSSProperties;
    icon?: React.CSSProperties;
    copyright?: React.CSSProperties;
  }
  
  export interface FooterProps {
    logo: string;
    email: string;
    phone: string;
    services: string[];
    technologies: string[];
    links: string[];
    resources: string[];
    socialMediaLinks: {
      icon: React.ComponentType<{ size: number }>;
      url: string;
    }[];
    copyrightText: string;
  }
  
  