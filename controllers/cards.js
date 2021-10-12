const card = require("../models/cardModel");

// создает карточку
module.exports.postCard = (req, res) => {
  const {name, link } = req.body;
  const owner = req.user._id;
  console.log(req.body);
   card.create({name, link, owner})
    .then((card)=> {
  return res.status(200).send(card)
 })
 .catch((err)=> {
   if (err.name === "ValidationError") {
        return res.status(400).send(`message: ${err}`);
      }
      return res.status(500).send(`Ошибка: ${err}`)
 })
};
// Возврат всех карточек
module.exports.getCard = (req, res) => {
  return  card.find({})
   .then((card) => {
      return res.status(200).send(card);
    })
    .catch((err) => {
     return res.status(500).send({ message: err });
    });
};
// удаление карточки
module.exports.deleteCard = (req, res) => {
  return  user.findByIdAndRemove(req.user._id)
  .then((card)=> {
  return res.status(200).send(card)
 })
 .catch((err)=> {
   if (err.name === "ValidationError") {
        return res.status(400).send(`message: ${err}`);
      } else if (err.name === 'CastError') {
       return res.status(404).send({ message: 'Передан несуществующий id карточки.'});
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
        return res.status(400).send({message: 'Переданы некорректные данные для постановки лайка.'});
      } else if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Передан несуществующий id карточки.'});
      } else {
        return res.status(500).send({ message: 'На сервере произошла ошибка.'});
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
        return res.status(400).send({message: 'Переданы некорректные данные для снятии лайка.'});
      } else if (err.name === 'CastError') {
       return  res.status(404).send({ message: 'Передан несуществующий id карточки.' });
      } else {
       return  res.status(500).send({ message: 'На сервере произошла ошибка.' });
      }
    });
}
