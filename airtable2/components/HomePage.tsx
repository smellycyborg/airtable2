import { useFlow } from "flovv/react";
import StudentInfoPage from "./StudentInfoPage";
import LoginPage from "./LoginPage";

const MainPage = () => {
  const student = useFlow("student");

  if (student) {
    return <StudentInfoPage />;
  }

  return <LoginPage />;
};

export default MainPage;