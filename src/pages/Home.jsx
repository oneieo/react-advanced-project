import Expenditure from "../components/Expenditure";
import InputSection from "../components/InputSection";
import MonthlySection from "../components/MonthlySection";

const Home = () => {
  return (
    <div>
      <InputSection />
      <MonthlySection />
      <Expenditure />
    </div>
  );
};

export default Home;
