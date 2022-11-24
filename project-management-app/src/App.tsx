import React, { useEffect } from "react";
import logo from "./logo.svg";
// import { Counter } from './features/counter/Counter';
import "./App.css";
import ConfirmModal from "./app/components/ConfirmModal/ConfirmModal";
import MainPage from "./app/components/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./app/components/WelcomePage/WelcomePage";
import Layout from "./app/components/Layout/Layout";
import NotFoundPage from "./app/components/NotFounPage/NotFoundPage";
import { useSingInMutation } from "./app/services/service";
import BoardPage from "./app/components/BoardPage/BoardPage";
import { ThemeProvider } from "@mui/system";
import theme from "./app/constants/theme";

function App() {
  const [trigger] = useSingInMutation();

  useEffect(() => {
    trigger({ login: "test123", password: "test123" });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <ConfirmModal
        content="Are you sure you want to do what you do?"
        confirmHandler={() => alert("yes")}
        closeHandler={() => alert("close")}
      /> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="mainPage" element={<MainPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/boards/:boardId"
              // loader={({ params }) => {
              //   params.boardtId;
              // }}
              // // and actions
              // action={({ params }) => {
              //   params.boardtId; 
              // }}
              element={<BoardPage />}
            />
          </Route>
        </Routes>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
