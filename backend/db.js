const mongoose = require("mongoose");
const mongoURI =  process.env.REACT_APP_mongoURI
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to mongoose successfully");
  });
};
module.exports = connectToMongo;
