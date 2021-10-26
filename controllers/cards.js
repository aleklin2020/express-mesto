const Card = require("../models/cardModel");
const {IncorrectDataError, ForbiddenDataError, NotFoundError} = require('../erors/erors');

// создает карточку
module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  console.log(req.body);
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные при создании карточки'));
      }
      next(err);
    });
};
// Возврат всех карточек
module.exports.getCard = (req, res, next) => {
  return Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};
// удаление карточки
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user._id;
  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (card.owner._id === userId) {
        Card.findByIdAndRemove(cardId)
          .orFail(() => {
            throw new NotFoundError('Карточка с указанным _id не найдена');
          })
          .then((deletedCard) => {
            res.send({ data: deletedCard });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new IncorrectDataError('Передан некорректный id при удалении карточки'));
            }
            next(err);
          });
      } else {
        next(new ForbiddenDataError('У Вас нет прав на удаление карточки с этим id'));
      }
    });
};
// установка лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      next(err);
    });
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
   .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      next(err);
    });
};
