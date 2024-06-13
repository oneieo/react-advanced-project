import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyle from "./GlobalStyle.jsx";
import { Provider } from "react-redux";
import store from "./redux/config/configStore.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 서버 상태 관리를 위해 전역에 Provider를 이용해 적용 */}
    <QueryClientProvider client={queryClient}>
      {/* 인증 상태 관리를 위한 인증 컨텍스트. 전역에 Provider를 이용해 적용 */}
      <AuthProvider>
        {/* 현재 로그인한 유저 상태 관리를 위한 slice가 담긴 store. 전역에 Provider를 이용해 적용 */}
        <Provider store={store}>
          <GlobalStyle />
          <App />
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
