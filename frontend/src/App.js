import { Box, Container } from "@mui/material";
import Problem from "./components/Problem";
import currentProbability from "./utils/currentProbability"
import ErrorTypesFamiliarity from "./components/ErrorTypesFamiliarity";

const style = {
  mt: 2,
  width: 'auto',
  borderRadius: 2,
  boxShadow: 10,
  pt: 2,
  px: 4,
  pb: 3,
}

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container sx={{ ...style }}>
        <Problem />
      </Container>
      <Container sx={{ ...style }}>
        <ErrorTypesFamiliarity />
      </Container>
    </Box>
  );
}

export default App;
