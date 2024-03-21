import { useState } from "react";

import "../utils/tableProbability";
import "../utils/currentProbability";
import problems from "../fakeData/problems";
import Button from "./Button";
import Problem from "../components/Problem";

function ProblemPage() {
    const [currentProblem, setCurrentProblem] = useState(1);

    if (currentProblem <= problems.length) {

        return (
            <div>
                <Problem currentProblem={currentProblem}/>
                <Button />
            </div>
        )
    }

    return (
        <p>Finish!</p>
    )
}

export default ProblemPage;