import { useState } from "react";
import Navbar from "../src/Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Client from "./Components/Client";

function App() {
  return (
    <>
      <Navbar />
      <Client />

      {/* <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes> */}
    </>
  );
}

export default App;
