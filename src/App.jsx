import { useEffect, useState } from "react";
import Navbar from "../src/Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./Components/Client";
import { useDispatch } from "react-redux";
import { setAuthData } from "./store/AppAuthSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(setAuthData(token));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Client />} />
      </Routes>
    </>
  );
}

export default App;
