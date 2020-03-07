function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.includes(' ') ? expr.split(' ') : expr.split('');
    expr = expr.filter(value => {
            if (value !== '') return value
    }).map(value => {
        if ((value.includes(')') || value.includes('(')) && value.length > 1) throw "ExpressionError: Brackets must be paired";
        return isFinite(value) ?  Number(value) : value;
    });

    return evaluate(makeSubArray(expr));
}

function makeSubArray(arr) {
    let newArr = [];
    let x;
    while (arr.length > 0) {
        x = arr.shift();
        if (x === '(') {
            newArr.push(makeSubArray(arr))
        } else if (x === ')') return newArr;
        else newArr.push(x);
    }
    return newArr;
}

function evaluate(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) arr[i] = evaluate(arr[i]);
    }
    arr = calculatePairAndDeleteFromArray(arr, '*', '/');
    arr = calculatePairAndDeleteFromArray(arr, '+', '-');

    return arr[0]
}

function calculatePairAndDeleteFromArray(arr, sign1, sign2) {
    while (arr.includes(sign1) || arr.includes(sign2)) {
        let itemIndexMultiply = arr.indexOf(sign1);
        let itemIndexDivision = arr.indexOf(sign2);
        let itemIndex;

        if (itemIndexMultiply < itemIndexDivision && itemIndexMultiply > -1
            || itemIndexMultiply !== -1 && itemIndexDivision === -1) {
            itemIndex = itemIndexMultiply
        } else if (itemIndexMultiply > itemIndexDivision && itemIndexDivision > -1
            || itemIndexDivision !== -1 && itemIndexMultiply === -1) {
            itemIndex = itemIndexDivision
        }

        let evaluated = calculate(arr[itemIndex - 1], arr[itemIndex + 1], arr[itemIndex]);
        arr.splice(itemIndex - 1, 3, evaluated);
    }
    return arr
}


function calculate(x, y, sign) {
    if (y === 0 && sign === '/') throw "TypeError: Division by zero.";

    return sign === '+' ? x + y :
        sign === '-' ? x - y :
            sign === '*' ? x * y :
                x / y;
}

module.exports = {
    expressionCalculator
};

// console.log(Number('2'));
// console.log(expressionCalculator('((1 + 2 * 3'));
// console.log(evaluate([59, '-', 13, '+', [25, '*', 22, '/', [47, '/', 38, '*', 66], '+', 43, '-', 5], '*', 39, '/', 55]));
// console.log(evaluate([2, '-', 1, '+', [[5, '*', 2, '+', 2], '/', [4, '/', 2, '*', 3]]]));
// console.log(expressionCalculator('2 + 2'));
console.log(expressionCalculator('59 - 13 + (  25 * 22 / (  47 / 38 * (  64 / 93 - 91 + 72  ) * 66  ) + 43 - 5  ) * 39 / 55 '));