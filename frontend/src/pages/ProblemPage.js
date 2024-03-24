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
import { updatedCombinationsAccuracy, problemErrorType } from "../utils/tableProbability";
import { useState, useEffect } from "react";
import { forEach } from "async";

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
    const [currentOptionName, setCurrentOptionName] = useState(0);
    const [selectedErrorType, setSelectedErrorType] = useState();
    useEffect(() => {
        if (currentOptionName) {
            if (problems[currentProblem - 2]) {
                const problemOptions = problems[currentProblem - 2].options;
                const selectedAnswer = problemOptions.find(e => e.name === currentOptionName);
                const newSelectedErrorType = selectedAnswer?.errorType;
                setSelectedErrorType(`${currentProblem - 1}-${newSelectedErrorType}`);
            }
        }
    }, [currentProblem]);
    useEffect(() => {
        if (selectedErrorType) {
            update(selectedErrorType);
        }
    }, [selectedErrorType])

    // error type familiarity
    const [errorTypesFamiliarity, setErrorTypesFamiliarity] = useState(
        Array.from({ length: errorTypes.length }, (_, index) => ({
            ...errorTypes[index],
            noIdentity: 1 / 3,
            partialIdentity: 1 / 3,
            fullIdentity: 1 / 3
        }))
    );

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
    function update(selectedErrorType) {
        if (Number(selectedErrorType.split('-')[1]) !== 0) {
            const currentTableProbability = updatedCombinationsAccuracy[currentProblem - 2].combinationsAccuracy;
            const problemErrorTypes = problemErrorType(problems[currentProblem - 2]);
            let product = 1;
            let sum = 0;
            const noIdentity1arg = problemErrorTypes.map(err => {
                const noIdentityRows = currentTableProbability.filter(row => {
                    return row[err] === "noIdentity";
                })
                let othersNoIdentityRows = []; //除了遍歷當下的其他err
                problemErrorTypes.forEach(othersErr => {
                    if (othersErr !== err) {
                        othersNoIdentityRows.push(othersErr);
                    }
                })
                const updatedNoIdentityRows = noIdentityRows.map(row => {
                    const updatedRow = { ...row }; // 複製原始物件
                    othersNoIdentityRows.forEach(othersErr => {
                        const errType = updatedRow[othersErr];
                        updatedRow[othersErr] = errorTypesFamiliarity[othersErr.split("B0")[1] - 1][errType];
                    });
                    return updatedRow;
                });

                sum = 0;
                updatedNoIdentityRows.forEach(row => {
                    delete row.totalCorrectRate;
                    Object.values(row).forEach(num => {
                        if (typeof num === "number") {
                            product *= num;
                        }
                    })
                    sum += product; // 將每次計算的結果加到總和中
                    product = 1; // 重置 product 為 1，以便下一次迭代
                })
                return sum;
            })
            console.log(noIdentity1arg);
            let index = -1;
            problemErrorTypes.forEach(err => {
                index++;
                const newNoIdentity = (noIdentity1arg[index] * errorTypesFamiliarity[err.split("B0")[1] - 1].noIdentity) / problemProbability[currentProblem - 2].wrong || 1;
                console.log(`sum: ` + noIdentity1arg[index]);
                console.log(`noIdentity: ` + errorTypesFamiliarity[err.split("B0")[1] - 1].noIdentity);
                console.log(`相乘:` + noIdentity1arg[index] * errorTypesFamiliarity[err.split("B0")[1] - 1].noIdentity);
                const updatedErrorTypesFamiliarity = [...errorTypesFamiliarity];
                updatedErrorTypesFamiliarity[err.split("B0")[1] - 1].noIdentity = newNoIdentity;
                setErrorTypesFamiliarity(updatedErrorTypesFamiliarity);
            })

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
                    setCurrentOptionName={setCurrentOptionName}
                    update={update}
                    selectedErrorType={selectedErrorType}
                />
            </Container>
            <Container sx={{ ...containerStyle }}>
                <ErrorTypesFamiliarity renderedErrorType={renderedErrorType} />
            </Container>
        </Box>
    )
}

export default ProblemPage;