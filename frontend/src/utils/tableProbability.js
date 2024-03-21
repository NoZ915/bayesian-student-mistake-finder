import problems from "../fakeData/problems";

//------------------------------------------//
// 排列與組合的函式
function getAllCombinations(arrays, index, current, result, selectedTypes) {
    if (index === arrays.length) {
        const combination = {};
        for (let i = 0; i < arrays.length; i++) {
            combination[selectedTypes[i]] = current[i];
        }
        result.push(combination);
        return;
    }

    arrays[index].forEach((item) => {
        current.push(item);
        getAllCombinations(arrays, index + 1, current, result, selectedTypes);
        current.pop();
    });
}

function getAllPermutations(arrays, selectedTypes) {
    const result = [];
    getAllCombinations(arrays, 0, [], result, selectedTypes);
    return result;
}

//------------------------------------------//
// 去遍歷problems中所有的problem
// 再看problem裡的四個option之errorType有哪些（不重複，correct選項不放入）
// push進selectedTypes
const selectedTypes = [];
const problem = problems[1];
problem.options.forEach(option => {
    if(selectedTypes.indexOf(`B0${option.errorType}`) === -1 && option.errorType !== 0){
        selectedTypes.push(`B0${option.errorType}`);
    }
})

//------------------------------------------//
// 看有幾個errorType
// arrays陣列就會有幾個['noIdentity', 'partialIdentity', 'fullIdentity']
const arrays = [];
for(let i=1; i<=selectedTypes.length; i++){
    arrays.push(['noIdentity', 'partialIdentity', 'fullIdentity']);
}

const combinations = getAllPermutations(arrays, selectedTypes);
// console.log(combinations);

//------------------------------------------//
// 算出combinations中每一組合的correct及wrong之機率值
// e.g.selectedTypes = [B01, B04]
// 先算出B01, B04各佔錯誤選項的比例 > 用reduce算出
const AllErrorTypes = [];
problem.options.forEach(option => {
    if(option.errorType !== 0){
        AllErrorTypes.push(`B0${option.errorType}`);
    }
})
const countErrorTypes = AllErrorTypes.reduce((obj, item) => {
    if(item in obj){
        obj[item]++;
    }else{
        obj[item] = 1;
    }
    return obj;
}, {})
// console.log(countErrorTypes)
const combinationsAccuracy = combinations.map(combination => {
    let countErrorTypesValue = Object.values(countErrorTypes);
    let combinationValue = Object.values({...combination});

    let totalWrongRate = 0;
    let totalCorrectRate = 0;
    for(let i=0; i<=countErrorTypesValue.length-1; i++){
        let errorTypeState = combinationValue[i];
        let wrongRate = 0;
        let factor;
        if(errorTypeState === "noIdentity") factor = 1;
        else if(errorTypeState === "partialIdentity") factor = 1/2;
        else if(errorTypeState === "fullIdentity") factor = 0;
        wrongRate = (countErrorTypesValue[i]/3) * factor;
        totalWrongRate += wrongRate;
    }
    totalCorrectRate = 1 - totalWrongRate;

    let updatedCombination = {...combination, totalCorrectRate, totalWrongRate};
    return updatedCombination;
})
// console.log(combinationsAccuracy)

export {combinationsAccuracy};