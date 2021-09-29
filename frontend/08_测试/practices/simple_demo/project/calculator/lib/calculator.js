/**
 * 执行计算逻辑
*/

// 操作集合
const OPERATORS = {
  '+': (a, b) => parseInt(a) + parseInt(b),
  '-': (a, b) => parseInt(a) - parseInt(b),
  '*': (a, b) => parseInt(a) * parseInt(b),
  '/': (a, b) => parseInt(a) / parseInt(b)
}

// 传入的是否为数字
const isDigit = character =>
  character >= '0' && character <= '9'

// 传入的是否为操作
const isOperator = character =>
  !!OPERATORS[character]

// 传入的是否为等于操作
const isEqualSign = character =>
  character === '='

// const addDigit = (calculatorState, character) => {
//   if (calculatorState.initial) {
//     return Object.assign(
//       {},
//       calculatorState,
//       {display: character, initial: false, previousOperand: parseInt(calculatorState.display)})
//   } else {
//     return Object.assign({}, calculatorState, {display: calculatorState.display + character})
//   }
// }

// const addOperator = (calculatorState, character) => {
//   if (!calculatorState.operator || calculatorState.initial) {
//     return Object.assign({}, calculatorState, {operator: character, initial: true})
//   } else {
//     return Object.assign({}, compute(calculatorState), {operator: character})
//   }
// }

// const compute = calculatorState =>
//   !calculatorState.operator
//   ? Object.assign({}, calculatorState, {initial: true})
//   : {
//     display:
//       String(
//         OPERATORS[calculatorState.operator](calculatorState.previousOperand, parseInt(calculatorState.display))),
//     initial: true
// }

/**
 * 添加数值
*/
const addDigit = (calculatorState, char) => {
  if (calculatorState.isInitStatus) {
    // 初始状态
    return Object.assign({}, calculatorState, {
      display: char,
      isInitStatus: false,
      prevDigit: +char
    })
  } else if (!calculatorState.operator) {
    // 没有运算符时
    return Object.assign({}, calculatorState, {
      display: calculatorState.display + '' + char,
      prevDigit: calculatorState.prevDigit + '' + char
    })
  } else {
    // 已产生运算符
    return Object.assign({}, calculatorState, {
      display: calculatorState.display + '' + char,
      currDigit: calculatorState.currDigit + '' + char
    }) 
  }
}

/**
 * 添加运算符
*/
const addOperator = (calculatorState, char) => {
  if (
    (calculatorState.isInitStatus && !calculatorState.prevDigit)
    || 
    (calculatorState.operator && !calculatorState.currDigit)
  ) return calculatorState;

  if (calculatorState.operator) {
    const ret = calculatorState.operator(calculatorState.prevDigit, calculatorState.currDigit);

    return Object.assign({}, calculatorState, {
      display: ret + char,
      operator: OPERATORS[char],
      prevDigit: ret,
      currDigit: ''
    })
  } else {
    return Object.assign({}, calculatorState, {
      display: calculatorState.display + char,
      operator: OPERATORS[char],
      isInitStatus: false
    })
  }
}

/**
 * 执行等于计算
*/
const compute = calculatorState => {
  if (calculatorState.prevDigit && calculatorState.currDigit && calculatorState.operator) {
    const ret = calculatorState.operator(calculatorState.prevDigit, calculatorState.currDigit);

    return Object.assign({}, calculatorState, {
      isInitStatus: true,
      display: ret,
      prevDigit: ret,
      currDigit: '',
      operator: ''
    })
  }

  return calculatorState;
}


/**
 * 应用的初始状态
*/
module.exports.initialState = { 
  display: '0',       // 显示算式表达式
  isInitStatus: true, // 是否为初始状态
  prevDigit: '',      // 上一次的数值
  currDigit: '',      // 当前的数值
  operator: ''       // 当前的运算函数
}

/**
 * 计算应用的下一次状态
*/
module.exports.nextState = (calculatorState, character) => {
  if (isDigit(character)) {
    return addDigit(calculatorState, character)
  } else if (isOperator(character)) {
    return addOperator(calculatorState, character)
  } else if (isEqualSign(character)) {
    return compute(calculatorState)
  } else {
    return calculatorState
  }
}
