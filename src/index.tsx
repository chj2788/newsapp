import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { HashRouter } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    type: "light",
    // primary: {
    //   main: "#9474cc",
    //   dark: "#d0c3e8",
    //   light: "#fff4ff",
    // },
    primary: {
      main: "#212121",
      dark: "#484848",
      light: "#ffffff",
    },
    secondary: {
      main: "#212121",
      dark: "#484848",
    },
  },
  typography: {
    fontFamily: "Oxygen",
  },
});

ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </HashRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
