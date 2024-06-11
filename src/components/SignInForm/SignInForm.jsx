import { useNavigate } from "react-router-dom";
import * as S from "./SignInForm.styled";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const SignInForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const noticeRef = useRef([]);
  const idRef = useRef();

  useEffect(() => {
    idRef.current.focus();
    noticeRef.current[0].style.display = "none";
    noticeRef.current[1].style.display = "none";
  }, []);

  // const getUserData = async () => {
  //   const { data } = await axios.get(
  //     "https://moneyfulpublicpolicy.co.kr/user",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InN1bjAyMCIsImlhdCI6MTcxODA5NTAyMSwiZXhwIjoxNzE4MDk4NjIxfQ.QPbsq5Ltr4N-Jaeabhj5KAJEuBCcZ8EpVU-Cp8p4-I4`,
  //       },
  //     }
  //   );
  //   console.log(data);
  // };
  // getUserData();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        { id, password }
      );

      if (data.success) {
        login(data.accessToken);
        alert("로그인 성공! 홈으로 이동합니다.");
        navigate("/");
      } else {
        alert("로그인을 실패하였습니다.");
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("로그인을 실패하였습니다.");
    }
  };

  return (
    <>
      <S.Container>
        <S.Title>로그인</S.Title>
        <S.Form onSubmit={handleFormSubmit}>
          <S.InputBox>
            <S.Label htmlFor="user-id">아이디</S.Label>
            <S.Input
              id="user-id"
              ref={idRef}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <S.Notice ref={(element) => (noticeRef.current[0] = element)}>
              아이디를 정확히 입력해주세요.
            </S.Notice>
          </S.InputBox>
          <S.InputBox>
            <S.Label htmlFor="user-password">비밀번호</S.Label>
            <S.Input
              id="user-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <S.Notice ref={(element) => (noticeRef.current[1] = element)}>
              비밀번호를 정확히 입력해주세요.
            </S.Notice>
          </S.InputBox>
          <S.ButtonBox>
            <S.Button $bgColor="lightgrey">로그인</S.Button>
            <S.Button
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
              $bgColor="grey"
            >
              회원가입
            </S.Button>
          </S.ButtonBox>
        </S.Form>
      </S.Container>
    </>
  );
};

export default SignInForm;
