import React, { useEffect } from "react";
import logo from "./logo.svg";
// import { Counter } from './features/counter/Counter';
import "./App.css";
import ConfirmModal from "./app/components/ConfirmModal/ConfirmModal";
import MainPage from "./app/components/MainPage/MainPage";
import { useSingInMutation } from "./app/services/service";
import { Routes, Route } from "react-router-dom";
import BoardPage from "./app/components/BoardPage/BoardPage";

function App() {
  const [trigger] = useSingInMutation();

  useEffect(() => {
    trigger({ login: "test123", password: "test123" });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
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
      </Routes>
      {/* <MainPage /> */}
    </div>
  );
}

export default App;
