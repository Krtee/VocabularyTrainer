const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

require('./src/database');

const userRouter = require('./src/routes/user.routes');

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use('/Users', userRouter);

// will redirect all the non-api routes to react frontend
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../client','build','index.html'));
});


// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.listen(process.env.PORT || 8080,function () {
    console.log("App listens on Port 8080")
});

