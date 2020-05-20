const express = require('express');
const vocabRoutes = express.Router();
const Vocab = require('../models/vocabtest.model');
const apiHelper = require('../api/API_helper');
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

    const { language_id, english_word, translation } = req.body;

    console.log(language_id+" "+english_word+" "+translation+" ");
    if (!language_id && !english_word && !translation) {
        return res.json({
            success: false,
            error: "INVALID INPUTS",
        });
    }

    Vocab.find((err, list) => {
        if (!err) {
            for (let item of list) {
                console.log(item);
                console.log(item.language_id + item.english_word);
                if (item.language_id === language_id && item.english_word === english_word) {
                    return res.json({success: true, info: "word already exist"})
                }
            }

            const {
                DICC_API_ID,
                DICC_APP_KEY
            } = process.env

            let config = {
                headers: {
                    app_id: DICC_API_ID,
                    app_key:DICC_APP_KEY
                }
            }

            axios.get( "https://od-api.oxforddictionaries.com/api/v2/entries/"+ language_id+"/"+english_word.lowercase(), config)
                .then(response =>{
                    console.log(response);
                })



            let data = new Vocab()
            data.language_id = language_id;
            data.english_word = english_word;
            data.translation = translation;
            data.save((err) => {
                if (err) return res.json({success: false, error: err});
                return res.json({success: true, sys: "nice"});
            });

        }
    });


});

module.exports = vocabRoutes;