s# Buổi 11
- Làm quen với React
- Mô tả create-react-app để làm gì, lập trình frontend hiện đại cần gì
- Component trong React
- Mô tả cách thức hoạt động trong React ⇒ DOM ảo, DOM thật
- JSX, CSS trong React

## Khởi tạo dự án React đầu tiên
Ta sẽ sử dụng create-react-app, một template project React phổ biến. 
```
npx create-react-app my-app
cd my-app
npm start
```

Khi đó, trình duyệt tại đường dẫn http://localhost:3000
![react](static/react.png)

## Lập trình frontend quá khứ vs Lập trình frontend hiện đại
### Quá khứ
Cách lập trình frontend trong quá khứ khi sử dụng thư viện, ta thường làm như sau
```
<html>
  <body>
    <script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js></scrip>
    <script src="./my-custom.js"></script>
  </body>
</html>
```

Khi đó, nếu sắp xếp không đúng thứ tự, ví dụ như my-custom.js đứng ở trước jQuery mà my-custom.js có sử dụng biến $ thì ta sẽ gặp lỗi sau


Project frontend ngày càng phức tạp đặt ra nhu cầu tổ chức code, chi nhỏ file (module hoá) càng nhiều. Khi đó, việc sắp xếp đúng thứ tự file như vậy rất khó khăn

=> Cần một tool để giải quyết vấn đề module management

Một vấn đề nữa là trên thế giới đã phát triển rất nhiều ngôn ngữ khác JS, CSS như JSX của React, Typescript, ,... Nếu trực tiếp sử dụng các ngôn ngữ này thì trình duyệt sẽ không hiểu (Lưu ý: trình duyệt chỉ hiểu được HTML, CSS, JS). Cùng với đó, chính JS và CSS ở các phiên bản hiện đại (ES6, flex, grid css, ...) các trình duyệt cũng chưa chắc đã hiểu

=> Cần một tool để giải quyết vấn đề code transform

### Hiện đại
Từ những vấn đề trên, ta có thể thấy, lập trình frontend hiện đại việc làm đầu tiên là phải chọn được tool và config được tool. :D

Khi đó, create-react-app đã giải quyết được vấn đề đó. Ngoài create-react-app, có rất nhiều template khác cũng như framework giải quyết sẵn cho chúng ta như react-boilerplate, nextjs,..

