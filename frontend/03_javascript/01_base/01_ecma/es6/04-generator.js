/**
 * ES6 -- Generator
 *
*/

function* helloWorld() {
  console.log('-----------01-----------');
  yield 'hello';

  console.log('-----------02-----------');
  yield 'world';

  console.log('-----------03-----------');
  return '...';
}

const helloWorldStates = helloWorld();

// console.log(helloWorldStates.next());
// console.log(helloWorldStates.next());
// console.log(helloWorldStates.next());

// ---------------------------------------------yield 表达式-----------------------------------------------------------


function* yieldStatement() {
  const out01 = yield 5;

  console.log('hello' + (yield 123));
  console.log('hello' + (yield));
  console.log(out01);
}

const yieldStatementStates = yieldStatement();

// console.log(yieldStatementStates.next());
// console.log(yieldStatementStates.next());
// console.log(yieldStatementStates.next());
// console.log(yieldStatementStates.next());

// =============================================next方法的参数=============================================================

function* foo(x) {
  const y = 2 * (yield (x + 1));
  const z = yield (y / 3);

  return x + y + z;
} 

const iteratorA = foo(5);
console.log(iteratorA.next());  
console.log(iteratorA.next(12));
console.log(iteratorA.next(4));