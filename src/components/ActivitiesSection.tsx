import React from "react";
import { useQuizData } from "./QuizContext";
import QuizSection from "./QuizSection";

const ActivitiesSection: React.FC<any> = () => {
  const { quizData, setQuizData } = useQuizData();

  return (
    <div
      className={`page-container ${quizData?.activities ? "" : "text-hidden"}`}
    >
      {quizData?.activities && (
        <div>
          <div className="page-title">{quizData.name}</div>
          <div className="page-header">{quizData.heading}</div>
          <div className="page-content">
            {quizData.activities.map((data: any) => {
              return (
                <span className="activity-selection"
                  onClick={() => {
                    setQuizData(quizData.activities[data.order - 1]);
                  }}
                >
                  &bull;
                  {data.activity_name}
                </span>
              );
            })}
          </div>
        </div>
      )}
      {quizData?.questions && <QuizSection data={quizData} />}
    </div>
  );
};

export default ActivitiesSection;
