import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateClickedMonth } from "../redux/slices/clickedMonthSlice";

const Wrapper = styled.div`
  width: 800px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  background-color: #ffffff;
  //border: 2px solid #dadada;
  border-radius: 15px;
`;

const Boxes = styled.div`
  width: 760px;
  height: 140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  gap: 20px;
`;

const MonthBtn = styled.button`
  width: 105px;
  height: 60px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  // MonthBtn의 prop들(key, color, onClick) 중 color에서
  // 연산을 통해 넘겨받은 컬러(prop.color)로 색상 지정하기
  background-color: ${(prop) => prop.$bgColor};
  color: ${(prop) => prop.$color};
  cursor: pointer;
  &:hover {
    background-color: #5b80d5;
    color: white;
    transition: 0.3s;
  }
`;

// 정적인 데이터는 컴포넌트 외부에 두는 것이 좋음
const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MonthlySection = () => {
  const dispatch = useDispatch();
  const clickedMonth = useSelector((state) => state.clickedMonth.clickedMonth);
  const handleMonthBtn = (month) => {
    dispatch(updateClickedMonth(month));
  };

  return (
    <Wrapper>
      <Boxes>
        {monthList.map((month) => {
          return (
            <MonthBtn
              key={month}
              $bgColor={
                clickedMonth && month === clickedMonth ? "#6684cb" : "#cfddff"
              }
              $color={
                clickedMonth && month === clickedMonth ? "white" : "black"
              }
              onClick={() => handleMonthBtn(month)}
            >
              {month}월
            </MonthBtn>
          );
        })}
      </Boxes>
    </Wrapper>
  );
};

export default MonthlySection;
