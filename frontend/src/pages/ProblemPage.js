import {
    Box,
    Container,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography
} from "@mui/material";
import errorTypes from "../fakeData/errorTypes";
import problems from "../fakeData/problems";
import Problem from "../components/Problem";
import ErrorTypesFamiliarity from "../components/ErrorTypesFamiliarity";
import { useState } from "react";

const containerStyle = {
    mt: 2,
    width: 'auto',
    borderRadius: 2,
    boxShadow: 10,
    pt: 2,
    px: 4,
    pb: 3,
    backgroundColor: "white"
}
const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'white',
};

function ProblemPage() {
    // 目前在第幾題
    const [currentProblem, setCurrentProblem] = useState(1);

    const problemDescription = problems[currentProblem - 1]?.description || {};
    const optionA = problems[currentProblem - 1]?.options[0] || {};
    const optionB = problems[currentProblem - 1]?.options[1] || {};
    const optionC = problems[currentProblem - 1]?.options[2] || {};
    const optionD = problems[currentProblem - 1]?.options[3] || {};

    //偵測使用者勾選的選項之errorType > selectedErrorType
    // const [currentOptionName, setCurrentOptionName] = useState(0);
    // let problemOptions, selectedOption, selectedErrorType;
    // if (problems[currentProblem - 2]) {
    //     problemOptions = problems[currentProblem - 2].options;
    //     selectedOption = problemOptions.filter(e => {
    //         return e.name === currentOptionName;
    //     })
    //     selectedErrorType = selectedOption[0]?.errorType;
    // }

    // error type familiarity
    const [errorTypesFamiliarity, setErrorTypesFamiliarity] = useState(
        Array.from({length: errorTypes.length}, () => ({
            noIdentity: 1 / 3,
            partialIdentity: 1 / 3,
            fullIdentity: 1 / 3
        }))
    )
    console.log(errorTypesFamiliarity)
    // const errorTypesFamiliarity = [];
    // for (let i = 1; i <= errorTypes.length; i++) {
    //     errorTypesFamiliarity.push({
    //         ...errorTypes[i - 1],
    //         noIdentity: 1 / 3,
    //         partialIdentity: 1 / 3,
    //         fullIdentity: 1 / 3
    //     })
    // }
    const renderedErrorType = errorTypesFamiliarity.map((errorTypeFamiliarity, index) => {
        const noIdentity = Math.round(errorTypeFamiliarity.noIdentity * 10000) / 100;
        const partialIdentity = Math.round(errorTypeFamiliarity.partialIdentity * 10000) / 100;
        const fullIdentity = Math.round(errorTypeFamiliarity.fullIdentity * 10000) / 100;
        return (
            <Grid item={true} xs={2} sm={3} key={index}>
                <List sx={style}>
                    <Typography variant="h5" sx={{ p: 1 }} >
                        {`B0${index + 1}`}
                    </Typography>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText primary={`noIdentity: ${noIdentity} %`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`partialIdentity: ${partialIdentity} %`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`fullIdentity: ${fullIdentity} %`} />
                    </ListItem>
                </List>
            </Grid>
        )
    })

    // 題目正確率&錯誤率之機率計算
    const [problemProbability, setProblemProbability] = useState(
        Array.from({ length: problems.length }, () => ({
            correct: 0.5,
            wrong: 0.5
        }))
    )

    // 根據使用者選擇的error type各個情況機率以及題目正確錯誤率做更新
    function update(selectedErrorType){
        if (selectedErrorType === 0) {
            //使用者選擇正確
            // ......
        } else {
            const updated = [
                ...errorTypesFamiliarity,
                // errorTypesFamiliarity[selectedErrorType-1].noIdentity = 0
            ]
            setErrorTypesFamiliarity(updated)
        }
    }

    //渲染頁面
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Container sx={{ ...containerStyle }}>
                <Problem
                    problemProbability={problemProbability}
                    currentProblem={currentProblem}
                    setCurrentProblem={setCurrentProblem}
                    problemDescription={problemDescription}
                    optionA={optionA}
                    optionB={optionB}
                    optionC={optionC}
                    optionD={optionD}
                    // setCurrentOptionName={setCurrentOptionName}
                    update={update} 
                />
            </Container>
            <Container sx={{ ...containerStyle }}>
                <ErrorTypesFamiliarity renderedErrorType={renderedErrorType} />
            </Container>
        </Box>
    )
}

export default ProblemPage;