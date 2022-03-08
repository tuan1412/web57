## Ex1
Cho đoạn code sau
```
const obj1 = { x: 20, y: 30 };

function cloneDeep(obj) {

}
const obj2 = cloneDeep(obj1)
obj2.x = 10

```
Hoàn thiện function cloneDeep sao cho sau khi thực hiện chương trình
```
obj1 = { x: 20, y: 30 }
obj2 = { x: 10, y: 30 }
```
## Ex2
Cho đoạn code sau
```
const macbooks = ['macbook2015', { model: 'macbook2014' }, 'macbook2017'];
const apples = [...macbooks];
apples[0] = 'air';
apples[1].model = 'm1';

console.log(macbooks)
console.log(apples)
```
Kết quả của macbooks và apples là gì? Giải thích

## Ex3
Cho đoạn code sau
```
var text = 'outside';
function show() {
  console.log(text) //1
  var text = 'inside';
}
```
Kết quả in ra console ở 1 là gì? Giải thích

## Ex4
Hoàn thiện 2 hàm inBetween và inArray sao cho đoạn code chạy ra kết quả trong comment
```
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

## Ex5
Cho đoạn code sau. Kết quả hiện ra là gì? Giải thích 
```
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```
## Ex6
Thứ tự message in ra ở đoạn code sau là gì? Giải thích (gợi ý tìm hiểu khái niệm Event loop)
```
console.log("hello");

setTimeout(() => console.log("world"), 0);

console.log("hi");
```


