const app = require("./app")

//const MongoClient = require('mongodb').MongoClient;
const API_PORT = 8080;


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
