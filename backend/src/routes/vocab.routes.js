const express = require("express");
const vocabRoutes = express.Router();
const Vocab = require("../models/vocab.model");
const Progress = require("../models/progress.model");
const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

vocabRoutes.post("/getByIdArray", (req, res) => {
  const en_words = JSON.parse(JSON.stringify(req.body));
  const query = { english_word: { $in: en_words } };

  Vocab.find(query, function (err, result) {
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

vocabRoutes.post("/createProgress", (req, res) => {
  const { user_id, english_word, language_id } = req.body;

  Progress.find(
    { english_word: english_word, user_id: user_id, language_id: language_id },
    async (err, entry) => {
      if (err) {
        return res.json({ success: false, error: err });
      } else {
        if (entry[0] !== undefined) {
          return res.json({ didAlreadyExist: true, success: true, data: entry });
        } else {
          const prog = new Progress({
            english_word: english_word,
            user_id: user_id,
            language_id: language_id,
            progress: 1,
            right_guesses_in_a_row: 0,
          });

          prog.save((err) => {
            if (err) return res.json({ didAlreadyExist: false, success: false, error: err });
          });
          return res.json({ didAlreadyExist: false, success: true, data: prog });
        }
      }
    }
  );
});

vocabRoutes.post("/searchProgress", (req, res) => {
  Progress.findOne(req.body, (err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: data });
  });
});

vocabRoutes.post("/getProgressForUserAndLanguage", (req, res) => {
  const { user_id, lang_id } = req.body;

  Progress.find({ user_id: user_id, language_id: lang_id }, (err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: data });
  });
});

vocabRoutes.get("/filterProgress", (req, res) => {
  Progress.find(req.query, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: data });
  });
});

vocabRoutes.delete("/:user_id", (req, res, next) => {
  Progress.findByIdAndDelete(req.params.user_id, function (err, result) {
    if (err) {
      res.status(400).send({
        success: false,
        error: err.message,
      });
    } else {
      res.status(200).send({
        success: true,
        data: result,
        message: "Progress deleted successfully",
      });
    }
  });
});

/**
 * Increase right_guesses_in_a_row by one
 */
vocabRoutes.post("/increaseRGIAR", (req, res) => {
  const { user_id, lang_id, english_word } = req.body;
  Progress.findOneAndUpdate(
    { user_id: user_id, language_id: lang_id, english_word: english_word },
    { $inc: { right_guesses_in_a_row: 1 } },
    (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, error: err });
      }
      console.info("%c Updated: ", "background: #0f0", data);
      return res.json({ success: true, data: data });
    }
  );
});

vocabRoutes.post("/resetRGIAR", (req, res) => {
  const { user_id, lang_id, english_word } = req.body;
  Progress.findOneAndUpdate(
    { user_id: user_id, language_id: lang_id, english_word: english_word },
    { right_guesses_in_a_row: 0 },
    (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, error: err });
      }
      console.info("%c reset: > ", "background: #0f0", data);
      return res.json({ success: true, data: data });
    }
  );
});

/**
 * Increase progress by one
 */
vocabRoutes.post("/increaseProgress", (req, res) => {
  const { user_id, lang_id, english_word } = req.body;
  Progress.findOneAndUpdate(
    { user_id: user_id, language_id: lang_id, english_word: english_word },
    { $inc: { progress: 1 } },
    (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, error: err });
      }
      console.info("%c Updated: ", "background: #0f0", data);
      return res.json({ success: true, data: data });
    }
  );
});

vocabRoutes.post("/getVocabAndTranslation", (req, res) => {
  const { english_word, lang_id } = req.body;

  Vocab.findOne({ english_word: english_word }, (err, data) => {
    if (err || !data) {
      // console.error(err);
      return res.json({ success: false, error: err });
    }
    try {
      return res.json({ vocab: data.english_word, translation: data.translation[lang_id] });
    } catch (error) {
      console.error(error);
    }
  });
});

