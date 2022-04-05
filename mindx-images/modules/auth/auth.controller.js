const UserModel = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HTTPError = require('../../common/httpError');

const register = async (req, res) => {
  const { username, password } = req.body;
  const existedUser = await UserModel.findOne({ username });
  
  if (existedUser) {
    throw new HTTPError(400, 'Username duplicate');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    username,
    password: hashPassword
  });

  // send => JSON.stringify({})
  // hydrate document => JSON hoá => bỏ các trường linh tinh mongoose đi
  const cloneNewUser = JSON.parse(JSON.stringify(newUser));

  res.send({ 
    success: 1, 
    data: {
      ...cloneNewUser,
      password: '',
    }
  });
}

const login = async (req, res) => {
 
  const { username, password } = req.body;

  const existedUser = await UserModel.findOne({
    username,
  });

  if (!existedUser) {
    throw new HTTPError(400, 'Username hoặc password không đúng');
  }

  const matchedPassword = await bcrypt.compare(password, existedUser.password);

  if (!matchedPassword) {
    throw new HTTPError(400, 'Username hoặc password không đúng');
  }

  const userId = existedUser._id;
  // token
  // header: định danh thuật toán sha256
  // payload: thông tin mã hoá => base64
  // signature: sha256(header + payload)
  // key: private key (server biết)

  const token = jwt.sign({
    userId,
  }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 7
  })

  res.send({ 
    success: 1, 
    data: { _id: userId, token } 
  });
}

module.exports = {
  register,
  login,
}