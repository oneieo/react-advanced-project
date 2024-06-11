import { useEffect, useRef, useState } from "react";
import * as S from "./EditProfile.styled";

const EditProfile = () => {
  const nicknameRef = useRef();
  const noticeRef = useRef();
  const [imgFile, setImgFile] = useState("");

  useEffect(() => {
    nicknameRef.current.focus();
    noticeRef.current.style.display = "none";
  });

  const handleImageFile = (e) => {
    setImgFile(e.target.files[0]);
  };
  console.log(imgFile); // 닉네임이랑 이미지 업로드하기... axios.post
  // const imgUrl = URL.createObjectURL(imgFile);
  // console.log(imgUrl);

  return (
    <>
      <S.Container>
        <S.Title>프로필 수정</S.Title>
        <S.Form>
          <S.InputBox>
            <S.Label htmlFor="user-nickname">닉네임</S.Label>
            <S.Input
              id="user-nickname"
              type="text"
              ref={nicknameRef}
              placeholder="변경할 닉네임을 입력해주세요."
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
