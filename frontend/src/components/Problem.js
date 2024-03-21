import { useState } from "react";

import "../utils/tableProbability";
import "../utils/currentProbability";
import problems from "../fakeData/problems";
import { 
    Container, 
    Box, 
    Modal, 
    Button, 
    FormControl, 
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel
} from "@mui/material";

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function Problem() {
    const [currentProblem, setCurrentProblem] = useState(1);
    const [selectedOption, setSelectedOption] = useState();
    const [showModal, setShowModal] = useState(false);

    const problem = problems[currentProblem - 1]?.description || {};
    const optionA = problems[currentProblem - 1]?.options[0].text || {};
    const optionB = problems[currentProblem - 1]?.options[1].text || {};
    const optionC = problems[currentProblem - 1]?.options[2].text || {};
    const optionD = problems[currentProblem - 1]?.options[3].text || {};

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }
    const handleNextClick = () => {
        if (selectedOption) {
            setCurrentProblem(currentProblem + 1);
        } else {
            setShowModal(true)
        }
    }
    const handleClose = () => {
        setShowModal(false);
    }

    const modal =
        <Modal
            open={showModal}
            onClose={handleClose}
        >
            <Box sx={{ ...boxStyle }}>
                <h2>提醒！</h2>
                <p>請完成填答，再進行下一題。</p>
            </Box>
        </Modal>

    return (
        <>
            {(currentProblem <= problems.length) ? (
                <Container sx={{display: "inline-flex", justifyContent: "center"}}>
                    <FormControl>
                        <FormLabel sx={{ fontSize: 24 }}>{problem}</FormLabel>
                        <RadioGroup
                            row
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <FormControlLabel value="optionA" control={<Radio />} label={optionA} />
                            <FormControlLabel value="optionB" control={<Radio />} label={optionB} />
                            <FormControlLabel value="optionC" control={<Radio />} label={optionC} />
                            <FormControlLabel value="optionD" control={<Radio />} label={optionD} />
                        </RadioGroup>
                        <Button sx={{width: 30, m: "auto", mt: 2}} variant="contained" onClick={handleNextClick}>Next</Button>
                    </FormControl>
                </Container>
            )
                : (
                    <p>Finish!</p>
                )}
            {modal}
        </>
    )
}

export default Problem;