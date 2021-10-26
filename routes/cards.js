const router = require("express").Router();
const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('../erors/erors');

const {
  getCard,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.use((req, res, next) => {
  next(new NotFoundError('Ошибка - некорректный запрос'));
});

router.post('/cards',
celebrate({
  // валидируем body
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}),
 postCard); // создает карточку




router.get('/cards', getCard);// возврашает карточки


router.delete('/cards/:cardId',
celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}),
 deleteCard); // удаляет карточку





router.put('/cards/:cardId/likes',
 celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}),
 likeCard); // установка like



router.delete('/cards/:cardId/likes',
 celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}),
 dislikeCard); // удаление like
module.exports = router;
