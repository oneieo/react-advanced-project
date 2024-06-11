import { useNavigate } from "react-router-dom";
import * as S from "./SignUpForm.styled";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import api from "../../axios/api";
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
  const [targetId, setTargetId] = useState(null);
  const [editTodo, setEditTodo] = useState({
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
        const { data } = await api.get("/todos");
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

    // 1. post의 결과(응답)을 받아와서
    const { data } = await api.post("/todos", todo);

    // post 요청이 끝나고 나면 ↓↓↓
    // setTodos([...todos, todo]); 요렇게 하면 서버로부터 받아온 응답을 넣는 게 아니라
    // 폼을 제출할 때 입력한 todo(title만 존재)를 todos에 추가해주는 것이라서 id가 존재하지 않음

    // 그러므로, 서버로부터 받아온 응답을 todos에 넣어주어야 함
    // 2. todos에 넣어주기
    setTodos([...todos, data]);
  };

  const handleDelBtn = async (id) => {
    // 삭제할 데이터의 id를 넘겨주어야 하므로 url 마지막에 슬래시 추가하고, id 추가하기
    await api.delete("/todos/" + id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onEditHandler = async (targetId, editTodo) => {
    await api.patch(`/todos/${targetId}`, editTodo);
    const newTodos = todos.map((todo) => {
      if (todo.id === targetId) {
        return { ...todo, title: editTodo.title };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  return (
    <>
      {todos?.map((todo) => {
        return (
          <div key={todo.id}>
            <p style={{ color: "white" }}>{todo.title}</p>
            <button onClick={() => handleDelBtn(todo.id)}>삭제</button>
          </div>
        );
      })}
      <>
        <input
          type="text"
          placeholder="수정하고 싶은 todo id 입력"
          onChange={(e) => setTargetId(e.target.value)}
        />
        <input
          type="text"
          placeholder="수정 내용 입력"
          onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
        />
        <button
          type="button"
          onClick={() => {
            onEditHandler(targetId, editTodo);
          }}
        >
          수정
        </button>
      </>
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
