import { useEffect, useRef, useState } from "react";
import * as S from "./EditProfile.styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../../redux/slices/userInfo.slice";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nicknameRef = useRef();
  const noticeRef = useRef();
  const [imgFile, setImgFile] = useState("");
  const [nickname, setNickname] = useState("");
  //const [editedUserInfo, setEditedUserInfo] = useState({});
  const user = useSelector((state) => state.userInfo.userInfo);
  const formData = new FormData();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    nicknameRef.current.focus();
    noticeRef.current.style.display = "none";

    const getUserData = async () => {
      const { data } = await axios.get(
        "https://moneyfulpublicpolicy.co.kr/user",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNickname(data.nickname);
    };
    getUserData();
  }, []);

  const handleImageFile = (e) => {
    setImgFile(e.target.files[0]);
  };

  formData.append("avatar", imgFile);
  formData.append("nickname", nickname);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // data를 바로 가져오기 보다는 response 가져온 다음에 구조분해할당하기
    const { data } = await axios.patch(
      "https://moneyfulpublicpolicy.co.kr/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 굳이 api 요청 한 번 더해야하는지 ????
    const { data: userData } = await axios.get(
      "https://moneyfulpublicpolicy.co.kr/user",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(
      changeValue({
        ...user,
        nickname: userData.nickname,
        profileImg: userData.avatar,
      })
    );
    navigate("/");
  };

  return (
    <>
      <S.Container>
        <S.Title>프로필 수정</S.Title>
        <S.Form onSubmit={handleFormSubmit}>
          <S.InputBox>
            <S.Label htmlFor="user-nickname">닉네임</S.Label>
            <S.Input
              id="user-nickname"
              type="text"
              ref={nicknameRef}
              placeholder="변경할 닉네임을 입력해주세요."
              defaultValue={user.nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <S.Notice ref={(element) => (noticeRef.current = element)}>
              닉네임은 10자 이내로 작성해주세요.
            </S.Notice>
          </S.InputBox>
          <S.InputBox>
            <S.Label htmlFor="user-image">
              <S.File>프로필 이미지</S.File>
            </S.Label>
            <input
              id="user-nickname"
              type="file"
              accept="image/*"
              style={{ marginTop: "20px" }}
              onChange={handleImageFile}
            />
          </S.InputBox>
          <S.Button>프로필 업데이트</S.Button>
        </S.Form>
      </S.Container>
    </>
  );
};

export default EditProfile;
