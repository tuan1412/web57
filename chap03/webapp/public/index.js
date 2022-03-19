// const random = require('../random')
document
  .getElementById('randomBtn')
  .addEventListener('click', async () => {
    const jsonRes = await fetch('http://localhost:8080/random');
    const res = await jsonRes.json();

    document.getElementById('number').innerHTML = res
})