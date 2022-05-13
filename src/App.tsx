import React, { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputDetailsForm from "./pages/InputDetailsForm";
import appReducer from "./context/AppReducer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Questions from "./pages/Questions";
import ResultsPage from "./pages/Results";
import AuthLayout from "./componentss/AuthLayout";

const initContextData = { answers: {} };
const AppContext: any = React.createContext([]);

export const title: string = "Quiz Application";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      // main: "#5893df",
      main: "#CDCDC0",
    },
    secondary: {
      main: "#DDBC95",
      
    },
    tertiary: {
      main: "#B38867",
    },
    background: {
      default: "#626D71",
      paper: "#626D71",
    },
    text: {
      primary: "#ffffff",
    },
  },

  typography: {
    allVariants: {
      fontFamily: "Open Sans",
      fontWeight: "bold",
    },
    body1: {
      fontWeight: "normal",
    },
    button: {
      fontWeight: "bold",
    },
  },
});

const App = () => {
  const [appData, dispatchAppData] = useReducer(appReducer, initContextData);

  return (
    <AppContext.Provider value={[appData, dispatchAppData]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<InputDetailsForm />} path="/" />
            <Route element={<Questions />} path="/questions" />
            <Route element={<AuthLayout />}>
              <Route element={<ResultsPage />} path="/results" />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
export { AppContext };
