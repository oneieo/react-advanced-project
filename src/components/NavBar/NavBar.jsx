import { Link, useNavigate } from "react-router-dom";
import * as S from "./NavBar.styled";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../../redux/slices/userInfo.slice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useContext(AuthContext);
  const user = useSelector((state) => state.userInfo.userInfo);
  const [profileImg, setProfileImg] = useState(
    "/public/default_profileImg.png"
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
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
      dispatch(
        changeValue({
          userId: data.id,
          nickname: data.nickname,
          profileImg: data.avatar,
        })
      );
    };
    getUserData();
  }, []);

  const handleLogout = () => {
    const confirmLogout = confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
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
          <S.ProfileImg src={user.profileImg ? user.profileImg : profileImg} />
          <S.Nickname>{user.nickname}</S.Nickname>
          <S.Button onClick={handleLogout}>Logout</S.Button>
        </S.RightBox>
      </S.Container>
    </>
  );
};

export default NavBar;
