import styled from "styled-components";
import { Link } from "@mui/joy";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: aliceblue;
  margin: 0;
  padding: 1rem;
  width: 95vw;
`;

export const Title = styled.h3`
  cursor: pointer;
  font-family: sans-serif;
  background-color: transparent;
  color: black;
  font-size: 1.2rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 10rem;
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;
`;

export const SearchInput = styled.input`
  height: 2.5rem;
  width: 10rem;
  border: none;
  outline: 0;
  padding: 0.2rem 0.7rem;
  font-size: 1.2rem;
  background-color: transparent;
  color: black;
  font-family: sans-serif;
  font-weight: 500;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const NavItem = styled.li`
  margin-right: 20px;
`;

export const StyledNavLink = styled(Link)`
  text-decoration: none;
  font-weight: 400;
  color: black !important;
  font-family: sans-serif;
  font-size: 1.2rem !important;
  cursor: pointer;

  &:hover {
    color: gray !important;
    text-decoration: none !important;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Profile = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: black;
  font-weight: bold;
  font-family: sans-serif;
  margin-left: 0.5rem;
`;

export const LogoutButton = styled.button`
  text-align: center;
  font-size: 1.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
  color: black;
  font-weight: 600;
  border: none;
  background-color: transparent;

  &:hover {
    color: gray;
  }
`;