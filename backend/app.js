const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const router = express.Router();
const Progress = require("./src/models/progress.model");

const userRouter = require("./src/routes/user.routes");
const vocabRouter = require("./src/routes/vocab.routes");
const langRouter = require("./src/routes/language.routes");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(logger("dev"));

require("./src/database");

app.use("/Users", userRouter);
app.use("/Vocab", vocabRouter);
app.use("/Languages", langRouter);

//---------------------------------------------------------//
//----------------- Progress DB Connection ----------------//
//---------------------------------------------------------//
// fetches all available data
router.get("/getProgress", (req, res) => {
  Progress.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// overwrites existing data
router.post("/updateProgress", (req, res) => {
  const { id, update } = req.body;
  Progress.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// removes existing data
router.delete("/deleteProgress", (req, res) => {
  const { id } = req.body;
  Progress.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// adds new data
//TODO: Check if IDs exists.
router.post("/putProgress", (req, res) => {
  let data = new Progress();

  const { user_id, vocab_id, progress, right_guesses_in_a_row } = req.body;

  if (!user_id && !vocab_id && !progress && !right_guesses_in_a_row) {
    return res.json({
      success: false,
      error: "INVALID INPUTS",
    });
  }
  data.user_id = user_id;
  data.vocab_id = vocab_id;
  data.progress = progress;
  data.right_guesses_in_a_row = right_guesses_in_a_row;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

module.exports = app;
