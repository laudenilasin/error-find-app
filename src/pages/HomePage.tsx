import React from "react";
import { QuizDataProvider } from "../components/QuizContext";
import ActivitiesSection from "../components/ActivitiesSection";

const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <QuizDataProvider>
        <ActivitiesSection></ActivitiesSection>
      </QuizDataProvider>
    </div>
  );
};

export default HomePage;