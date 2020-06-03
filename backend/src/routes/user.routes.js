const express = require('express');
const userRoutes = express.Router();
const User = require('../models/user.model'); // user model

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
            console.log("didn't work");

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
    User.findByIdAndUpdate(req.params.user_id,{ $set: fieldsToUpdate }, { new: true },  function (err, result) {
        if(err){
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




module.exports = userRoutes;