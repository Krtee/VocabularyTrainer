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

    const { language_id, english_word} = req.body;

    console.log(language_id+" "+english_word+" "+" ");
    if (!language_id && !english_word ) {
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


            axios({
                "method":"GET",
                "url":"https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate",
                "headers":{
                    "content-type":"application/octet-stream",
                    "x-rapidapi-host":"systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
                    "x-rapidapi-key":"939e5d0eacmsh6a1ed52b1ac5e84p11713djsnbae53c4fa7cf",
                    "useQueryString":true
                },"params":{
                    "source":"en",
                    "target":language_id.toLowerCase(),
                    "input":english_word.toLowerCase()
                }
            })
                .then((response)=>{
                    console.log(response)
                    let data = new Vocab()
                    data.language_id = language_id;
                    data.english_word = english_word;
                    data.translation = response.data.outputs[0].output;
                    console.log(response.data.outputs[0].output)
                    data.save((err) => {
                        if (err) return res.json({success: false, error: err});
                        return res.json({success: true, sys: "nice"});
                    })
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    });


});

module.exports = vocabRoutes;