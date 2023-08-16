const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://troops:troops123@cluster0.h6cojwe.mongodb.net/Troops?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Db connected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb };
