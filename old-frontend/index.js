$('#alertBtn').on('click', () => {
  alert('Hi')
})

const container = document.getElementById("container");
const btn = document.createElement("button");
btn.innerText = "Toogle"
btn.className = "btn red";
btn.onclick = function(event) {
 if (this.classList.contains("red")) {
   this.classList.remove("red");
   this.classList.add("blue");
 } else {
   this.classList.remove("blue");
   this.classList.add("red");
 }
};
container.appendChild(btn);

// $('button').on('click', function() {
//   const $this = $(this);
//   const name = $this.attr('data-name');
// })

// Ví dụ: đi từ A - B, thì ta phải xây cầu để đi
// Ví dụ đi từ A - B, chúng ta chỉ có máy tính A ở đâu, B ở đâu => xây cầu đi từ A - B là việc của máy tính

// Bài toán todo list, xoá thằng thứ 3
// Tìm DOM thằng thứ 3
// Remove DOM dom đấy đi

// React
// Mảng gồm 4 ptử
// Mảng gồm 3 ptử