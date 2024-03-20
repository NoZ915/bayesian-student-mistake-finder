import { useState } from "react";

import "../utils/tableProbability";
import "../utils/currentProbability";
import problems from "../fakeData/problems";
import Button from "./Button";

function Problem() {
    const [currentProblem, setCurrentProblem] = useState(1);

    if (currentProblem <= problems.length) {
        const problem = problems[currentProblem - 1].description;
        const optionA = problems[currentProblem - 1].options[0].text;
        const optionB = problems[currentProblem - 1].options[1].text;
        const optionC = problems[currentProblem - 1].options[2].text;
        const optionD = problems[currentProblem - 1].options[3].text;
    
        const handleNextClick = () => {
            setCurrentProblem(currentProblem + 1);
        }
        return (
            <div>
                <p>{problem}</p>
                <div>
                    <label>
                        <input type="radio" name="options" id="optionA" required/>
                        {optionA}
                    </label>
                    <label>
                        <input type="radio" name="options" id="optionB" />
                        {optionB}
                    </label>
                    <label>
                        <input type="radio" name="options" id="optionC" />
                        {optionC}
                    </label>
                    <label>
                        <input type="radio" name="options" id="optionD" />
                        {optionD}
                    </label>
                </div>
                <Button onClick={handleNextClick}>Next</Button>
            </div>
        )
    }

    return (
        <p>Finish!</p>
    )
}

export default Problem;