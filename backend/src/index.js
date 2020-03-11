require("./models/User");
require("./models/Track");
const express = require("express");
const mongooseKey = require("../credentials/universal_key.json").key;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(
  `mongodb+srv://eduardo:${mongooseKey}@cluster0-b9grj.mongodb.net/track?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

mongoose.connection.on("connected", () => console.log("connected on mongoose"));

app.get("/", requireAuth, (req, res) => {
  res.send(req.user.email);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
