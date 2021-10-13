const express = require('express');
const mongoose = require('mongoose');
const routerUser = require("./routes/users");
const routerCard = require("./routes/cards");
// Слушаем 3000
const PORT = 3000;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '6162f6ca8ff7e85a4c811602',
  };

  next();
});

app.use("/", routerUser);
app.use("/", routerCard);
app.use((req, res) => {
  return res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
