// input
// numbers.txt => 1 8 5 7 2
// output => 3
// CommonJS
// const fs = require('fs');
const fileSystem = require('./fileSystem/fs'); 
// const checkOdd = require('./isOdd');
const checkOdd = require('is-odd-num');

async function countOddNumber() {
  try {
    // đọc file => chuỗi
    const strNumbers = await fileSystem.readFile('numbers.txt');

    // convert dạng array => số
    const numbers = strNumbers.split(' ').map(x => Number(x));

    // đếm
    const countOddNumber = numbers.filter(checkOdd).length;

    // ghi
    await fileSystem.writeFile('result.txt', `${countOddNumber}`)

  } catch (err) {
    console.log(err);
  }
}

countOddNumber();