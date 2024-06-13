import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useState } from "react";
import getToday from "../utils/getToday";
import axios from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { postExpense } from "../axios/expense.api";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 800px;
  height: 95px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
`;

const Boxes = styled.div`
  width: 760px;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  gap: 10px;
`;

const Box = styled.div`
  height: 55px;
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
`;

const Label = styled.label`
  width: 160px;
  height: 15px;
  margin-bottom: 5px;
  text-indent: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 155px;
  height: 35px;
  text-indent: 10px;
  border: 1px solid #dadada;
  border-radius: 5px;
  &::selection {
    background-color: #b4c0fe;
    //color: black;
  }
  &:focus {
    outline: none;
    background-color: #e8e8e8;
  }
`;

const Button = styled.button`
  width: 60px;
  margin-top: 19px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6684cb;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #5173c1;
    transition: 0.3s;
  }
`;

const InputSection = () => {
  const [date, setDate] = useState(getToday());
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      // 쿼리키값 넣어주기
      queryClient.invalidateQueries(["expenses"]);
      // 강제 새로고침
      navigate(0);
    },
  });

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
    return data;
  };

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  if (isLoading) {
    return <h1>로딩중입니다 . . .</h1>;
  }
  if (isError) {
    return <h1>데이터 불러오기 실패 . . .</h1>;
  }

  const handleSaveBtn = () => {
    if (!date.trim() || !item.trim() || !amount.trim() || !description.trim()) {
      alert("내용을 모두 입력해주세요.");
      return;
    }
    if (date.trim().length > 10 || date.trim().length < 10) {
      alert("날짜는 YYYY-MM-DD 형식으로 입력하세요.");
      return;
    }
    if (isNaN(amount)) {
      alert("금액에는 숫자를 입력하세요.");
      return;
    }

    const newContent = {
      id: uuidv4(),
      month: +date.slice(5, 7),
      date,
      item,
      amount: Number(amount),
      description,
      createdBy: userData.id,
    };

    mutation.mutate(newContent);
    setDate(getToday());
    setItem("");
    setDescription("");
    setAmount("");
  };

  return (
    <Wrapper>
      <Boxes>
        <Box>
          <Label>날짜</Label>
          <Input
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Label>항목</Label>
          <Input
            placeholder="지출 항목"
            value={item}
            onChange={(e) => {
              setItem(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Label>내용</Label>
          <Input
            placeholder="지출 내용"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Label>금액</Label>
          <Input
            placeholder="지출 금액"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </Box>
        <Button onClick={handleSaveBtn}>저장</Button>
      </Boxes>
    </Wrapper>
  );
};

export default InputSection;
