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
    //error type familiarity
    const errorTypesFamiliarity = [];
    for (let i = 1; i <= errorTypes.length; i++) {
        errorTypesFamiliarity.push({
            ...errorTypes[i - 1],
            noIdentity: 1 / 3,
            partialIdentity: 1 / 3,
            fullIdentity: 1 / 3
        })
    }
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
    const problemProbability = [];
    for (let i = 1; i <= problems.length; i++) {
        problemProbability.push({
            correct: 50,
            wrong: 50
        })
    }

    //渲染頁面
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Container sx={{ ...containerStyle }}>
                <Problem problemProbability={problemProbability} />
            </Container>
            <Container sx={{ ...containerStyle }}>
                <ErrorTypesFamiliarity renderedErrorType={renderedErrorType} />
            </Container>
        </Box>
    )
}

export default ProblemPage;