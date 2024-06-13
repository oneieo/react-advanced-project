import { useNavigate } from "react-router-dom";
import * as S from "./SignUpForm.styled";
import { useEffect, useRef, useState } from "react";
import { checkLength } from "./signUpValidation";
import axios from "axios";

const SignUpForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const idRef = useRef();
  const noticeRef = useRef([]);

  useEffect(() => {
    idRef.current.focus();
    noticeRef.current[0].style.display = "none";
    noticeRef.current[1].style.display = "none";
    noticeRef.current[2].style.display = "none";
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!checkLength(id, 4, 10)) {
      noticeRef.current[0].style.display = "block";
    }
    if (!checkLength(password, 4, 15)) {
      noticeRef.current[1].style.display = "block";
    }
    if (!checkLength(nickname, 1, 10)) {
      noticeRef.current[2].style.display = "block";
      return;
    }

    try {
      const { data } = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        { id, password, nickname }
      );

      if (data.success) {
        alert(`회원가입에 성공하였습니다. 로그인 창으로 이동합니다.`);
        navigate("/login");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Signup Error: ", error);
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <>
      <S.Container>
        <S.Title>회원가입</S.Title>
        <S.Form onSubmit={handleFormSubmit}>
          <S.InputBox>
            <S.Label htmlFor="user-id">아이디</S.Label>
            <S.Input
              id="user-id"
              ref={idRef}
              placeholder="아이디는 4자 ~ 10자로 작성해주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <S.Notice ref={(element) => (noticeRef.current[0] = element)}>
              아이디는 4자 ~ 10자로 작성해주세요.
            </S.Notice>
          </S.InputBox>
          <S.InputBox>
            <S.Label htmlFor="user-password">비밀번호</S.Label>
            <S.Input
              id="user-password"
              type="password"
              placeholder="비밀번호는 4자 ~ 15자로 작성해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <S.Notice ref={(element) => (noticeRef.current[1] = element)}>
              비밀번호는 4자 ~ 15자로 작성해주세요.
            </S.Notice>
          </S.InputBox>
          <S.InputBox>
            <S.Label htmlFor="user-nickname">닉네임</S.Label>
            <S.Input
              id="user-nickname"
              placeholder="닉네임은 10자 이내로 작성해주세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <S.Notice ref={(element) => (noticeRef.current[2] = element)}>
              닉네임은 10자 이내로 작성해주세요.
            </S.Notice>
          </S.InputBox>
          <S.ButtonBox>
            <S.Button type="submit" $bgColor="lightgrey">
              회원가입
            </S.Button>
            <S.Button
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              $bgColor="grey"
            >
              로그인
            </S.Button>
          </S.ButtonBox>
        </S.Form>
      </S.Container>
    </>
  );
};

export default SignUpForm;
