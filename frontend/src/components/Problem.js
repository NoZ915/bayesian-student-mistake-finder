import { useEffect, useState, useRef } from "react";

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
const problemProbabilityStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    mr: 3,
    borderRight: 1,
    pr: 3
}

function Problem({
    problemProbability,
    currentProblem,
    setCurrentProblem,
    problemDescription,
    optionA,
    optionB,
    optionC,
    optionD,
    setCurrentOptionName,
    update,
    selectedErrorType
}) {
    const [selectedOption, setSelectedOption] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleOptionChange = (event) => {
        if (event.target.value === selectedOption) {
            setSelectedOption("");
        } else {
            setSelectedOption(event.target.value);
        }
    }
    const handleNextClick = () => {
        if (selectedOption) {
            setCurrentOptionName(selectedOption);
            setSelectedOption(null);
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
                <Container sx={{ display: "inline-flex", justifyContent: "center" }}>
                    <Box sx={{ ...problemProbabilityStyle }}>
                        <Box sx={{ fontSize: 24 }}>{`Problem 0${currentProblem}`}</Box>
                        <Box>{`正確率：${problemProbability[currentProblem - 1].correct} %`}</Box>
                        <Box>{`錯誤率：${problemProbability[currentProblem - 1].wrong} %`}</Box>
                    </Box>
                    <FormControl>
                        <FormLabel sx={{ fontSize: 24 }}>{problemDescription}</FormLabel>
                        <RadioGroup
                            row
                            value={selectedOption}
                        >
                            <FormControlLabel value={optionA.name} control={<Radio onClick={handleOptionChange} />} label={optionA.text} />
                            <FormControlLabel value={optionB.name} control={<Radio onClick={handleOptionChange} />} label={optionB.text} />
                            <FormControlLabel value={optionC.name} control={<Radio onClick={handleOptionChange} />} label={optionC.text} />
                            <FormControlLabel value={optionD.name} control={<Radio onClick={handleOptionChange} />} label={optionD.text} />
                        </RadioGroup>
                        <Button sx={{ width: 30, m: "auto", mt: 2 }} variant="contained" onClick={handleNextClick}>Next</Button>
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