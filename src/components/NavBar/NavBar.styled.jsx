import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 45px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  background-color: #475277;
`;

export const LeftBox = styled.div`
  width: 250px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Menu = styled.p`
  font-size: 15px;
  color: white;
  font-weight: bold;
`;

export const RightBox = styled.div`
  width: 250px;
  height: 45px;
  margin-right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Nickname = styled.h3`
  font-size: 15px;
  color: white;
  font-weight: bold;
`;

export const Button = styled.button`
  width: 60px;
  height: 25px;
  border: none;
  border-radius: 7px;
  font-size: 12px;
  font-weight: bold;
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;
`;
