const loginFormEl = document.getElementById("loginForm");
const usernameEl = document.getElementById("usernameInp");
const passwordEl = document.getElementById("passwordInp");

loginFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // call http request lên server
  const authUserInfo = {
    username: usernameEl.value,
    password: passwordEl.value,
  };

  fetch("http://localhost:9000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authUserInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Đăng nhập thành công');
      } else {
        alert('Đăng nhập thất bại');
      }
    })
    .catch((error) => {
      alert('Đăng nhập thất bại');
    });
});
