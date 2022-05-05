# Buổi 15
- Xử lý Form trong React
- Controlled Input vs Uncontrolled Input
- Xử lý form với react-hook-form

# Form trong React
Xử lý Form là tác vụ thường gặp trong project frontend. 

Với kiểu xử lý default, của DOM khi người dùng submit form, trang web sẽ load một page mới (đường dẫn dựa vào phương thức action)
```
<form action="/action_page.php">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
</form> 
```

Cách làm này giờ không còn được sử dụng nhiều, đặc biệt là trong project React.

Với React, ta sẽ chặn event default và lấy dữ liệu của form, gọi HTTP request lên server nếu cần
```
const handleSubmit = () => {
  e.preventDefault();
  // 
}
```
# Controlled Components
Để lấy dữ liệu của form, cách đơn giản nhất là ta tạo một state và xử lý value của các form element (ví dụ input, textarea, select) theo state đó

```
function NameForm(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue({value: event.target.value});
  }

  const handleSubmit(event) {
    alert('A name was submitted: ' + value);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

Nếu form có nhiều form element có thể dùng chung một state như sau
```
function Reservation() {
  const [formState, setFormState] = React.useState({
    isGoing: true,
    numberOfGuests: 2
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormState(prevFormState => ({
      ...prevFormState,
      [name]: value
    }))
  }

  return (
    <form>
      <label>
        Is going:
        <input
          name="isGoing"
          type="checkbox"
          checked={formState.isGoing}
          onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Number of guests:
        <input
          name="numberOfGuests"
          type="number"
          value={formState.numberOfGuests}
          onChange={handleInputChange} />
      </label>
    </form>
  );
  
}
```

Với controlled component ta có biến state để tuỳ ý thực hiện các nghiệp vụ như lắng nghe sự thay đổi của input, validation, ... Tuy nhiên, cách này cũng có thể gây ra hiện tượng form bị re-render nhiều lần. Ví dụ form bên trên, thay đổi input number khiến cả form re-render, nếu form to hơn có thể gây ra hiện tượng lag.

Đôi khi ta cũng ko cần lắng nghe thay đổi state, chỉ cần lấy dữ liệu khi submit form thì ta có thể dùng cơ chế uncontrolled component

# Uncontrolled Component
Uncontrolled Component là cơ chế không gắn giá trị của một component với state mà lấy giá trị trực tiếp từ DOM thật.
```
function NameForm() {
  const inputRef = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('A name was submitted: ' + inputRef.current.value);

  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={inputRef} defaultValue="Bob"/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

Vì không gắn vào state, thì uncontrolled dù có thay đổi giá trị cũng không làm form re-render. Tuy nhiên, ta lại không thể lắng nghe sự thay đổi của value này. Do vậy cần tuỳ nghiệp vụ cần lựa chọn kiểu component thích hợp.

# Xử lý form nâng cao với thư viện
Nếu làm chuẩn chỉ, Form cần rất nhiều nghiệp vụ, trong đó có một nghiệp vụ quan trọng là validation. Nếu xử lý thuần thuý thì sẽ rất vất vả => Cần sử dụng thư viện.

Một số thư viện nổi tiếng như: 
- react-hook-form (https://react-hook-form.com/)
- Formik (https://formik.org/)
- React Final Form (https://final-form.org/react)

Trong đó, ta lựa chọn sử dụng react-hook-form. React hook form ngoài có nhiều API để hoàn thành nghiệp vụ còn đã rất khéo léo kết hợp 2 khái niệm Controlled Component và Uncontrolled Component khiến form của chúng ta ko bị re-render quá nhiều, tối ưu performance rất tốt.

```
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName?.type === 'required' && "First name is required"}
      
      <input {...register("lastName", { required: true })} />
      {errors.lastName && "Last name is required"}
      
      <input type="submit" />
    </form>
  );
}
```


