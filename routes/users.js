const router = require("express").Router();
const {
  postUsers,
  getUser,
  getUsersId,
  patchUser,
  patchUserAvatar,
} = require("../controllers/users.js")
router.post('/users', postUsers)// Создание нового пользователя
router.get('/users', getUser) // Возврат всех пользователей
router.get('/users/:userId', getUsersId) // возврат пользователя по id
router.patch('/users/me', patchUser) // обеовление профиля
router.patch('/users/me/avatar', patchUserAvatar) // обновление аватар
module.exports = router;