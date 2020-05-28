const express = require('express');
const vocabRoutes = express.Router();
const Vocab = require('../models/vocabtest.model');
const axios = require("axios");

// fetches all available data
vocabRoutes.get("/", (req, res) => {
    Vocab.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// overwrites existing data
vocabRoutes.post("/update", (req, res) => {
    const { id, update } = req.body;
    Vocab.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// removes existing data
vocabRoutes.delete("/delete", (req, res) => {
    const { id } = req.body;
    Vocab.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// adds new data
vocabRoutes.post("/insert", (req, res) => {
    const { language_id, english_word } = req.body;

    console.log(language_id + " " + english_word + " " + " ");
    if (!language_id && !english_word) {
        return res.json({
            success: false,
            error: "Invalid input",
        });
    }

    Vocab.find((err, list) => {
        if (!err) {
            for (let item of list) {
                console.log(item);
                console.log(item.language_id + item.english_word);
                if (item.language_id === language_id && item.english_word === english_word) {
                    return res.json({ success: true, info: "Word already exists" })
                }
            }


            var myURL = "https://linguee-api.herokuapp.com/api?q=" + english_word.toLowerCase() + "&src=en&dst=" + language_id.toLowerCase();
            console.log("URL: " + myURL);

            axios({
                "method": "GET",
                "url": myURL
            })
                .then((response) => {
                    console.log(response)
                    let data = new Vocab();
                    data.language_id = language_id;
                    data.english_word = english_word;
                    data.translation = response.data.exact_matches[0].translations[0].text;
                    console.log(response.data.exact_matches[0].translations[0].text);
                    data.save((err) => {
                        if (err) return res.json({ success: false, error: err });
                        var ret = { success: true, info: "New word successfully added" }
                        console.log("*** ret: " + ret);
                        console.log("*** ret.success: " + ret.success);
                        console.log("*** ret.info: " + ret.info);
                        return res.json(ret);
                    })
                })
                .catch((error) => {
                    console.log(error)
                })


        }
    });


});

module.exports = vocabRoutes;