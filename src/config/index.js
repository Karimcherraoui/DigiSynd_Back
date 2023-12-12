import mongoose from "mongoose";
import "dotenv/config"
 

const db = mongoose
const link = process.env.CONNECTION_LINK

  mongoose.connect(link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default db;
