const mongoose = require('mongoose');

const MONGO_DB_URI = "mongodb+srv://bruh:hello@cluster0.onjbn.mongodb.net/";
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_DB_URI);
    isConnected = true;
    console.log("Mongodb connected !!");
  } catch (e) {
    console.error("Mongodb connection error !!", e);
  }
}

module.exports = {
    connectDB
}