var a = 3 // 3
var b = 3 // 3
console.log(a === b)

var c = { x: 3 } // 0x00
var d = { x: 3 } // 0x01
console.log(c === d)

var x = { a : 3 }
var y = x
y.a = 4 
console.log(x)
console.log(y)

var q = 3
var s = q
s = 5
console.log(s, q)
// Hoàn toàn clone được một object y từ x mà thay đổi y ko làm thay đổi x

// typeof
// function, array, null
console.log(typeof [])
// câu hỏi: cách kiểm tra function, array, null
var a = []
console.log(a.length);
a = 3
// console.log(a.filter(x => x));

var firstName = '';

console.log(69 === '69')

if (!firstName) {
  console.log('First Name is required')
}

var a = firstName || 'Nguyễn'
console.log(a)
var b = !!a
var b = Boolean(a)

console.log(b, !!0, +'1', 1 + '')

var tasks = [{
  content: 'Học',
  isDone: true,
  time: 2
}, {
  content: 'Ăn',
  isDone: false,
  time: 3
}]


var notDoneTasks = tasks.filter(function (task) {
  return !task.isDone
})

function filter (arr, callback) {
  var results = [];

  for (let i = 0; i < arr.length; i+=1 ) {
    if (callback(a[i])) {
      results.push(arr[i])
    }
  }

  return results;
}

function filterTaskDone() {
  /*
  for { task.Done } 
  */
}

function filterTaskLessThan2() {
  /*
  for { task.Done } 
  */
}

var sortedTasks = tasks.sort(function(task, otherTask) {
  return -task.time + otherTask.time
})


console.log(sortedTasks, tasks)

function sum(a, b) {
  return a + b
}

function first() {
  setTimeout(function(){
    console.log("Một");
  }, 0);
}

function second(){
  console.log("Hai");
}

// first();
// second();

// Giải thích đoạn code này tại sao Hai chạy trước 1

function test() {
  var greeting = "hey hi";
  var times = 4;

  if (times > 3) {
    var greeting = "say Hello instead"; 
  }

  console.log(greeting); //"say Hello instead"
}

test()

function test1() {
  let greeting = "hey hi";
  var times = 4;

  if (times > 3) {
    let greeting = "say Hello instead";
    console.log('gre', greeting)
  }

  console.log(greeting); //"say Hello instead"
}

test1()

var greeting = 'a'
var greeting = 'b'
console.log(greeting)

// let greeting1 = 'a'
// let greeting1 = 'a'

console.log(hoisting)

var hoisting = 'Hello'

/*
var hoisting
console.log(hoisting)
hoisting = 'Hello'
*/

var hello
function notDeclareVariable() {
  hello = 3
}
notDeclareVariable()

console.log('1', hello)

const xyz = '3'
// xyz = 4
let course = 'Web57'
course = 'X'


let msg = 'Hello'
function alertInfo() {
  console.log(msg);
}

function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
console.log(counter)
console.log(counter())
console.log(counter())
counter()
counter()
counter()
console.log(counter())

var name = "Bob", time = "today";
// Cách cũ
console.log("Hello \"" + name + " how are you " + time + " ?");
// escape character

// Dùng string interpolation, để ý dấu `
console.log(`Hello ${name}, how are you "abc" 'abc'${time}?`);

const numbers = [0, 2, 3, 4] //=> [{x: 1}, {x:2}, {x:3}, {x:4}]

const multipleTwo = x => x * 2
const doubles = numbers.map(x => ({
  x: x || 10
}))

console.log(doubles)

let sayHi = (message) => {
  message = typeof message === 'undefined' ? 'Hello JS' : message;
  console.log(message);
}
// Cách mới
// let sayHi = (message = 'Hello JS') => {
//   console.log(message);
// }

const foo = ['one', 'two', 'three', '4'];

const [red, yellow, green] = foo;

console.log(foo[0], foo[1], foo[2]);
const red1 = foo[0]
const yellow1 = foo[1]

console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"
const [,,,fourth] = foo;
console.log(fourth)

const teacher = { fName: 'Nguyễn', lName: 'Tuấn' }

// const fName = teacher.fName;
// const lName = teacher.lName

const { lName:lName1, fName } = teacher;

console.log(fName, lName1)

const iphones = ['iphone11', 'iphone12', 'iphone13'];
const macbooks = ['macbook2015', 'macbook2016', 'macbook2017'];

const appleProducts = [
  ...iphones, // iphone1, iphone2, iphone3
  'iphoneX', 
  'iphoneXS', 
  ...macbooks, 
  'macbookM1'
];

const newIphones = [...iphones, 'iphone14']
newIphones.push('a')

const courses = ['C4E', 'CI', 'Web', 'Mobile'];
const [beginner, medium, ...advances] = courses
console.log(advances)

// Áp dụng tương tự với object
let obj1 = { op: 'bar', ip: 42, xp: 2 };

let obj3 = { op: 'xyz', r: 2 }

const { op, ...rest } = obj1

console.log(rest);
// Clone mảng
const cloneIps = [...iphones]
const obj2 = { ...obj1 }

console.log({ ...obj1, ...obj3 })