const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Users = require("./src/models/user.model");
const Languages = require("./src/models/languages.model");
const Progress = require("./src/models/progress.model");
const Vocab = require("./src/models/vocab.model");

const API_PORT = 8080;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
    "mongodb+srv://london:kAXrWRHvbEsVQBIecl34HVLsyVsuk1@hdm-mwa-urx4p.mongodb.net/london?retryWrites=true&w=majority";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//---------------------------------------------------------//
//------------------- User DB Connection ------------------//
//---------------------------------------------------------//
// fetches all available data
router.get("/getUsers", (req, res) => {
    Users.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// overwrites existing data
router.post("/updateUsers", (req, res) => {
    const { id, update } = req.body;
    Users.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// removes existing data
router.delete("/deleteUsers", (req, res) => {
    const { id } = req.body;
    Users.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// adds new data
//TODO: Don't allow existing usernames
router.post("/putUsers", (req, res) => {
    let data = new Users();

    const { id, username, password } = req.body;

    //TODO: Custom error Messages
    if (!id && id !== 0 && !username && !password) {
        return res.json({
            success: false,
            error: "INVALID INPUTS",
        });
    }
    data.username = username;
    data.password = password;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

//---------------------------------------------------------//
//---------------- Languages DB Connection ----------------//
//---------------------------------------------------------//
// fetches all available data
router.get("/getLanguages", (req, res) => {
    Languages.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// overwrites existing data
router.post("/updateLanguages", (req, res) => {
    const { id, update } = req.body;
    Languages.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// removes existing data
router.delete("/deleteLanguages", (req, res) => {
    const { id } = req.body;
    Languages.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// adds new data
router.post("/putLanguages", (req, res) => {
    let data = new Languages();

    const { id, language } = req.body;

    if ((!id && id !== 0) || !language) {
        return res.json({
            success: false,
            error: "INVALID INPUTS",
        });
    }
    data.language = language;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

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

//---------------------------------------------------------//
//------------------- User DB Connection ------------------//
//---------------------------------------------------------//
// fetches all available data
router.get("/getVocab", (req, res) => {
    Vocab.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// overwrites existing data
router.post("/updateVocab", (req, res) => {
    const { id, update } = req.body;
    Vocab.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// removes existing data
router.delete("/deleteVocab", (req, res) => {
    const { id } = req.body;
    Vocab.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// adds new data
router.post("/putVocab", (req, res) => {
    let data = new Vocab();

    const { id, language_id, english_word, translation } = req.body;

    if ((!id && id !== 0) || (!language_id && !english_word && !translation)) {
        return res.json({
            success: false,
            error: "INVALID INPUTS",
        });
    }
    data.id = id;
    data.language_id = language_id;
    data.english_word = english_word;
    data.translation = translation;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// append /api for our http requests
app.use("/api", router);

// create a GET route
app.get("/express_backend", (req, res) => {
  // res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// // will redirect all the non-api routes to react frontend
// app.use(function (req, res) {
//   res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
// });

// launch our backend into a port
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
