function random(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min) + min)
}

module.exports = random;