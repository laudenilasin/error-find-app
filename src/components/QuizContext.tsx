import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getData } from "../services/api.service";

interface QuizDataContextType {
  quizData: any;
  setQuizData: React.Dispatch<React.SetStateAction<any>>;
}


const QuizDataContext = createContext<QuizDataContextType | undefined>(
  undefined
);

export const useQuizData = (): QuizDataContextType => {
  const context = useContext(QuizDataContext);
  if (!context) {
    throw new Error("useQuizData must be used within a QuizDataProvider");
  }
  return context;
};

interface QuizDataProviderProps {
  children: ReactNode;
}

export const QuizDataProvider: React.FC<QuizDataProviderProps> = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [quizData, setQuizData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData: any = await getData();
        if (newData) {
          setQuizData(newData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const contextValue: QuizDataContextType = {
    quizData,
    setQuizData,
  };

  return (
    <QuizDataContext.Provider value={contextValue}>
      {children}
    </QuizDataContext.Provider>
  );
};
