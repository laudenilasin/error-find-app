import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultSection from "../components/ResultSection";

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const order = state.data.order;
  const results = state.data.questions;

  return (
    <div className="page-container">
      <div className="page-title">Results!</div>
      <div className="result-content">
        {results.map((value: any) => (
          <ResultSection data={value} order={order} />
        ))}
      </div>
      <span className="home-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </span>
    </div>
  );
};

export default ResultsPage;
