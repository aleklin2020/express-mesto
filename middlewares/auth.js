const UnauthorizedError = require('../erors/unauthorized-err');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie || !cookie.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = cookie.verify(cookie, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
