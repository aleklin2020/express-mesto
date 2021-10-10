const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require("./routes/users");
const routerCard = require("./routes/cards")
// Слушаем 3000 порт
const { PORT = 3000,  BASE_PATH } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6162f6ca8ff7e85a4c811602'
  };

  next();
});

app.use("/", routerUser);
app.use("/", routerCard);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
let ObjectId = [];




