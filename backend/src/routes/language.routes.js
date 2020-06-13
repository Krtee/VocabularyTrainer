const express = require("express");
const router = express.Router();
const Languages = require("../models/languages.model");

/* Get all Languages */
router.get("/", (req, res, next) => {
  Languages.find({}, function (err, result) {
    if (err) {
      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
    res.status(200).send({
      success: true,
      data: result,
    });
  });
});

// removes existing data
router.delete("/:lang_id", (req, res) => {
  const { id } = req.body;
  Languages.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
    res.status(200).send({
      success: true,
      data: result,
    });
  });
});

/* Add Single User */
router.post("/", (req, res, next) => {
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
    if (err) {
      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
    res.send({
      success: true,
      message: "User created successfully",
    });
  });
});

module.exports = router;
