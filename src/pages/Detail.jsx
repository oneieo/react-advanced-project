import styled from "styled-components";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteExpenseData,
  getExpenses,
  updateExpenseData,
} from "../axios/expense.api";

const Wrapper = styled.div`
  width: 800px;
  height: 400px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8e8e8;
  border-radius: 15px;
  font-family: "Noto Sans KR", sans-serif;
`;

const Boxes = styled.div`
  width: 760px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #e8e8e8;
  //gap: 5px;
`;

const Box = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  width: 760px;
  height: 15px;
  margin-bottom: 5px;
  text-indent: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 750px;
  height: 35px;
  border: none;
  border-radius: 10px;
  text-indent: 10px;
  &::selection {
    background-color: #d5ddff;
    //color: black;
  }
  &:focus {
    outline: none;
    //background-color: #e8e8e8;
  }
`;

const ButtonBox = styled.div`
  width: 760px;
  height: 55px;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 100px;
  color: white;
  background-color: ${(prop) => prop.$color};
`;

const Detail = () => {
  const refDate = useRef(null);
  const refItem = useRef(null);
  const refDescription = useRef(null);
  const refAmount = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient(); //기억하기!!!!

  // async await
  // {mutateAsync : deleteExpenseData}
  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpenseData,
  });

  // callback
  const updateExpenseMutation = useMutation({
    mutationFn: updateExpenseData,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      navigate("/");
    },
  });

  console.log(updateExpenseMutation);

  const {
    data: expenses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  if (isLoading) {
    return <h1>로딩중입니다 . . .</h1>;
  }
  if (isError) {
    return <h1>데이터 조회 중 오류가 발생했습니다. . .</h1>;
  }

  const matchedContent = expenses.find((content) => content.id === id);

  const handleModiBtn = () => {
    //   const updatedContents = expenses.map((content) => {
    //     return content.id === id
    //       ? {
    //           ...content,
    //           date: refDate.current.value,
    //           item: refItem.current.value,
    //           description: refDescription.current.value,
    //           amount: Number(refAmount.current.value),
    //         }
    //       : content;
    //   }
    // );
    const newContent = {
      ...matchedContent,
      date: refDate.current.value,
      item: refItem.current.value,
      description: refDescription.current.value,
      amount: Number(refAmount.current.value),
    };
    updateExpenseMutation.mutate(newContent);
    //mutate then.catch
    //mutateAsync
  };

  const handleDeleteBtn = async () => {
    const updatedContents = expenses.find((content) => content.id === id);
    const isConfirmed = confirm("해당 지출내역을 삭제합니다.");
    if (isConfirmed) {
      await deleteExpenseMutation.mutateAsync(updatedContents.id);
      queryClient.invalidateQueries(["expenses"]);
      navigate("/");
    }
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <Boxes>
        <Box>
          <Label>날짜</Label>
          <Input
            placeholder="YYYY-MM-DD"
            defaultValue={matchedContent.date}
            ref={refDate}
          ></Input>
        </Box>
        <Box>
          <Label>항목</Label>
          <Input
            placeholder="지출 항목"
            defaultValue={matchedContent.item}
            ref={refItem}
          ></Input>
        </Box>
        <Box>
          <Label>내용</Label>
          <Input
            placeholder="지출 내용"
            defaultValue={matchedContent.description}
            ref={refDescription}
          ></Input>
        </Box>
        <Box>
          <Label>금액</Label>
          <Input
            placeholder="지출 금액"
            defaultValue={matchedContent.amount}
            ref={refAmount}
          ></Input>
        </Box>
        <ButtonBox>
          <Button $color="#418dff" onClick={handleModiBtn}>
            수정
          </Button>
          <Button $color="#ff5a97" onClick={handleDeleteBtn}>
            삭제
          </Button>
          <Button $color="#777777" onClick={handleBackBtn}>
            뒤로가기
          </Button>
        </ButtonBox>
      </Boxes>
    </Wrapper>
  );
};

export default Detail;
