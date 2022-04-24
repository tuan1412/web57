# Buổi 14
- Function Component
- React Hook

# Function Component
Ngoài class component, để tạo React Component còn một cơ chế nữa là Function Component

Trước khi hook ra đời (bản 16.8), Function Component chỉ dùng với các component không quản lý state (chỉ nhận props). Sau khi có hook, Function Component đã có cả 2 cơ chế nên được sử dụng rộng rãi.

```
import React, { useState } from 'react';

function Example(props) {
  const [count, setCount] = useState(props.defaultProps);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
JSX được return trong function chứ không cần hàm render

Props lúc này không còn gọi qua this.props nữa mà là tham số của function

State được quản lý qua hook useState chứ không còn qua this.setState

`Chú ý: Function Component không còn khái niệm lifecycle`

# Hook
Hook được giới thiệu chính thức ở bản 16.8. https://reactjs.org/docs/hooks-intro.html

Tư tưởng của hook là xử lý logic dựa vào lắng nghe thay đổi của data (dependencies)
=> Khác với tư tưởng lifecycle, đến giai đoạn này nên xử lý logic gì

=> Tư tưởng hook giống với declarative programing hơn


## useState
useState dùng để quản lý state. Hook này chỉ được gọi một lần duy nhất
```
const [state, setState] = useState()
```
useState bản chất là một hàm với kết quả trả về là mảng với tham số đầu tiên là state quản lý, tham số thứ hai là là một hàm để quản lý (đổi lại giá trị state)

Cú pháp trên là destructuring array nên ta có thể đặt tên biến thế nào cũng được.

Theo pattern thì nên đặt theo ý nghĩa của state
```
const [count, setCount] = useState(0)
const [tasks, setTasks] = useState(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return [];
})
```
useState có truyền tham số là giá trị hoặc function (như hình trên) để khởi tạo giá trị default của state

Hàm setState sẽ gán giá trị mới vào state. Có 2 cách sử dụng:
- C1: gán thẳng giá trị
```
const reset = () => setCount(0);
```

- C2: sử dụng function làm tham số (dùng khi cần lấy giá trị state trước đó)
```
const inc = () => set(preCount => preCount + 1)
```
`Lưu ý: setState không có merge state như this.setState => setState là set thẳng giá trị luôn, ghi đè state cũ`
## useEffect
useEffect chạy mỗi lần **sau** khi component render. (Để đơn giản thì có thể hiểu useEffect là sự kết hợp giữa componentDidMount và componentDidUpdate)

```
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])
```

Khi tasks thay đổi (bao gồm cả lần khởi tạo) => Chạy logic ở bên trong useEffect

Khi chỉ cần cần chạy một lần sau khi render (tương tự didmount), để dependencies là mảng rỗng
```
useEffect(() => {
  // 
}, [])
```

Đôi khi ta cần xoá side-effect khi component thay đổi dữ liệu ví dụ như remove event listener thì trong useEffect ta sẽ dùng hàm return
```
 useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
```
`Câu hỏi đặt ra là biến nào là biến gây ra side-effect? => là những biến có scope nằm ngoài function của hook. Khi cài create-react-app đẫ có sẵn tool để nhắc lập trình viên các biến có khả năng gây ra side-effect. Từ đó ta cần chú ý thêm vào dependencies để tránh phát sinh bug, đáp ứng đúng tư tưởng lắng nghe sự thay đổi của data`
## useMemo
useMemo chạy mỗi lần dependencies thay đổi và chạy trước render. useMemo dùng để trả kết quả (một kiểu dữ liệu nào đó của JS), sử dụng khi muốn hạn chế việc tính toán lại dữ liệu
https://reactjs.org/docs/hooks-reference.html#usememo
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
``` 
Nếu hàm computeExpensiveValue tốn rất nhiều thời gian để tính toán, thì nếu a, b không thay đổi việc tính lại (sau mỗi lần re-render) là rất phí => Dùng useMemo để đỡ phải tính toán lại nếu a hoặc b không đổi
## useCallback
Tương tự useMemo, useCallback dùng để ghi nhớ giá trị, chạy mỗi lần dependencies thay đổi và chạy trước render
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
Giá trị của useCallback là một function, chính là tham số đầu vào của useCallback.

Lợi ích của useCallback là hàm đó được ghi nhớ giá trị reference để so sánh khi cần. Nên nhớ khi so sánh 2 function trong JS thì kết quả trả về là false, do vậy để hàm giống nhau so sánh trả kết quả về true thì chúng cần chung reference.

Việc so sánh hàm diễn ra khi nào: khi hàm đó được cho vào list dependencies hoặc dùng kết hợp mới memo để tránh re-render

## useRef
useRef dùng để lưu trữ dữ liệu. Giá trị này sẽ không đổi qua mỗi lần render trừ khi chủ động gán lại. Thường dùng để lưu giá trị DOM thật, hoặc lưu biến nếu muốn dùng qua nhiều lần render

```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

Ở ví dụ trên thì inputRef sẽ lưu giá trị là DOM thật của input

## useContext
Sẽ học ở buổi sau

