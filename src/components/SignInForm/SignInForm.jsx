import * as S from "./SignInForm.styled";

const SignInForm = () => {
  return (
    <>
      <S.Container>
        <S.Title>로그인</S.Title>
        <S.Form>
          <S.InputBox>
            <S.Label for="user-id">아이디</S.Label>
            <S.Input id="user-id" />
          </S.InputBox>
          <S.InputBox>
            <S.Label for="user-password">비밀번호</S.Label>
            <S.Input id="user-password" />
          </S.InputBox>
          <S.ButtonBox>
            <S.Button $bgColor="lightgrey">로그인</S.Button>
            <S.Button $bgColor="grey">회원가입</S.Button>
          </S.ButtonBox>
        </S.Form>
      </S.Container>
    </>
  );
};

export default SignInForm;
