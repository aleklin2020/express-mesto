const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const routerUser = require("./routes/users");
const routerCard = require("./routes/cards");
const auth = require('./middlewares/auth');
const centralizedErrors = require('./middlewares/centralizedErrors');
const { method } = require('./method/method');
const {
  login,
  postUsers,
} = require('./controllers/users');
// Слушаем 3000
const PORT = 3000;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Массив разешённых доменов
const allowedCors = [
  'localhost:3000',
];

// безопасность
app.use((req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) {
    // Проверяем, что значение origin есть среди разрешённых доменов
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
});

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')),
    }),
  }),
  login);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(method),
      email: Joi.string().required().email(),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')),
    }),
  }),
  postUsers);
/*
app.use((req, res) => {
  return res.status(404).send({ message: 'Страница не найдена' });
}); */

app.use(auth);

app.use("/", routerUser);
app.use("/", routerCard);
app.use(errors());
app.use(centralizedErrors); // централизованная обработка ошибок
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
