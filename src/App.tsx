import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SearchIcons from "./features/SearchIcons";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SearchIcons />} />
      </Route>
    </Routes>
  );
}

export default App;
