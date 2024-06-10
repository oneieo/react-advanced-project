import * as S from "./SignUpForm.styled";

const SignUpForm = () => {
  return (
    <>
      <S.Container>
        <S.Title>회원가입</S.Title>
        <S.Form>
          <S.InputBox>
            <S.Label for="user-id">아이디</S.Label>
            <S.Input id="user-id" />
          </S.InputBox>
          <S.InputBox>
            <S.Label for="user-password">비밀번호</S.Label>
            <S.Input id="user-password" />
          </S.InputBox>
          <S.InputBox>
            <S.Label for="user-nickname">닉네임</S.Label>
            <S.Input id="user-nickname" />
          </S.InputBox>
          <S.ButtonBox>
            <S.Button $bgColor="lightgrey">회원가입</S.Button>
            <S.Button $bgColor="grey">로그인</S.Button>
          </S.ButtonBox>
        </S.Form>
      </S.Container>
    </>
  );
};

export default SignUpForm;
