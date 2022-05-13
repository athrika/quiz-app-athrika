import { Box, Button, TextField, Paper, Typography, Grow } from "@mui/material";
import { styled } from "@mui/material/styles";
import RadioButtons from "../componentss/RadioButtons";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root ": {
    color: "#ffffff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "inherit",
    },
  },
  width:"800px"
});


const InputDetailsFormHeading = () => (
  <Box>
    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
      Enter your details
    </Typography>
  </Box>
);

const InputDetailsFormBody = () => {
  const navigate = useNavigate();
  return (
    <Box
      component="form"
      sx={{ marginTop: "2rem" }}
      onSubmit={() => navigate("/questions")}
    >
      <Box>
        <StyledTextField
          fullWidth
          id="outlined-name"
          label="Name"
          variant="outlined"
        />
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <RadioButtons
          buttons={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          label=""
        />
      </Box>
      <Button
        sx={{ marginTop: "2rem", padding: "1rem" }}
        fullWidth
        color="secondary"
        variant="contained"
        type="submit"
      >
        Submit and Start Test
      </Button>
    </Box>
  );
};

const InputDetailsForm = () => {
  const theme = useTheme();
  
  return (
    <><h1 className="heading">QUIZ</h1>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="60vh"
    >
      <Grow appear={true} in={true} timeout={1000}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: "2rem",
            background: theme.palette.tertiary.main,
          }}
        >

          <Paper elevation={3} sx={{ padding: "5rem" }}>
            <InputDetailsFormHeading />
            <InputDetailsFormBody />
          </Paper>
        </Paper>
      </Grow>
    </Box></>
  );
};

export default InputDetailsForm;
