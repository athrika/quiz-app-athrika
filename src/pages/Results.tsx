import React, { useContext } from "react";
import { AppContext } from "../App";
import questionsFile from "../questions.json";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import PieChart from "../componentss/PieChart";
import "../pages/Results.css"

const totalQuestions = questionsFile.length;

  function isEqual(string1:any, string2:any){
    if((JSON.stringify(string2)).toLowerCase() === (JSON.stringify(string1)).toLowerCase()){
      return true
    }
  }

const Results = () => {
  const [appData] = useContext(AppContext);

   var userAnswer:any[]; 
   userAnswer = [Object.values([appData.answers[1].value]), Object.values([appData.answers[2].value]), Object.values([appData.answers[3].value]),Object.values([appData.answers[4].value]), Object.values([appData.answers[5].value])]

  console.log(appData)
  console.log(questionsFile)

  const NoOfCorrectAnswers = questionsFile.reduce((count, question) => {
    return isEqual(JSON.stringify(userAnswer[question.id -1]),JSON.stringify([question.solutions]))
      ? count + 1
      : count;
  }, 0);
  


  return(
      <div className="flex-container">
        <h1 className="heading">
          You score is {NoOfCorrectAnswers} out of {totalQuestions} !
        </h1>
        <Box>
      <Box
        px={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        
      > 
        <PieChart
          value1={Number(NoOfCorrectAnswers)}
          value2={totalQuestions - NoOfCorrectAnswers}
        />
      </Box>
      <br></br><br></br><br></br>
      {questionsFile.map((question) => {
        return (
          <><div className="resultspage">
            <p>Q{question.id} &nbsp; {question.question}</p>
            {<Box
              sx={{
                backgroundColor: isEqual(JSON.stringify(userAnswer[question.id - 1]), JSON.stringify([question.solutions]))
                  ? "#9ACD32"
                  : "#ff6347",
                padding: "1rem",
                borderRadius: "4px",
                border: isEqual(JSON.stringify(userAnswer[question.id - 1]), JSON.stringify([question.solutions]))
                  ? "1px solid green"
                  : "1px solid red",
              }}
              width="700px"
            >
              {JSON.stringify(userAnswer[question.id - 1])}

            </Box>}
            {!(isEqual(JSON.stringify(userAnswer[question.id - 1]), JSON.stringify([question.solutions]))) && (
              <Box>
                <h5>Right answer: </h5>
                <p>{JSON.stringify(question.solutions)}</p>
              </Box>
            )}
          </div><br></br><br></br><br></br></>
        );
      })}

    </Box>

    </div>
  );
};

export default Results;
