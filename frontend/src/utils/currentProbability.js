import errorTypes from "../fakeData/errorTypes";
import problems from "../fakeData/problems";
import combinationsAccuracy from "../utils/tableProbability";

// 每一題完成提交後，就會更新題目正確/錯誤率
// 以及更新所有錯誤類型三種情況（noIdentity, partial, full）的機率
function updateCurrentProbability(){
    
}

const problemProbability = [];
for(let i=1; i<=problems.length; i++){
    problemProbability.push({
        correct: 50,
        wrong: 50
    })
}
const errorTypesFamiliarity = [];
for(let i=0; i<=errorTypes.length; i++){
    errorTypesFamiliarity.push({
        noIdentity: 1/3,
        partialIdentity: 1/3,
        fullIdentity: 1/3
    })
}