Ta sẽ tìm hiểu qua một số tool sử dụng trong create-react-app
#### Webpack
Tool để module management thường được sử dụng là [webpack](https://webpack.js.org/).
![webpack](static/webpack.png)

Webpack có công dụng tập hợp các module code (JS, CSS, Image, ...), tóm gọn chúng thành các một số file bundle nhất định để client load

```
// App.js
import logo from './logo.svg'; => Vốn dĩ file JS không thể import file svg => Nhờ webpack
import './App.css'; => Vốn dĩ file JS không thể import file CSS => Nhờ có webpack

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Nhờ có webpack ta hoàn toàn sử dụng import mà không cần quan tâm tới thứ tự
// Từ đó ta có thể sử dụng npm để quản lý các thư viện mà ta cần sử dụng
```
Ngoài bundle static file, webpack còn cung cấp cơ chế minify (đổi tên biến, xoá khoảng trắng, ...) cho file load về client nhỏ nhất có thể
#### Babel
[Babel](https://babeljs.io/docs/en/) là một JS compiler. Nhiệm vụ của Banel để transform JS, JSX thành JS phục vụ trình duyệt mình mong muốn.
Ví dụ
```
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

Ngoài Babel thì sẽ có rất nhiều tool khác để convert SCSS, LESS như node-sass, node-less. Để config hết đồng này thì cần nhiều thời gian tìm hiểu và create-react-app đã giúp chúng ta làm việc đó

#### Webpack Dev Server
Như chúng ta đã biết, web hoạt động trên cơ chế client-server. Khi chúng ta sử dụng create-react-app, ta cũng cần một server để truyền file HTML, CSS, JS. Vậy server đó ở đâu, localhost:3000 đó ở đâu.

Đây là tính năng Webpack Dev Server đã được config sẵn, bản chất nó là một đoạn code tạo ra một server y hệt như Express đã làm, tuy nhiên Webpack Dev Server này còn có thêm tính năng hot reload (thay đổi code => trình duyệt tự động cập nhật lại)

Đúng như tên gọi, dev server chỉ để phục vụ môi trường dev, còn khi deploy ta cần config hoặc code một server để chạy web app của chúng ta (https://create-react-app.dev/docs/deployment/)

#### Single page application
Khi lập trình với react, ta thường nghe tới từ này. Vậy điều này nghĩa là gì?

Mở thư mục public, ta có thể thấy file index.html. Single page có nghĩa là web chỉ sử dụng một file index.html duy nhất

http://localhost:3000 => Server trả file index.html
http://localhost:3000/posts => Server trả file index.html

Việc render giao diện như nào là hoàn toàn client với JS quyết định. File index.html đơn giản chỉ có một div với id = root

## Làm quen với React Component
### JSX
Khi lập trình React, ta sẽ chia giao diện thành các component. Việc phân chia như vậy giúp code có tính tái sử dụng và dễ dàng quản lý, bảo trì.

Các component được tổ chức theo cấp cha-con như dom trong html. App => Main => Navbar, ...

Có 2 dạng component
- Function Component
- Class Component

Function Component
```
function App() {
  return (
    <h1>Hello, world</h1>
  );
}

export default App;
```

Class component
```
import React from 'react'

class App extends React.Component {
  render() {
    return (
      <h1>Hello, world</h1>
    );
  }
}

export default App;
```

Giao diện hiển thị ở client được code ở đoạn return và có dạng [JSX](https://reactjs.org/docs/introducing-jsx.html). JSX thoạt nhìn giống HTML, tuy vậy bản chất nó là Javascript.

Ví dụ:
```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
Babel sẽ transform JSX sang JS như hình trên để trình duyệt hiểu và render thành DOM.

Một số điểm khác biệt giữa JSX và HTML
- JSX dùng className thành cho class
- Thẻ JSX bắt buộc phải có thẻ đóng, HTML thì không, ví dụ thẻ `<img />, <br/> <input />`
- JS có thể được run ở bên trong JSX
```
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

### Vitrual DOM
React giúp tăng hiệu năng của trang web, khiến trang web nhanh. Tại sao nó nhanh?

Mỗi lần web cần thay đổi giao diện là một lần trình duyệt cần vẽ lại DOM (repaint) => Việc vẽ lại nhiều lần, nhiều chỗ khiến hiệu năng giảm

React hoạt động theo cơ chế DOM ảo. Cây Component được build thành một cây DOM ảo. Mỗi lần có sự kiện cần thay đổi => Component React render => Vitrual DOM xây dựng lại => React so sánh Vitrual DOM cũ và Vitrual DOM mới => Chỉ thay đổi DOM thật khi cần thiết

## Style trong React
Có rất nhiều cách để style trong React như inline style, import css, css module, css in js. Trong khuôn khổ bài học, sẽ dùng 2 cách

C1: inline CSS
```
<div
  style={{
    textAlign: "center",
    maxWidth: "950px",
    margin: "0 auto",
    border: "1px solid #e6e6e6",
    padding: "40px 25px",
    marginTop: "50px"
  }}
    >
      <img
        src="https://randomuser.me/api/portraits/women/48.jpg"
        alt="Tammy Stevens"
        style={{
          margin: "-90px auto 30px",
          width: "100px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "0"
        }}
      />
  </div>
```
Inline CSS khá giống inline CSS thông thường, khác ở chỗ các property được viết theo camelCase

C2: Import CSS
Cách này đang được create-react-app sử dụng. Có thể thay vì import file css có thể import file scss, less

Chú ý: cách này được webpack build thành các thẻ style ở html
![style](static/style.png)

Do vậy cần đặt các selector ở các component sao cho không bị ghi đè lẫn nhau. Có thể tham khảo quy tắc BEM, hoặc sử dụng tên Component làm class và selector

```
.App {
  text-align: center;
}

.App .App-logo {
  height: 40vmin;
  pointer-events: none;
}
```

Các thư viện khác như bootstrap, talwind,... có thể dẫn link cdn rồi để ở file index.html hoặc làm theo hướng dẫn của docs