let express = require("express");
let app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Messages");
const port = 3000;
app.use(express.static("public"));
app.use(express.text());

const messageSchema = mongoose.Schema({
  message: String,
});

const message = mongoose.model("message", messageSchema);
app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname }, (err) => {
    if (!err) {
      console.log(req);
    } else {
      console.log(err);
    }
  });
});

// app.get("/", (req, res) => {
//   res.send("hello");
//   console.log(req);
// });
app.post("/", (req, res) => {
  let Message = new message({
    message: req.body,
  });
  console.log(req);
  Message.save();
  console.log("POST request received with message:", req.body);
  res.send("data has been stored");
  console.log("data has been saved in database");
});
app.listen(port, () => {
  console.log("app is listening on port 3000");
});
