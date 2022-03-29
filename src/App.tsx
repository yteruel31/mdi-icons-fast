import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchIcons from "./features/SearchIcons";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchIcons />} />
    </Routes>
  );
}

export default App;
