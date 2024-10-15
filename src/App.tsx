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
import { ReusableNavbar } from "./reusableComponents/headers/ReusableNavbar";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ReusableNavbar navigationLinks={[]} />
    </ThemeProvider>
  );
}

export default App;
