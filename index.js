const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student.model.js");

const app = express();


mongoose
  .connect(
    "mongodb+srv://tamer:zebralun95@cluster0.o5vj7.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(4000, () => {
  console.log("Сервер запущен успешно");
});

app.post("/students", (req, res) => {
  Student.create({
    name: "имя студента",
    phone: "номер телефона",
    age: 19,
  }).then(() => {
    res.json("Студент добавлен");
  });
});

app.delete("/students/:id", (req, res) => {
  Student.findByIdAndRemove(req.params.id).then(() => {
    res.json("Студент удален");
  });
});

app.get("/students", (req, res) => {
  Student.find().then((data) => {
    res.json(data);
  });
});

app.patch("/students/:id", (req, res) => {
  Student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  }).then(() => {
    res.json("Студент изменен");
  });
});
