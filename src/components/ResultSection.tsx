interface ResultSectionComponentProps {
  data: any;
  order: any;
}

const ResultSection: React.FC<ResultSectionComponentProps> = ({ data, order }) => {
  return (
    <div >
      {order === 1 && (
        <div className="results-info">
          <div className="results-question">Q{data.order}.</div>
          <div className={`results-result ${data.is_correct === data.user_answers[0] ? ' result-correct' : ' result-incorrect'}`}>
            {data.is_correct === data.user_answers[0] ? "Correct" : "False"}
          </div>
        </div>
      )}
      {order === 2 && (
        <>
          <div className="results-round">{data.round_title}</div>
          {data.questions.map((value: any) => (
            <div className="results-info">
              <div className="results-question">Q{value.order}.</div>
              <div className={`results-result ${value.is_correct === value.user_answers[0] ? ' result-correct' : ' result-incorrect'}`}>
                {value.is_correct === value.user_answers[0]
                  ? "Correct"
                  : "False"}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ResultSection;
