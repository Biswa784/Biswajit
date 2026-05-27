const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log(`
⚠️  MongoDB is not running or unreachable!
📌 To fix this:
   Option 1: Start MongoDB locally
   Option 2: Use MongoDB Atlas cloud service
   Option 3: Run: mongod (if MongoDB is installed)

🔧 Server will run anyway, but database operations will fail.
    `);
  }
};

module.exports = connectDB;
