const mongoose = require('mongoose');
require("dotenv").config();


const mongoURI = process.env.REACT_APP_mongoURI

const connectToMongo = async () => {

    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo");
    }
    catch (error) {
        console.log("Error",error);
    }

}



module.exports = connectToMongo;