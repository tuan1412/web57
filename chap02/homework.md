# Ex1
Tìm hiểu hàm fs.writeFile của module FileSystem.
Sử dụng fs.writeFile để tạo ra file numbers.txt với nội dung `1 8 5 7 2`

# Ex2
Tạo một function writeFile có nhiệm vụ ghi file với đầu vào và đầu ra như sau
```
// data là một object
const writeFile = (path, data) => {
  // Hoàn thiện hàm
}

const writeFileToDisk = async (path, data) => {
  try {
    const isSuccess = await writeFile(path, data);
    console.log(isSuccess) // true
  } catch (err) {
    console.log(err) // 'Lỗi'
  }
}
```

# Ex3
Từ file numbers.txt của Ex1, sử dụng module file system để đọc nội dung, đếm số các sổ lẻ và ghi nội dung vào file result.txt

Ví dụ 
- file numbers.txt là `1 8 5 7 2` thì file result.txt là `3`
- file numbers.txt là `9 2 1 3 5` thì file result.txt là `4`

# Ex4
Cho đoạn code sau:
```
async function wait() {

}

async function go() {
  console.log('Starting');
  await wait(2000);
  console.log('running');
  await wait(200);
  console.log('ending');
}
```
Hoàn thiện hàm wait sao cho "ending" hiên thị sau "running" 200ms, "running" hiện thị sau "Starting" 2000ms

