import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./app/components/header/headerTest";
import { ActionAlert } from "./app/components/Action/ActionAlert";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <AppRouter />
      <ActionAlert />
    </BrowserRouter>
  );
}

export default App;
