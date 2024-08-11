const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        if (mongoose.connection.readyState) {
            console.log("Already Connected");
        }
        else {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Connected Successfully");
        }
    }
    catch (error) {
        console.log(error.message)
    }
}

module.exports = connectToMongo;