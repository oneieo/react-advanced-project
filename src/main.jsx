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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <GlobalStyle />
          <App />
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
