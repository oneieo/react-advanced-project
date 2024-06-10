import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
//import { useState } from "react";

function App() {
  // const [contents, setContents] = useState([]);
  // const [clickedMonth, setClickedMonth] = useState(new Date().getMonth() + 1);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
