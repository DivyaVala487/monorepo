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
import { ReusableNavbar } from "./components/ReusableNavbar"; 
import States from "./pages/states/States";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Country from "./pages/country/Country";
import Home from "./pages/Home/Home";
import City from "./pages/City/City";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ReusableNavbar navigationLinks={[]} title="Absyz" inputPlaceHolder="Search.." />
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/country" element={<Country/>}/>
      <Route path="/state" element={<States/>}/>
      <Route path="/city" element={<City/>}/>
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
