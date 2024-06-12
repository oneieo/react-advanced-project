import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:5000";

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
