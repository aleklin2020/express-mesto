const Card = require("../models/cardModel");

// создает карточку
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  console.log(req.body);
  Card.create({ name, link, owner })
    .then((card) => {
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: 'Неверно заполнены поля формы' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
// Возврат всех карточек
module.exports.getCard = (req, res) => {
  return Card.find({})
    .then((card) => {
      return res.status(200).send(card);
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};
// удаление карточки
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Передан несуществующий id карточки." });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
// установка лайк
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Передан несуществующий id карточки." });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Передан несуществующий id карточки." });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};
