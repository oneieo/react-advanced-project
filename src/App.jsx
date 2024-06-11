import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import MyProfile from "./pages/MyProfile";
import Layout from "./components/Layout";

function App() {
  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:4000/todos");
    return response.data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isPending) {
    return <div style={{ color: "white" }}>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>데이터 조회 오류!</div>;
  }

  //console.log(data);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/myprofile" element={<MyProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
