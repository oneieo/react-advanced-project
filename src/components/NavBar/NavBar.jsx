import { Link, useNavigate } from "react-router-dom";
import * as S from "./NavBar.styled";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
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
      setUserInfo(data);
    };
    getUserData();
    // token이 변경될 때마다(로그인 하면) getUserData 실행
  }, [token]);

  console.log(userInfo);

  const handleLogout = () => {
    const confirmLogout = confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      setUserInfo({});
      navigate("/login");
    }
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
          <S.Nickname>{userInfo.nickname}</S.Nickname>
          <S.Button onClick={handleLogout}>Logout</S.Button>
        </S.RightBox>
      </S.Container>
    </>
  );
};

export default NavBar;
