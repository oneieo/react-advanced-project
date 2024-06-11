// custom instance 만들기

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

// 두 개의 콜백함수를 인자로 받는 인터셉터 (onFulfilled, onRejected)
api.interceptors.request.use((config) => {
  console.log("인터셉터 요청 성공!");
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("응답 받기 성공!");
    return response;
  },
  (error) => {
    console.log("응답 받기 실패ㅜㅜ", error);
    return Promise.reject(error);
  }
);

export default api;
