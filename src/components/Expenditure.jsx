import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadContents } from "../redux/slices/contentsSlice";

const Wrapper = styled.div`
  width: 800px;
  height: 405px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  background-color: #ffffff;
  //border: 2px solid #dadada;
  border-radius: 15px;
`;

const Boxes = styled.div`
  width: 760px;
  height: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  gap: 15px;
  font-family: "Noto Sans KR", sans-serif;
  //overflow-y: scroll;
`;

const Box = styled.div`
  width: 760px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  border: 2px solid #dadada;
  border-radius: 15px;
  cursor: pointer;
`;

const Texts = styled.div`
  width: 700px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;

const Left = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Date = styled.span`
  width: 600px;
  height: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 3px;
  font-size: 13px;
  color: grey;
  font-family: "Noto Sans KR", sans-serif;
`;

const ExpenditureDetail = styled.span`
  width: 600px;
  height: 20px;
  display: block;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #343aa3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Noto Sans KR", sans-serif;
`;

const Right = styled.div`
  width: 100px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
`;

const ExpenditureAmount = styled.span`
  width: 100px;
  height: 60px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #343aa3;
  font-family: "Noto Sans KR", sans-serif;
`;

const Expenditure = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rawData, setRawData] = useState([]);
  const contents = useSelector((state) => state.contents.contents);
  const clickedMonth = useSelector((state) => state.clickedMonth.clickedMonth);

  const filteredList = contents.filter((data) => {
    if (Number(data.date.slice(5, 7)) === clickedMonth) return data;
  });

  // useEffect(() => {
  //   const getExpensesData = async () => {
  //     const { data } = await axios.get("http://localhost:5000/expenses");
  //     setRawData(data);
  //   };
  //   getExpensesData();
  //   //dispatch(loadContents(rawData))
  // }, []);
  // dispatch(loadContents(rawData));

  return (
    <Wrapper>
      <Boxes>
        {filteredList.length > 0 ? (
          filteredList.map((data) => {
            return (
              <Box key={data.id} onClick={() => navigate(`/detail/${data.id}`)}>
                <Texts>
                  <Left>
                    <Date>{data.date}</Date>
                    <ExpenditureDetail>
                      {data.item} - {data.description} (by Jiwon)
                    </ExpenditureDetail>
                  </Left>
                  <Right>
                    <ExpenditureAmount>
                      {data.amount.toLocaleString()}원
                    </ExpenditureAmount>
                  </Right>
                </Texts>
              </Box>
            );
          })
        ) : (
          <Boxes
            style={{
              marginTop: "20px",
            }}
          >
            지출 내역이 없습니다.
          </Boxes>
        )}
      </Boxes>
    </Wrapper>
  );
};

export default Expenditure;
