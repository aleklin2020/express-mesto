const UnauthorizedError = require('../erors/unauthorized-err');

module.exports = (req, res, next) => {
  const { jwt } = req.headers;

  if (!jwt || !jwt.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(jwt, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
