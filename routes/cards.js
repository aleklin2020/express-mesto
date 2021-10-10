const router = require("express").Router();
const {
  getCard,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards.js")
router.get('/cards', getCard)// возврашает карточки
router.post('/cards', postCard) // создает карточку
router.delete('/cards/:cardId', deleteCard) // удаляет карточку
router.put('/cards/:cardId/likes', likeCard) // установка like
router.delete('/cards/:cardId/likes', dislikeCard) // удаление like
module.exports = router;