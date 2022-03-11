// require để kết nối module trong JS (cụ thể NodeJS) => CommonJS
// import export default => ES6 Module

const fs = require('fs');

// fetch => đẩy libUV => ko biết bh thực hiện xong
// console.log('Hi');
// readFile đẩy vào libUV
// fs.readFile('text.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// })

// readFile đẩy libUV
// fs.readFile('text1.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log(data);
//   }
// })

// console.log('')
// const a = 3

// fs.readFile('text.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
    
    // fs.readFile('text1.txt', { encoding: 'utf-8' }, (err, data) => {
    //   if (err) {
    //     console.log('err', err);
    //   } else {
    //     console.log(data);
    //   }

    //   fs.readFile('text2.txt', { encoding: 'utf-8' }, (err, data) => {
    //     if (err) {
    //       console.log('err', err);
    //     } else {
    //       console.log(data);
    //     }
    //   })
    // })
//   }
// })

// fs.readFile('text1.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log(data);
//   }
// })

// Promise
// fs.readFile('text4.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   console.log(data);
// });

// sugar syntax
// fs
//   .promises
//   .readFile('text4.txt', { encoding: 'utf-8' })
//   .then(function(data) {
//     console.log(data);
//   })
//   .catch(function(err) {
//     console.log(err);
//   })

const readFile = (path, data) => {
  if (data) {
    console.log('Hi hi', data)
  }
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    })
  })
}

// readFile('text4.txt')
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err)
//   })

// function wait(seconds, callback) {
//   setTimeout(() => {
//     callback('Done')
//   }, seconds)
// }

// wait(300, (done) => console.log(done))

// function waitPromise(seconds) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('done');
//     }, seconds)
//   })
// }

// waitPromise(300)
//   .then((done) => {
//     console.log(done)
//   })

// readFile('text.txt')
//   .then(data => {
//     console.log(data);

    // readFile('text1.txt')
    //   .then(data => {
    //     console.log(data);

    //     readFile('text2.txt')
    //       .then(data => {
    //         console.log(data)
    //       })
    //   })
  // })


// Promise chain
// readFile('text1.txt')
// .then(data => {
//   console.log(data)
//   return readFile('text1.txt')
// })
// .then(data => {
//   console.log(data)
//   return readFile('text2.txt')
// })
// .catch(err => {
//   console.log(err)
// })

// async await
// await phải chạy trong hàm async
// await là await một promise
// async bản chất là trả về promise

async function readAllFile() {
  try {
    // throw new Error('Lỗi');
    const data = await readFile('text.txt');
    console.log(data);
    const data1 = await readFile('text1.txt', data);
    console.log(data1);
    const data2 = await readFile('text2.txt');
    console.log(data2);

    return data2
  } catch (err) {
    // throw new Error('Lỗi');
    console.log(err);
    return undefined;
  }
}
// => new promise ((resolve) => resolve(data))
// => new promise ((resolve, reject) => reject(err))

readAllFile()
.then(data2 => console.log('1', data2))
.catch(err => {
  console.log('2', err) // Lỗi
})

// async function callInternet() {
//   try {
//     const girlFriends = await fetch('http://tinder');

//     const chooseGirl = girlFriends[0]

//     const result = await fetch('http://ketban', { data: chooseGirl })
//   } catch (err) {

//   }
// }
