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
  const fetchExpenses = async () => {
    const response = await axios.get("http://localhost:5000/expenses");
    return response.data;
  };

  // 데이터 추가, 수정, 삭제
  // const 변수명 = useMutation({
  //  mutationFn: 변경 함수명
  // })
  // 함수 사용하는 법
  // 변경함수명.mutate

  // db 변경 데이터를 화면에 바로 반영
  // const queryClient = useQueryClient();
  // const 변수명 = useMutation({
  //   mutationFn: 변경 함수명
  //  ###nSucceess: () => {
  //   queryClient.invalidateQueris(쿼리키)
  // })

  // 다른 api는 다른 쿼리키 사용
  const { data, isPending, isError } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  if (isPending) {
    return <div style={{ color: "white" }}>로딩중입니다...</div>;
  }

  if (isError) {
    return <div style={{ color: "white" }}>데이터 조회 오류!</div>;
  }

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
