import axios from "axios";

const JSON_SERVER_HOST = "https://soapy-hyper-parenthesis.glitch.me";

export const getExpenses = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return data;
  } catch (error) {
    console.error("Error => ", error);
    alert("데이터 불러오기 실패");
  }
};

export const postExpense = async (newExpense) => {
  try {
    const { data } = await axios.post(
      `${JSON_SERVER_HOST}/expenses`,
      newExpense
    );
    return data;
  } catch (error) {
    console.error("Error => ", error);
    alert("post 실패!");
  }
};

export const updateExpenseData = async (editedContent) => {
  // put과 patch 기능은 비슷함
  const { id, ...rest } = editedContent;
  try {
    const { data } = await axios.patch(
      `${JSON_SERVER_HOST}/expenses/${id}`,
      rest
    );
    return data;
  } catch (error) {
    console.error("Error => ", error);
    alert("지출내역 업데이트 실패!");
  }
};

export const deleteExpenseData = async (contentId) => {
  try {
    const { data } = await axios.delete(
      `${JSON_SERVER_HOST}/expenses/${contentId}`
    );
    return data;
  } catch (error) {
    console.error("Error => ", error);
    alert("지출내역 삭제 실패!");
  }
};
