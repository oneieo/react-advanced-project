import styled from "styled-components";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteContents, updateContents } from "../redux/slices/contentsSlice";

const Wrapper = styled.div`
  width: 800px;
  height: 400px;
  margin-top: 30px;
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
  //const { prevcontents, setContents } = useContext(ContentsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.contents.contents);
  const matchedContent = contents.find((content) => content.id === id);

  // 1. 날짜, 항목, 내용, 금액을 나타내는 변수명에 useRef로 초기값 설정해주기
  const refDate = useRef(null);
  const refItem = useRef(null);
  const refDescription = useRef(null);
  const refAmount = useRef(null);

  const handleModiBtn = () => {
    // 3. 로컬스토리지도 업데이트
    const updatedContents = contents.map((content) => {
      return content.id === id
        ? {
            ...content,
            date: refDate.current.value,
            item: refItem.current.value,
            description: refDescription.current.value,
            // 문자열(String) 객체에 대해서는 toLocaleString() 메서드를 사용할 수 없으므로 숫자(Number) 객체로 형변환
            amount: Number(refAmount.current.value),
          }
        : content;
    });

    dispatch(updateContents(updatedContents));
    localStorage.setItem("contents", JSON.stringify(updatedContents));

    navigate("/");
  };

  const handleDeleteBtn = () => {
    const updatedContents = contents.filter((content) => content.id !== id);

    const isConfirmed = confirm("해당 지출내역을 삭제합니다.");
    if (isConfirmed) {
      dispatch(deleteContents(updatedContents));
      localStorage.setItem("contents", JSON.stringify(updatedContents));
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
