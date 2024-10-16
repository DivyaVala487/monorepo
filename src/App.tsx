// import './App.css';
// import { ReusableNavbar } from './reusableComponents/headers/ReusableNavbar';

// function App() {
//   return (
//     <div className="App">
//       <ReusableNavbar navigationLinks={[]} />
//     </div>
//   );
// }

// export default App;

import { ThemeProvider } from "styled-components";
import Header from "./components/ReusableNavbar";
import States from "./pages/states/States";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Country from "./pages/country/Country";
import Home from "./pages/Home/Home";
import City from "./pages/City/City";
import { copyrightText, email, links, navLinks, phone, resources, services, socialMediaLinks, technologies } from "./utils/constants";
import Footer from "./components/ReusableFooter";
import logo from "../src/assessts/images/ABSYZ.png"
const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header title="Absyz" inputPlaceHolder="Search.."  navLinks={navLinks}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country" element={<Country />} />
          <Route path="/state" element={<States />} />
          <Route path="/city" element={<City />} />
        </Routes>
        <Footer email={email} copyrightText={copyrightText} phone={phone} socialMediaLinks={socialMediaLinks} resources={resources} logo={logo} services={services} links={links} technologies={technologies}/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
