const express = require('express');
const userRoutes = express.Router();
const User = require('../models/user.model'); // user model

userRoutes.get("/status", (req, res) => {
    console.log(
        "\x1b[5m\x1b[30m\x1b[42m\x1b[0m",
        "Server up and running!"
      );   return res.status(200).send({status: "ok"})
})

/* Get all User */
userRoutes.get('/', (req, res, next) => {
    User.find({} , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
        }
        res.status(200).send({
            'success': true,
            'data': result
        });
    });
});

/* Get Single User */
userRoutes.get("/:user_id", (req, res, next) => {
    User.findById(req.params.user_id, function (err, result) {
        if(err){
            res.status(400).send({
                success: false,
                error: err.message
            });
        }
        res.status(200).send({
            success: true,
            data: result
        });
    });
});


/* Add Single User */
userRoutes.post("/", (req, res, next) => {
    const { id, username, password } = req.body;

    if (!id && id !== 0 && !username && !password) {
        return res.json({
          success: false,
          error: "INVALID INPUTS",
        });
      }

    let newUser = {
        username: req.body.username,
        password: req.body.password,
        right_guesses_in_a_row: 3
    };
    User.create(newUser, function(err, result) {
        if(err){
            res.status(400).send({
                success: false,
                error: err.message
            });
        }
        res.status(200).send({
            success: true,
            data: result,
            message: "User created successfully"
        });
    });
});

/* Edit Single User */
userRoutes.patch("/:user_id", (req, res, next) => {
    let fieldsToUpdate = req.body;
    if(req.params.user_id!=null) {
        User.findByIdAndUpdate(req.params.user_id, {$set: fieldsToUpdate.data}, {new: true,useFindAndModify: false}, function (err, result) {
            if (err) {
                res.status(400).send({
                    success: false,
                    error: err.message
                });
            }
            res.status(200).send({
                success: true,
                data: result,
                message: "User updated successfully"
            });
        });
    }
});

/* Delete Single User */
userRoutes.delete("/:user_id", (req, res, next) => {
    User.findByIdAndDelete(req.params.user_id, function(err, result){
        if(err){
            res.status(400).send({
                success: false,
                error: err.message
            });
        }
        res.status(200).send({
            success: true,
            data: result,
            message: "User deleted successfully"
        });
    });
});

userRoutes.post("/getIdForUserName", (req, res) => {
    const { userName } = req.body;

    User.findOne({ username: userName }, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: err });
        }
        const userId = data._id;
        return res.json({ userId:userId });
    });

});




module.exports = userRoutes;