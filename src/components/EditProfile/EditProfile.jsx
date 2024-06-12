import { useEffect, useRef, useState } from "react";
import * as S from "./EditProfile.styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const nicknameRef = useRef();
  const noticeRef = useRef();
  const [imgFile, setImgFile] = useState("");
  const [nickname, setNickname] = useState("");
  const [editedUserInfo, setEditedUserInfo] = useState({});
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

    // data를 바로 가져오기 보다는 response 가져와서 다음에 구조분해할당하기
    const response = await axios.patch(
      "https://moneyfulpublicpolicy.co.kr/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
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
              defaultValue={nickname}
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
