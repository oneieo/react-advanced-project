import { createContext, useState } from "react";

// AuthContext 생성하기
export const AuthContext = createContext();

// 로컬 스토리지의 "accessToken"이라는 키에 저장된 토큰 값 가져오기 (로그인 여부 확인 시 사용)
const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  // 토큰이 존재하면 true, 존재하지 않으면 false

  // 첫 번째 ! 연산자는 token 값을 불리언으로 변환하면서 그 값을 반전
  // 두 번째 ! 연산자는 다시 한 번 그 값을 반전시켜 원래의 불리언 값을 얻음
  // 즉, !!token은 token의 존재 여부를 불리언 값 (true 또는 false)으로 변환한다.
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (token) => {
    // 매개변수로 들어온 새로운 토큰을 로컬스토리지에 저장
    localStorage.setItem("accessToken", token);
    // 인증 상태를 true로 변경
    setIsAuthenticated(true);
  };

  const logout = () => {
    // 로그아웃을 함수를 실행하면 로컬스토리지에서 토큰을 삭제
    localStorage.removeItem("accessToken", token);
    // 인증 상태를 false로 변경
    setIsAuthenticated(false);
  };

  // AuthContext.Procider 컴포넌트를 사용해 isAuthenticated, login, logout을 하위 컴포넌트에 제공
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
