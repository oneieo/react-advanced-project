import { Link, useNavigate } from "react-router-dom";
import * as S from "./NavBar.styled";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };
  return (
    <>
      <S.Container>
        <S.LeftBox>
          <Link to="/" style={{ textDecoration: "none" }}>
            <S.Menu>Home</S.Menu>
          </Link>
          <Link to="/myprofile" style={{ textDecoration: "none" }}>
            <S.Menu>My profile</S.Menu>
          </Link>
        </S.LeftBox>
        <S.RightBox>
          <S.ProfileImg src="/public/vite.svg" />
          <S.Nickname>닉네임</S.Nickname>
          <S.Button onClick={handleLogout}>Logout</S.Button>
        </S.RightBox>
      </S.Container>
    </>
  );
};

export default NavBar;
