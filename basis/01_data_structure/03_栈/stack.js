/** 
 * 栈（LIFO）
*/
const INVALID_VAL = undefined;

class Stack {
    constructor() {
        this.dataStore = [];
        this.top = 0;
        this.empty = true;
    }

    /** 
     * 入栈
    */
    push(item) {
        this.dataStore[this.top++] = item;
    }

    /** 
     * 出栈
     * 逻辑删除
    */
    pop() {
        if (this.top > 0) {
            return this.dataStore[--this.top];
        }

        return INVALID_VAL;
    }

    /** 
     * 预览栈顶元素
    */
    peek() {
        const top = this.top;

        if (top > 0) {
            return this.dataStore[top - 1];
        }
        
        return INVALID_VAL;
    }

    /** 
     * 查询栈的长度
    */
    length() {
        return this.top;
    }

    /** 
     * 清空栈
     * 逻辑删除
    */
    clear() {
        this.top = 0;
    }

    /** 
     * 读取栈
    */
    printf() {
        return this.dataStore.slice(0, this.top);
    }
}

// 场景1：十进制转换为2~9进制 除2取余法
function baseConver(num, base) {
    let stack = new Stack();
    let converted = '';

    do {
        stack.push(num % base);
        num = Math.floor(num / base);
        // log
        console.log(stack.printf());
    } while (num > 0);

    while (stack.length() > 0) {
        converted += stack.pop();
    }

    return converted;
}
    // 转换为2进制
// console.log('34转换为2进制后：', baseConver(34, 2));
    // 转换为9进制
// console.log('34转换为9进制后：', baseConver(34, 9));


// 场景2：判断回文
function isPlindrome(word) {
    let stack = new Stack();
    let rWord = '';

    // 入栈
    for (let i = 0; i < word.length; i++) {
        stack.push(word[i]);
    }
    // 倒序排列
    while (stack.length() > 0) {
        rWord += stack.pop();
    }
    // 判断是否回文
    if (word == rWord) {
        return true;
    } else {
        return false;
    }
}

// 场景3：递归 求阶乘
function factorial(n) {
    let stack = new Stack();
    let ret = 1;

    while (n > 1) {
        stack.push(n--);
    }
    while (stack.length() > 0) {
        ret *= stack.pop();
    }

    return ret;
}

// practice 1 
// 栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接受一个算
// 术表达式作为参数，返回括号缺失的位置。下面是一个括号不匹配的算术表达式的例
// 子：2.3 + 23 / 12 + (3.14159×0.24
function findMissingBracket(exp) {
    let i = 0;
    const expLen = exp.length;
    let stack = new Stack();

    while (i < expLen) {
        const expChar = exp[i];
        const stackTop = stack.peek();

        // 左边括号入栈
        if (expChar === '(' || expChar === '[' || expChar === '{') {
            stack.push({
                idx: i,
                char: expChar
            });
        }

        if (expChar === ')' && stackTop.char === '(') {
            stack.top--;
        }

        if (expChar === ']' && stackTop.char === '[') {
            stack.top--;
        }

        if (expChar === '}' && stackTop.char === '{') {
            stack.top--;
        }
        i++;
    }

    // 栈非空，说明不匹配
    if (stack.top > 0) {
        const stackTop = stack.peek();
        return stackTop.idx;
    } else {
        return -1;
    }
}
// console.log('缺失的括号在：', findMissingBracket('2.3 + 23 / 12 + [(3.14159×0.24)]'));


// practice 2
// 现实生活中栈的一个例子是佩兹糖果盒。想象一下你有一盒佩兹糖果，里面塞满了红
// 色、黄色和白色的糖果，但是你不喜欢黄色的糖果。使用栈（有可能用到多个栈）写一
// 段程序，在不改变盒内其他糖果叠放顺序的基础上，将黄色糖果移出。

function initPezBox() {
    let pezBox = new Stack();

    pezBox.push('red');
    pezBox.push('yellow');
    pezBox.push('red');
    pezBox.push('yellow');
    pezBox.push('white');
    pezBox.push('yellow');
    pezBox.push('white');
    pezBox.push('yellow');
    pezBox.push('white');
    pezBox.push('red');
    console.log('pezBox inited: ', pezBox.printf());
    return pezBox;
}

function filterElement(element, pezBox) {
    let getStack = new Stack();     // 存储过滤掉的元素
    let setStack = new Stack();     // 剩下的元素

    // 过滤
    while (pezBox.length() > 0) {
        const topEle = pezBox.pop();

        if (topEle === element) {
            // 需过滤的元素
            getStack.push(topEle);
        } else {
            setStack.push(topEle);
        }
    }

    // 剩下的元素重新入栈
    while (setStack.length() > 0) {
        pezBox.push(setStack.pop());
    }

    return pezBox;
}

// const pezBox = filterElement('yellow', initPezBox());
// console.log('过滤yellow后：', pezBox.printf());

