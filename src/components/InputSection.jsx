import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useEffect, useState } from "react";
import getToday from "../utils/getToday";
import { useDispatch, useSelector } from "react-redux";
import { createContents, loadContents } from "../redux/slices/contentsSlice";

const Wrapper = styled.div`
  width: 800px;
  height: 95px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  //border: 2px solid #dadada;
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
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.contents.contents);

  // 지출내역 추가될 때마다(상태변경될때마다) 로컬스토리지에 contents 세팅
  useEffect(() => {
    // 로컬스토리지: 저장용 / setState: 화면그리기용
    // 1. 로컬스토리지에서 컨텐츠를 가져온다.
    const baseContents = JSON.parse(localStorage.getItem("contents"));
    // 0. 만약 로컬스토리지에 컨텐츠가 없다면, setContents는 빈배열로 초기값 주기
    if (!baseContents) {
      return;
    }
    // 2. 가져온 걸 스테이트에 넣는다.
    dispatch(loadContents(baseContents));
  }, []);

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
      date,
      item,
      amount: Number(amount),
      description,
    };

    dispatch(createContents(newContent));
    localStorage.setItem("contents", JSON.stringify([...contents, newContent]));
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
