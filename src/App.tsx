import { ThemeProvider } from "styled-components";
import Header from "./components/ReusableNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import City from "./pages/City/City";
import { copyrightText, email, links, navLinks, phone, resources, services, socialMediaLinks, technologies } from "./utils/constants";
import Footer from "./components/ReusableFooter";
import logo from "../src/assessts/images/ABSYZ.png"
import Category from "./pages/Category/Category";
import SubCategory from "./pages/SubCategory/SubCategory";
import Country from "./pages/Country/Country";
import States from "./pages/States/States";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header title="Code Blocks" inputPlaceHolder="Search.."  navLinks={navLinks}/>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Country />} />
          <Route path="/state" element={<States />} />
          <Route path="/city" element={<City />} />
          <Route path="/category" element={<Category/>}/>
          <Route path="/sub-category" element={<SubCategory/>}/>
        </Routes>
        {/* <Footer email={email} copyrightText={copyrightText} phone={phone} socialMediaLinks={socialMediaLinks} resources={resources} logo={logo} services={services} links={links} technologies={technologies}/> */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
