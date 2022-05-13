import { useEffect, useState } from "react";
import QuestionCard, { QuestionType } from "../componentss/QuestionCard";
import questionFile from "../questions.json";
import { Box, Button, Typography, CircularProgress, PaginationItem,Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "../App";

const TOTAL_QUESTIONS = questionFile.length;

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questionFile[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [appData] = useContext(AppContext);

  let Answered = Object.keys(appData.answers) ?? []

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  
  function handleNextButtonClick(index: number) {
    if (index === TOTAL_QUESTIONS - 1) {
      navigate("/results");
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  function handleChangeOfQuestion(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentQuestion(value);
  }


  return (
    <Box
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
    
      {isLoading ? (
        <CircularProgress />
      ) : (
        questionFile.map(
          (question, index) =>
            currentQuestion === question.id && (
              <>
              <Box key={question.id}>
                <Typography variant="h5" marginTop='60px'>Question: {index + 1}</Typography>
                <Box
                  height="400px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <QuestionCard
                    id={question.id}
                    question={question.question}
                    questionType={question.questionType as QuestionType}
                    answers={question.answerOptions} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      disabled={index === 0}
                      onClick={() => setCurrentQuestion((prev) => prev - 1)}
                      className="previousButton"
                    >
                      Previous
                    </Button>
                    <Button onClick={() => handleNextButtonClick(index)} className="nextButton">
                      {index === TOTAL_QUESTIONS - 1 ? "Submit" : "Next"}
                    </Button>
                  </Box>
                </Box>
              </Box></>
            )
        )
      )}
      {
        isLoading ? "" : (
          <Box
            height="60px"
            marginBottom="400px"
            marginRight="10px"
          >
            <Pagination
              sx={{
                transform: "scale(1.7)"
              }}
              className="pagination"
              count={TOTAL_QUESTIONS}
              size="large"
              page={currentQuestion}
              onChange={handleChangeOfQuestion}
              renderItem={
                (item) => {
                  let colorTheme = "black"
                  let presentPage = item.page?.toLocaleString() ?? "0"
                  if (
                    Answered.indexOf(item.page?.toLocaleString() ?? "0") >= 0
                    && item.type === "page"
                    && appData.answers[presentPage].value
                    && appData.answers[presentPage].value.length > 0
                  ) {
                    colorTheme = "green"
                  }
                  return (
                    <PaginationItem
                      sx={{
                        color: colorTheme,
                        "&:focus": { color: "yellow" },"&:active": { color: "grey" },"&:visited": { color: "green" },
                        "&:hover": { bgcolor: "grey" }
                      }}
                      {...item}
                    />
                  )}
              }
            />
          </Box>
        )
      }
    </Box>
  );
};

export default Questions;
