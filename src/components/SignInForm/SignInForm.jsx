import { useNavigate } from "react-router-dom";
import * as S from "./SignInForm.styled";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noticeRef = useRef([]);
  const idRef = useRef();

  useEffect(() => {
    idRef.current.focus();
  }, []);

  return (
    <>
      <S.Container>
        <S.Title>로그인</S.Title>
        <S.Form>
          <S.InputBox>
            <S.Label htmlFor="user-id">아이디</S.Label>
            <S.Input id="user-id" ref={idRef} />
            <S.Notice $color="white">아이디를 정확히 입력해주세요.</S.Notice>
          </S.InputBox>
          <S.InputBox>
            <S.Label htmlFor="user-password">비밀번호</S.Label>
            <S.Input id="user-password" type="password" />
            <S.Notice $color="white">비밀번호를 정확히 입력해주세요.</S.Notice>
          </S.InputBox>
          <S.ButtonBox>
            <S.Button $bgColor="lightgrey">로그인</S.Button>
            <S.Button
              type="button"
              onClick={() => {
                navigate("/");
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
