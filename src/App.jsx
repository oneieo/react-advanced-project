import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
