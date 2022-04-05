// Định danh được người dùng
// ko phải user => trả luôn kết quả
// user => next()
const jwt = require('jsonwebtoken');
const UserModel = require('../modules/auth/user');
const HTTPError = require('../common/httpError');

async function needAuthenticated(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    throw new HTTPError(401, 'Not found token');
  }

  const jwtToken = token.split(' ')[1];

  const data = jwt.verify(jwtToken, process.env.SECRET_KEY);

  const { userId } = data;
  if (!userId) {
    throw new HTTPError(401, 'Authorization fail');
  }

  const existedUser = await UserModel.findById(userId);

  if (!existedUser) {
    throw new HTTPError(401, 'Authorization fail');
  }

  // nhét thêm thôn tin vào biến request
  // req là object có sẵn một list key
  req.user = existedUser;

  next();
}

module.exports = needAuthenticated;