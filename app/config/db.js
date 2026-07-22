const mongoose = require("mongoose");

const url = process.env.DB_URL;

async function connectDB() {
   await mongoose.connect(url);
   console.log("Connected to Database safely!");
 }

module.exports = {
  connectDB,
};