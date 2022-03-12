// function cloneDeep(obj) {
//   return { ... obj }
// }

// Đúng
const obj1 = { x: 20, y: { a: 1, b : 2 }}
const obj2 = cloneDeep(obj1);

obj2.x = 2
obj2.y.a = 3
console.log(obj1, obj2);

// search thử hàm cloneDeep của lodash

function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}
// trừ trường hợp value của key là function

var text = 'outside';
function show() {
  console.log(text) //1
  var text = 'inside';
}

/*
var text = 'outside';
function show() {
  var text
  console.log(text) //1
  text = 'inside';
}
// inner scope trước outer scope
*/
function sum(a, b) {
  return a + b
}

/*
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
*/

// filter cần truyền vào một hàm => bool
// inBetween(3, 6)
function inBetween(a, b) {
  return (element) => element >= a && element <= b
}

const arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr.filter(inBetween(3, 6)) ); // 3,4,5,6