import { useContext, useState } from "react";
import { AppContext } from "../App";
import { actions } from "../actions";
import { Typography, Card, TextField, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import RadioOptions from "./RadioOptions";
import CheckboxOptions from "./CheckboxOptions";
import "./QuestionCard.css";


type QuestionCardProps = {
  id: number;
  question: string;
  questionType: QuestionType;
  answers: Array<any>;
};


export type QuestionType = "checkbox" | "radio" | "textInput";

function QuestionCard({
  id,
  question,
  questionType,
  answers,
}: QuestionCardProps) {
  const { setAnswer } = actions;
  const [appData, dispatchAppData] = useContext(AppContext);

  const [answered, setAnswered] = useState<any>([]);

  const theme = useTheme();




  return (
    <Card
      sx={{
        padding: "4rem",
        width: "800px",
        marginTop: "2rem",
        height: "1000px",
        overflowY: "auto"
      }}
    >
      <Typography variant="h5" marginBottom="1rem">
        <Box
          className="boxcolor"
        > 
        {question}
        </Box> 
      </Typography>
      <br></br>
      {(() => {
        switch (questionType) {
          case "checkbox":
            return (
              <CheckboxOptions
                handleChange={(e: any) => {
                  let currentArray: any = [];
                  if (Array.isArray(appData.answers[id]?.value)) {
                    currentArray = [...appData.answers[id]?.value];
                  }
                  if (e.target.checked) {
                    currentArray.push(e.target.name);
                  } else {
                    const indexOfName = currentArray.indexOf(e.target.name);
                    currentArray.splice(indexOfName, 1);
                  }
                  dispatchAppData(setAnswer(id, currentArray, questionType));
                }}
                options={answers.map((answer: any) => {
                  return {
                    option: answer.option,
                    value:
                      appData.answers[id]?.value.includes(answer.option) ||
                      false,
                  };
                })}
              />
            );
          case "radio":
            return (
              <RadioOptions
                options={answers.map((answer) => answer.option)}
                value={appData.answers[id]?.value || ""}
                handleChange={(e) =>
                  dispatchAppData(setAnswer(id, e.target.value, questionType)) 
                }
              />
            );
          case "textInput":
            return (
              <TextField
                value={appData.answers[id]?.value || ""}
                onChange={(e) =>
                  dispatchAppData(setAnswer(id, e.target.value, questionType)) 
                }
              />
            );
          default:
            return <div>Not found</div>;
        }
      })()}
    </Card>
  );
}

export default QuestionCard;
