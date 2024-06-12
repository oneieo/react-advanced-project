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
  const [userInfo, setUserInfo] = useState({});
  const user = useSelector((state) => state.userInfo.userInfo);
  const [profileImg, setProfileImg] = useState(
    "/public/default_profileImg.png"
  );

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
      dispatch(
        changeValue({
          userId: data.id,
          nickname: data.nickname,
          profileImg: data.avatar,
        })
      );
    };
    getUserData();
    // token이 변경될 때마다(로그인 하면) getUserData 실행
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
          <S.ProfileImg src={user.profileImg} />
          <S.Nickname>{user.nickname}</S.Nickname>
          <S.Button onClick={handleLogout}>Logout</S.Button>
        </S.RightBox>
      </S.Container>
    </>
  );
};

export default NavBar;
