import React from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { ActionAlert } from "./app/components/Action/ActionAlert";
import { ThemeProvider } from "@mui/system";
import theme from "./app/constants/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppRouter />
        <ActionAlert />
      </div>
    </ThemeProvider>
  );
}

export default App;
