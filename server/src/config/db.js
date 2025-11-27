const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let cached = global._mongo; // Node global cache across lambdas
if (!cached) {
  cached = global._mongo = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongooseInstance) => {
      console.log("MongoDB Connected");
      return mongooseInstance;
    }).catch((error) => {
      console.log("MongoDB Error:", error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = dbConnect;


