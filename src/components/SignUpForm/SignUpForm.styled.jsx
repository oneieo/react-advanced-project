import styled from "styled-components";

export const Container = styled.div`
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-top: 100px;
  border: none;
  border-radius: 20px;
  font-family: "Noto Sans KR", sans-serif;
`;

export const Title = styled.h1`
  font-size: 30px;
  //background-color: pink;
  margin-bottom: 23px;
`;

export const Form = styled.form`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const InputBox = styled.div`
  width: 500px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-size: 17px;
`;

export const Input = styled.input`
  width: 500px;
  height: 40px;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 1px 3px grey;
  text-indent: 10px;
  &:focus {
    outline: none;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Button = styled.button`
  width: 500px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: ${(prop) => prop.$bgColor};
  font-size: 17px;
  font-weight: bold;
`;
