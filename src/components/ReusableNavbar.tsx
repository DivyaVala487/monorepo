import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import {
  HeaderContainer,
  Title,
  SearchContainer,
  SearchInput,
  NavList,
  NavItem,
  StyledNavLink,
  ProfileContainer,
  Profile,
  LogoutButton,
} from "../styledComponents/ReusableNavbarStyles"
import { HeaderProps } from "../dtos/HeaderDto"; 
// import { navLinks } from "../../constants/headerConstants/HeaderConstants";
import {headerStyles,navLinks,inputPlaceHolder,inputType,title,profile} from "../../src/utils/constants"

export const ReusableNavbar: React.FC<HeaderProps> = ({
  title,
  customStyles = {},
  profile,
  inputType,
  inputPlaceHolder,
}) => {
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
  };
  console.log("Consoling here")

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <SearchContainer>
        <SearchInput type={inputType} placeholder={inputPlaceHolder} />
        <FaSearch size={30} color="black" />
      </SearchContainer>
      <nav>
        <NavList>
          {navLinks.map((link, index) => (
            <NavItem key={index} style={customStyles.navItem}>
              <StyledNavLink href={link.url} style={customStyles.navLink}>
                {link.label}
              </StyledNavLink>
            </NavItem>
          ))}
        </NavList>
      </nav>
      <ProfileContainer>
        <FaUserCircle size={30} color="black" />
        <Profile>{profile}</Profile>
      </ProfileContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </HeaderContainer>
  );
};

// export default ReusableNavbar;
