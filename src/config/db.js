const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
 return mongoose.connect(`${process.env.URL}/paypal`);
};

module.exports = dbConnect;
