import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface QuizSectionComponentProps {
  data: any;
}

const QuizSection: React.FC<QuizSectionComponentProps> = ({ data }) => {
  const navigate = useNavigate();
  const [questionCounter, setQuestionCounter] = useState(0);
  const [roundCounter, setRoundCounter] = useState(1);
  const [roundLimit, setRoundLimit] = useState(1);
  const [questionLimit, setQuestionLimit] = useState(0);
  const [isRoundVisible, setIsRoundVisible] = useState(false);
  const [isQuestionVisible, setIsQuestionVisible] = useState(true);

  useEffect(() => {
    if (questionCounter === 0 && data.order === 2) {
      setIsQuestionVisible(false);
      setIsRoundVisible(true);
      setTimeout(() => {
        setIsQuestionVisible(true);
        setIsRoundVisible(false);
      }, 2000);
    } else {
      setIsRoundVisible(false);
      setIsQuestionVisible(true);
    }
    // eslint-disable-next-line
  }, [questionCounter]);

  useEffect(() => {
    if (data.order === 1) {
      setQuestionLimit(data.questions.length);
    }
    if (data.order === 2) {
      setRoundLimit(data.questions.length);
      setQuestionLimit(data.questions[questionCounter].questions.length);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="quiz-section">
      {data.order === 1 && (
        <div>
          <div className="question-title">{data.activity_name}</div>
          <div className="question-count">Q{questionCounter + 1}.</div>
          <div className="question-content">
            {data.questions[questionCounter].stimulus}
          </div>
        </div>
      )}
      {data.order === 2 && (
        <div>
          {isRoundVisible && (
            <div className="round-count">
              {data.questions[roundCounter - 1].round_title}
            </div>
          )}
          {isQuestionVisible && (
            <div>
              <div className="question-title">
                {data.activity_name}
                {` / ${
                  data.questions[roundCounter - 1].round_title
                    ? data.questions[roundCounter - 1].round_title
                    : ""
                }`}
              </div>
              <div className="question-count">Q{questionCounter + 1}.</div>
              <div className="question-content">
                {
                  data.questions[roundCounter - 1].questions[questionCounter]
                    .stimulus
                }
              </div>
            </div>
          )}
        </div>
      )}
      {isQuestionVisible && (
        <div className="question-selection">
          <span
            className="button-correct"
            onClick={() => {
              data.order === 1
                ? data.questions[questionCounter].user_answers.push(true)
                : data.questions[roundCounter - 1].questions[
                    questionCounter
                  ].user_answers.push(true);
              const newQuestionCounter = questionCounter + 1;
              if (newQuestionCounter < questionLimit) {
                setQuestionCounter(newQuestionCounter);
              }
              if (
                newQuestionCounter >= questionLimit &&
                roundCounter < roundLimit
              ) {
                setRoundCounter(roundCounter + 1);
                setQuestionCounter(0);
              }
              if (
                newQuestionCounter >= questionLimit &&
                roundCounter === roundLimit
              ) {
                navigate("/result", { state: { data } });
              }
            }}
          >
            Correct
          </span>
          <span
            className="button-incorrect"
            onClick={() => {
              data.order === 1
                ? data.questions[questionCounter].user_answers.push(false)
                : data.questions[roundCounter - 1].questions[
                    questionCounter
                  ].user_answers.push(false);
              const newQuestionCounter = questionCounter + 1;
              if (newQuestionCounter < questionLimit) {
                setQuestionCounter(newQuestionCounter);
              }
              if (
                newQuestionCounter >= questionLimit &&
                roundCounter < roundLimit
              ) {
                setRoundCounter(roundCounter + 1);
                setQuestionCounter(0);
              }
              if (
                newQuestionCounter === questionLimit &&
                roundCounter === roundLimit
              ) {
                navigate("/result", { state: { data } });
              }
            }}
          >
            Incorrect
          </span>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
