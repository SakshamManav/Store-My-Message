let express = require("express");
let app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 4000;

//Mongo DB

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Worked perfectly");
  })
  .catch((error) => {
    console.log("there is an error");
    console.log(error);
  });
const messageSchema = mongoose.Schema({
  message: String,
});
const message = mongoose.model("message", messageSchema);

app.use(express.static("public"));
app.use(express.text());

app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.post("/", (req, res) => {
  let Message = new message({
    message: req.body,
  });
  Message.save()
    .then(() => {
      console.log("Data has been saved");
      res.send("Data has been saved");
    })
    .catch((error) => {
      console.log("there is an error in saving the data in database");
      res.send("there is an error in saving the data");
      console.log(error);
    });
});
app.listen(port, () => {
  console.log("app is listening on port 3000");
});
