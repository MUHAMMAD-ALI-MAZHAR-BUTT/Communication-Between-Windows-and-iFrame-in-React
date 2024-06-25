import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IframeParent from "./components/IframeParent";
import IframeChild from "./components/IframeChild";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/iframe" element={<IframeParent />} />
        <Route exact path="/iframe-child" element={<IframeChild />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
