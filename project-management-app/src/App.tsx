import React, { useEffect } from "react";
import "./App.css";
import { useSingInMutation } from "./app/services/service";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
  const [trigger] = useSingInMutation();

  useEffect(() => {
    trigger({ login: "test123", password: "test123" });
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
