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
import { updatedCombinationsAccuracy, problemErrorTypeAmount } from "../utils/tableProbability";
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
    // console.log(errorTypesFamiliarity)
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
    function update(selectedErrorType) {
        if (selectedErrorType.split('-')[1] === 0) {
            //使用者選擇正確
            // ......
        } else {
            const updatedErrorTypesFamiliarity = [...errorTypesFamiliarity];
            // updatedErrorTypesFamiliarity[selectedErrorType.split('-')[1] - 1].noIdentity = 0;
            // console.log(selectedErrorType.split('-')[1])


            const currentTableProbability = updatedCombinationsAccuracy[currentProblem - 2].combinationsAccuracy;
            // console.log(currentTableProbability)
            const errorTypeString = `B0${selectedErrorType.split('-')[1]}`
            const noIdentityRows = currentTableProbability.filter((row) => {
                return row[errorTypeString] === "noIdentity"
            })
            let rate = 0;
            let arr = [];
            let noIdentityWithProb = noIdentityRows.map((obj) => {
                if (problems[currentProblem - 2]) {
                    const errorTypeAmount = problemErrorTypeAmount(problems[currentProblem - 2])
                    const onlyErrorTypes = Object.keys(obj).slice(0, errorTypeAmount);
                    // console.log(Object.keys(obj).slice(0,errorTypeAmount))
                    let errString = []; //使用者沒選擇的error type
                    onlyErrorTypes.forEach(err => {
                        // console.log(err)
                        // console.log(`User selected B0${selectedErrorType.split('-')[1]}`)
                        if (err !== `B0${selectedErrorType.split('-')[1]}`) {
                            // console.log(err)
                            errString.push(err);
                        }
                        // console.log(`This is errString: ${errString}`)
                        // console.log(`------------------------------------`)
                    })
                    errString.forEach(err => {
                        // console.log(errorTypesFamiliarity[err.split("B0")[1] - 1])
                        let errType = obj[err]
                        obj[err] = errorTypesFamiliarity[err.split("B0")[1] - 1][errType]
                    })
                    // errString.forEach(err => {


                    //     console.log(err)
                    //     console.log(`${[err]}: `+obj[err])
                    //     console.log(`obj.totalWrongRate: `+obj.totalWrongRate)
                    //     console.log(`--------------------------------------`)
                    // })
                    // let BPosteriorProb = 
                    // console.log(obj[errString])
                    // console.log(errString.split("B0")[1])
                    // console.log(errorTypesFamiliarity[errString.split("B0")[1] - 1])
                    // obj[errString] = errorTypesFamiliarity
                    // console.log(obj)
                    // console.log(obj)
                }
                delete obj.totalCorrectRate;
                Object.values(obj).forEach(num => {
                    if(typeof num === "number"){
                        console.log(num)
                    }
                })
                console.log(obj)
                return obj
            })
            // console.log(errorTypeString)
            // console.log(noIdentityRows)

            // 計算
            // const updatedNoIdentity = 

            setErrorTypesFamiliarity(updatedErrorTypesFamiliarity);
            // console.log(updatedErrorTypesFamiliarity)
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