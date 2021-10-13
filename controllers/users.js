const User = require("../models/userModel");
// Создание нового пользователя
module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send(`message: ${err}`);
      }
      return res.status(500).send(`Ошибка: ${err}`);
    });
};
// Возврашение всех пользователей
module.exports.getUser = (reg, res) => {
  return User.find({})
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};
// Возврашение пользователя по id
module.exports.getUsersId = (reg, res) => {
  return User.findById(reg.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: " Пользователь по указанному id не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Запрос к серверу содержит синтаксическую ошибку" });
      }
      return res.status(500).send({ message: "Ошибка." });
    });
};
// обновляет профиль
module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь с указанным id не найден." });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Переданы некорректные данные при обновлении профиля." });
      }
      return res.status(500).send({ message: "Ошибка." });
    });
};
// обновляет аватар
module.exports.patchUserAvatar = (req, res) => {
  const avatar = req.body;
  return User.findByIdAndUpdate(req.user._id, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь с указанным id не найден." });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Переданы некорректные данные при обновлении аватара." });
      }
      return res.status(500).send({ message: "Ошибка." });
    });
};