// adds new data
vocabRoutes.post("/insert", (req, res) => {
  try {
    const { language_id, english_word } = req.body;

    // Check if input form is empty
    if (!language_id || !english_word) {
      return res.json({
        success: false,
        error: "Invalid input",
      });
    }

    const en_word = english_word.toLowerCase();
    const lang_id = language_id.toLowerCase();

    // Check if requested vocab does exist in Vocab collection
    Vocab.find({ english_word: en_word }, async (err, existingVocab) => {
      if (!!err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "An error occurred." });
      }

      // Is the word in vocab collection?
      const isInCollection = existingVocab && existingVocab.length !== 0;

      if (!isInCollection) {
        console.log(
          "\x1b[43m\x1b[30m%s\x1b[0m\x1b[40m\x1b[33m%s\x1b[0m",
          "Is not in collection:",
          " ",
          en_word
        );

        // Create Word in vocab collection
        let translation;

        try {
          translation = await getTranslation(lang_id, english_word);
        } catch (error) {
          const response = getResponseForFailedTranslation(error);
          return res
            .status(response.status)
            .json({ success: response.success, error: response.errorText });
        }

        if (translation.status !== 200) {
          return res.status(translation.status).json(translation);
        }

        // Word does not exist --> create new db entry with first translation
        const vocab = new Vocab({
          english_word: en_word,
          translation: { [lang_id]: translation.translation },
        });
        vocab.save((err) => {
          if (err) {
            console.error(err);
          }
        });
      } // if is NOT in collection
      else {
        // IS in collection
        console.log(
          "\x1b[42m\x1b[30m%s\x1b[0m\x1b[40m\x1b[32m%s\x1b[0m",
          "Is already in collection:",
          " ",
          en_word
        );

        // check if already in this language available
        const isAlreadyTranslated = getTranslationForLanguage(existingVocab[0], lang_id);
        if (isAlreadyTranslated) {
          return res
            .status(200)
            .json({ success: true, message: `This word is already in your collection.` });
        }

        let translation;

        try {
          translation = await getTranslation(lang_id, english_word);
        } catch (error) {
          const response = getResponseForFailedTranslation(error);
          return res
            .status(response.status)
            .json({ success: response.success, error: response.errorText });
        }

        if (translation.status !== 200) {
          return res.status(translation.status).json(translation);
        }

        setTranslationForLanguage(existingVocab[0], lang_id, translation.translation);
      } // IS in collection

      // if all good
      return res.status(200).json({ success: true });
    });
  } catch (error) {
    console.error(error);
  }
});

function setTranslationForLanguage(vocab, language_id, translation) {
  vocab.translation[language_id] = translation;

  // TODO: Error nicht hier abfangen! True/false zurückliefern und dann in /insert entsprechend reagieren
  vocab.save((err) => {
    if (err) return false;
  });
  return true;
}

function getTranslationForLanguage(vocab, language_id) {
  try {
    return vocab.translation[language_id] ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getTranslation(lang_id, en_word) {
  const languageTranslator = new LanguageTranslatorV3({
    version: "2018-05-01",
    authenticator: new IamAuthenticator({
      apikey: "dSg6yvKxrxo9Sy2SCHbV_r9LthK7ybcXnkkjGC4cyOcd",
    }),
    url:
      "https://api.eu-de.language-translator.watson.cloud.ibm.com/instances/93ebb1a7-fe31-4268-b0b6-3bde1a15069c",
  });

  const translateParams = {
    text: en_word,
    modelId: `en-${lang_id}`,
  };

  let ibmRes;

  // Translate via IBM
  try {
    ibmRes = await languageTranslator.translate(translateParams).then((translationResult) => {
      return JSON.stringify(translationResult, null, 2);
    });
  } catch (error) {
    // If requested language is unknown
    throw "unknown_language";
  }

  ibmRes = JSON.parse(ibmRes);

  if (ibmRes.status !== 200) {
    // Any IBM Problem
    throw "ibm_problems";
  }

  let translation = ibmRes.result.translations[0].translation;

  // IBM returns "... <translation>" or "<translation> ..." some times for whatever reason. Removing the dots here.
  if (translation.indexOf("...") !== -1) {
    translation = translation.replace("...", "").trim();
    console.log("\x1b[41m\x1b[30m%s\x1b[0m", "REPLACING '...'", " ", en_word, "> ", translation);
  }

  const shouldFail =
    !translation ||
    en_word === translation.toLowerCase() ||
    translation === "'" ||
    translation === "-" ||
    translation === "- ..." ||
    translation === '".';

  // Check if API found a translation
  if (shouldFail) {
    console.log(
      "\x1b[41m\x1b[30m%s\x1b[0m",
      "IBM SEEMS NOT TO KNOW THIS WORD IN THIS LANGUAGE:",
      " ",
      en_word
    );

    // When the API doesn't know a translation for an English input word,
    // it always returns the input word.
    return { status: 400, success: false };
  }
  return { status: 200, translation: translation };
}

function getResponseForFailedTranslation(error) {
  let status;
  let success;
  let errorText;

  if (error === "unknown_language") {
    status = 400;
    success = false;
    errorText = "IBM does not know this language.";
  } else if (error === "ibm problems") {
    status = 500;
    success = false;
    errorText = "Problems with IBM Cloud occurred";
  } else {
    status = 404;
    success = false;
    errorText = "Unknown IBM related error occured";
  }

  return { status, success, errorText };
}

module.exports = vocabRoutes;
