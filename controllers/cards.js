const card = require("../models/cardModel");
// Возврат всех карточек
module.exports.getCard = (req, res) => {
  return  card.find({})
   .then((card) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// создает карточку
module.exports.postCard = (req, res) => {
  const {name, link } = req.body
  return card.create({name, link, owner: req.user._id})
  .then((card)=> {
  return res.status(200).send(user)
 })
 .catch((err)=> {
   if (err.name === "ValidationError") {
        return res.status(400).send(`message: ${err}`);
      }
      return res.status(500).send(`Ошибка: ${err}`);
 })
};

// удаление карточки
module.exports.deleteCard = (req, res) => {
  return  user.findByIdAndRemove(req.user._id)
  .then((card)=> {
  return res.status(200).send(user)
 })
 .catch((err)=> {
   if (err.name === "ValidationError") {
        return res.status(400).send(`message: ${err}`);
      }
      return res.status(500).send(`Ошибка: ${err}`);
 })
};
// установка лайк
module.exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true }
)
.then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные для постановки лайка.'});
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Передан несуществующий id карточки.'});
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка.'});
      }
    });
}
module.exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true }
)
 .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные для снятии лайка.'});
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Передан несуществующий id карточки.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка.' });
      }
    });
}
