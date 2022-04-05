
const HTTPError = require('../common/httpError');

async function isAdmin(req, res, next) {
  const senderUser = req.user;

  if (senderUser.role === 'admin') {
    next();
  }

  throw new HTTPError(403, 'Only admin can do operation');
  // next(err);
}

module.exports = isAdmin;