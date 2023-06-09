
const mongoose = require("mongoose");
const conn = () => {
    mongoose.connect("mongodb://localhost:27017/product", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Connected to Local MongoDB Server : 27017');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });

}

module.exports = conn;
