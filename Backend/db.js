const mongoose = require('mongoose');


const mongoURI = "mongodb://127.0.0.1:27017/eNotebookDB"

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