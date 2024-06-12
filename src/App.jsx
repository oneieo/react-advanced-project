import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import MyProfile from "./pages/MyProfile";
import Layout from "./components/Layout";
import { useContext } from "react";

function App() {
  // const fetchTodos = async () => {
  //   const response = await axios.get("http://localhost:4000/todos");
  //   return response.data;
  // };

  // const { data, isPending, isError } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: fetchTodos,
  // });

  // if (isPending) {
  //   return <div style={{ color: "white" }}>로딩중입니다...</div>;
  // }

  // if (isError) {
  //   return <div>데이터 조회 오류!</div>;
  // }

  // 로그인 필요한 페이지에 접근할 수 있게 하는 컴포넌트
  // 로그인 되어있지 않은 사용자는 로그인 페이지로 리다이렉트
  const PrivateRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
  };

  // 로그인 필요없는 페이지에 접근할 수 있도록 하는 컴포넌트
  // 로그인 되어있는 사용자는 home 페이지로 리다이렉트
  const PublicRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <Navigate to="/" /> : <Element {...rest} />;
  };

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<PublicRoute element={SignUp} />} />
            <Route path="/login" element={<PublicRoute element={SignIn} />} />
            <Route element={<PrivateRoute element={Layout} />}>
              <Route path="/" element={<Home />} />
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
