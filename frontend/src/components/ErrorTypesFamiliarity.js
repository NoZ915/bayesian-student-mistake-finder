import {
    Container,
    Grid
} from "@mui/material";

function ErrorTypesFamiliarity({ renderedErrorType }) {
    return (
        <Container>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 10, md: 16 }}>
                {renderedErrorType}
            </Grid>
        </Container>
    )
}

export default ErrorTypesFamiliarity;