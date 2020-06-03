const express = require('express');
const vocabRoutes = express.Router();
const Vocab = require('../models/vocab.model');
const Progress = require('../models/progress.model');
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

// fetches progress for given vocab
vocabRoutes.get("/getProgress", (req, res) => {
    Progress.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

vocabRoutes.get("/getProgressById", (req, res) => {
  const { id } = req.query;
  Progress.findOne({vocab_id: id}, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: data });
  });
});

vocabRoutes.post("/getVocabAndTranslation", (req, res) => {
    const { vocab_id, lang_id } = req.body;
    var vocab = "";
    var translation = "";

    Vocab.find((err, list) => {
        if (!err) {
            for (let item of list) {
                if (item._id == vocab_id) {
                    vocab = item.english_word;
                    translation = getTranslationForLanguage(item, lang_id);
                }
            }
        }
        return res.json({ vocab: vocab, translation: translation });

    });
});

// adds new data
vocabRoutes.post("/insert", (req, res) => {
    const { language_id, english_word, user_id } = req.body;
    var existingVocab = null;
    var existsInSelectedLanguage = false;
    var vocab_id = null;

    // Check if input form is empty
    if (!language_id || !english_word) {
        return res.json({
            success: false,
            error: "Invalid input",
        });
    }

    // Check if requested vocab does exist in Vocab collection
    Vocab.find((err, list) => {
        if (!err) {
            for (let item of list) {
                if (item.english_word === english_word) {
                    existingVocab = item;
                    // Does requested vocab also exist in the required language?
                    if (getTranslationForLanguage(item, language_id) != null) {
                        existsInSelectedLanguage = true;
                    }
                }
            }

            // If requested vocab doesn't exist at all or if it doesn't exist in requested language
            if (existingVocab == null || !existsInSelectedLanguage) {

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
                                const translation = ibmRes.result.translations[0].translation;
                                console.log(`${english_word} > ${translation}`);
                                // Check if API found a translation
                                if (english_word === translation.toLowerCase) {
                                    // When the API doesn't know a translation for an English input word, 
                                    // it always returns the input word.
                                    return res.json({ success: false, error: "Unknown word. Please check the spelling." });
                                }
                                // Check whether requested vocab is only missing in requested language or if it's missing completely
                                if (existingVocab != null && !existsInSelectedLanguage) {
                                    var setTranslationWorked = setTranslationForLanguage(existingVocab, language_id, translation);
                                    if (!setTranslationWorked) {
                                        return res.json({ success: false, error: "An error occured. Please try again later." });
                                    }
                                    vocab_id = existingVocab._id;
                                } else {
                                    const vocab = new Vocab();
                                    vocab.english_word = english_word;
                                    vocab_id = vocab._id;
                                    var setTranslationWorked = setTranslationForLanguage(vocab, language_id, translation);
                                    if (!setTranslationWorked) {
                                        return res.json({ success: false, error: "An error occured. Please try again later." });
                                    }
                                }

                                var createProgressWorked = createProgress(user_id, vocab_id, language_id);
                                if (!createProgressWorked) {
                                    return res.json({ success: false, error: "An error occured. Please try again later." });
                                } else {
                                    return res.json({ success: true, info: "New word was successfully added." });
                                }
                            }
                        } catch (error) {
                            console.error(error)
                        }
                    })
                    .catch((err) => {
                        console.log("error:", err);
                    });


            } else { // If requested vocab already exists in Vocab collection

                Progress.find((err, list) => {
                    var existsInPersonalCollection = false;
                    if (!err) {
                        for (let item of list) {
                            // If requested vocab already exists in personal collection
                            if (item.vocab_id == existingVocab._id && item.user_id == user_id) {
                                existsInPersonalCollection = true;
                                return res.json({ success: true, info: "Word already exists" });
                            }
                        }
                        if (!existsInPersonalCollection) {
                            // If requested vocab doesn't exist in personal collection yet

                            var createProgressWorked = createProgress(user_id, existingVocab._id, language_id);
                            if (!createProgressWorked) {
                                return res.json({ success: false, error: "An error occured. Please try again later." });
                            } else {
                                return res.json({ success: true, info: "New word was successfully added." });
                            }
                        }
                    }
                });
            }

        }
    });


});

function setTranslationForLanguage(vocab, language_id, translation) {
    switch (language_id) {
        case "ar": vocab.translation.ar = translation; break;
        case "cs": vocab.translation.cs = translation; break;
        case "da": vocab.translation.da = translation; break;
        case "de": vocab.translation.de = translation; break;
        case "el": vocab.translation.el = translation; break;
        case "es": vocab.translation.es = translation; break;
        case "fi": vocab.translation.fi = translation; break;
        case "fr": vocab.translation.fr = translation; break;
        case "he": vocab.translation.he = translation; break;
        case "hi": vocab.translation.hi = translation; break;
        case "it": vocab.translation.it = translation; break;
        case "ja": vocab.translation.ja = translation; break;
        case "ko": vocab.translation.ko = translation; break;
        case "nb": vocab.translation.nb = translation; break;
        case "nl": vocab.translation.nl = translation; break;
        case "pl": vocab.translation.pl = translation; break;
        case "pt": vocab.translation.pt = translation; break;
        case "ru": vocab.translation.ru = translation; break;
        case "sv": vocab.translation.sv = translation; break;
        case "tr": vocab.translation.tr = translation; break;
        case "zh": vocab.translation.zh = translation; break;
    }
    // TODO: Error nicht hier abfangen! True/false zurückliefern und dann in /insert entsprechend reagieren
    vocab.save((err) => {
        if (err) return false;
    });
    return true;
}

function getTranslationForLanguage(vocab, language_id) {
    switch (language_id) {
        case "ar": return vocab.translation.ar;
        case "cs": return vocab.translation.cs;
        case "da": return vocab.translation.da;
        case "de": return vocab.translation.de;
        case "el": return vocab.translation.el;
        case "es": return vocab.translation.es;
        case "fi": return vocab.translation.fi;
        case "fr": return vocab.translation.fr;
        case "he": return vocab.translation.he;
        case "hi": return vocab.translation.hi;
        case "it": return vocab.translation.it;
        case "ja": return vocab.translation.ja;
        case "ko": return vocab.translation.ko;
        case "nb": return vocab.translation.nb;
        case "nl": return vocab.translation.nl;
        case "pl": return vocab.translation.pl;
        case "pt": return vocab.translation.pt;
        case "ru": return vocab.translation.ru;
        case "sv": return vocab.translation.sv;
        case "tr": return vocab.translation.tr;
        case "zh": return vocab.translation.zh;
        default: return null;
    }
}

function createProgress(user_id, vocab_id, language_id) {
    const prog = new Progress();
    prog.user_id = user_id;
    prog.vocab_id = vocab_id;
    prog.language_id = language_id;
    prog.progress = 3;
    prog.right_guesses_in_a_row = 0;

    // TODO: Error nicht hier abfangen! True/false zurückliefern und dann in /insert entsprechend reagieren
    prog.save((err) => {
        if (err) return false;
    });
    return true;
}

module.exports = vocabRoutes;