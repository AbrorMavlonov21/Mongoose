function setRole(...roles) {
  return function (req, res, next) {
    req.roles = roles;
    next();
  };
}

module.exports = { setRole };
