import { useNavigate } from "react-router-dom";
import * as S from "./SignUpForm.styled";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo, changeValue } from "../../redux/slices/signUpSlice";
import { checkLength } from "./signUpValidation";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // notice 어떤 방식으로 구현할지 생각해보기
  const idRef = useRef();
  const noticeRef = useRef([]);
  const { userId, password, nickName } = useSelector(
    (state) => state.signUp.signUpData
  );

  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState({
    title: "",
  });

  useEffect(() => {
    idRef.current.focus();
    noticeRef.current[0].style.display = "none";
    noticeRef.current[1].style.display = "none";
    noticeRef.current[2].style.display = "none";
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/todos");
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, []);
  console.log(todos);

  const handleFormSubmit = async (todo) => {
    //e.preventDefault();

    // dispatch(changeUserInfo({ userId, password, nickName }));

    // if (!checkLength(userId, 4, 10)) {
    //   dispatch(changeValue({ type: "userId", content: "" }));
    //   noticeRef.current[0].style.display = "block";
    // }

    // if (!checkLength(password, 4, 15)) {
    //   dispatch(changeValue({ type: "password", content: "" }));
    //   noticeRef.current[1].style.display = "block";
    // }

    // if (!checkLength(nickName, 1, 10)) {
    //   dispatch(changeValue({ type: "nickName", content: "" }));
    //   noticeRef.current[2].style.display = "block";
    // }

    await axios.post("http://localhost:4000/todos", todo);
  };

  // 잘 나오는데 뭐지???
  //console.log(noticeRef.current[0], noticeRef.current[1], noticeRef.current[2]);

  return (
    <>
      <S.Container>
        <S.Title>회원가입</S.Title>
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit(todo);
          }}
        >
          <S.InputBox>
            <S.Label htmlFor="user-id">아이디</S.Label>
            <S.Input
              id="user-id"
              ref={idRef}
              onChange={(e) => {
                setTodo({ ...todo, title: e.target.value });
              }}
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
              onChange={(e) =>
                dispatch(
                  changeValue({ type: "password", content: e.target.value })
                )
              }
            />
            <S.Notice ref={(element) => (noticeRef.current[1] = element)}>
              비밀번호는 4자 ~ 15자로 작성해주세요.
            </S.Notice>
          </S.InputBox>
          <S.InputBox>
            <S.Label htmlFor="user-nickname">닉네임</S.Label>
            <S.Input
              id="user-nickname"
              onChange={(e) =>
                dispatch(
                  changeValue({ type: "nickName", content: e.target.value })
                )
              }
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
                navigate("/signin");
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
