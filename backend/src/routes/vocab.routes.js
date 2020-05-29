const express = require('express');
const vocabRoutes = express.Router();
const Vocab = require('../models/vocabtest.model');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');




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
            error: "INVALID INPUTS",
        });
    }

    Vocab.find((err, list) => {
        if (!err) {
            for (let item of list) {
                // console.log(item);
                // console.log(item.language_id + item.english_word);
                if (item.language_id === language_id && item.english_word === english_word) {
                    return res.json({ success: true, info: "word already exist" })
                }
            }
            
            const languageTranslator = new LanguageTranslatorV3({
              version: '2018-05-01',
              authenticator: new IamAuthenticator({
                apikey: 'dSg6yvKxrxo9Sy2SCHbV_r9LthK7ybcXnkkjGC4cyOcd',
              }),
              url: 'https://api.eu-de.language-translator.watson.cloud.ibm.com/instances/93ebb1a7-fe31-4268-b0b6-3bde1a15069c',
            });
            
            const translateParams = {
              text: english_word.toLowerCase(),
              modelId: `en-${language_id.toLowerCase()}`,
            };
            
            languageTranslator
              .translate(translateParams)
              .then((translationResult) => {
                const ibmResponse = JSON.stringify(translationResult, null, 2);

                try {
                    const ibmRes = JSON.parse(ibmResponse)
                    console.log(ibmRes);

                    
                    if (ibmRes.status === 200) {
                        const translation = ibmRes.result.translations[0].translation
                        const data = new Vocab();
                        data.language_id = language_id;
                        data.english_word = english_word;
                        data.translation = translation
                        console.log(`${english_word} > ${translation}`);
                        
                        data.save((err) => {
                          if (err) return res.json({ success: false, error: err });
                          return res.json({ success: true, sys: "nice" });
                        });
    
                    }
                } catch (error) {
                    console.error(error)
                }
              })
              .catch((err) => {
                console.log("error:", err);
              });

            // var myURL = "https://linguee-api.herokuapp.com/api?q=" + english_word.toLowerCase() + "&src=en&dst=" + language_id.toLowerCase();
            // console.log("URL: " + myURL);

            // axios({
            //     "method": "GET",
            //     "url": myURL              
            // })
            //     .then((response) => {
            //         console.log(response)
            //         let data = new Vocab();
            //         data.language_id = language_id;
            //         data.english_word = english_word;
            //         data.translation = response.data.exact_matches[0].translations[0].text;
            //         console.log(response.data.exact_matches[0].translations[0].text);
            //         data.save((err) => {
            //             if (err) return res.json({ success: false, error: err });
            //             return res.json({ success: true, sys: "nice" });
            //         })
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //     })


        }
    });


});

module.exports = vocabRoutes;