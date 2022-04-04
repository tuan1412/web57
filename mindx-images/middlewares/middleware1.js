function middleware1(req, res, next) {
  console.log('middleware1', req.method);
  next();
}

module.exports = middleware1;