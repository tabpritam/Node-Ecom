const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = dbConnect;
