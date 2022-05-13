import Box from "@mui/material/Box";
import { FC } from "react";

type PieChartInputs = {
  value1: number;
  value2: number;
};

const PieChart: FC<PieChartInputs> = ({ value1, value2 }) => {
  const total = value1 + value2;
  const correct = (360 / total) * value1;
  const inCorrect = (360 / total) * value2;
  
  return (
    <Box
      sx={{
        marginTop: "80px",
        display: "block",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundImage: `conic-gradient(#9ACD32 ${correct}deg,  #ff6347 0 ${inCorrect}deg)`,
      }}
      margin="auto"

    />
  );
};

export default PieChart;
