const mongoose = require("mongoose");
const User = require("../models/User.ts");
// url de conexión local y el nombre de la base de datos
mongoose.connect("mongodb://localhost:27017/testDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
// enlaza el track de error a la consola (proceso actual)
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to DB OK");

  // IF its first time
  // const newUser = new User({
  //   name: "admin",
  //   email: "admin@admin.com",
  //   password: "1234567890",
  //   username: "admin",
  // });
  // newUser.save((err, user) => {
  //   if (err) {
  //     console.error("Error al crear el usuario:", err);
  //   } else {
  //     console.log("Usuario creado exitosamente:", user);
  //   }
  // });
});
