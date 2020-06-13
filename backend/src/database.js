const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const dbRoute =
    //Original Database:
    "mongodb+srv://london:kAXrWRHvbEsVQBIecl34HVLsyVsuk1@hdm-mwa-urx4p.mongodb.net/london?retryWrites=true&w=majority";

    //New database:
    // "mongodb+srv://london:kAXrWRHvbEsVQBIecl34HVLsyVsuk1@hdm-mwa-urx4p.mongodb.net/london_test_db?retryWrites=true&w=majority";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
