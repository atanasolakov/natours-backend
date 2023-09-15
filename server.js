const dotenv = require('dotenv')
dotenv.config({ path: './config.env'})
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const { MONGODB_URL } = process.env;

async function connect() {
  console.log(MONGODB_URL);
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connect()


app.listen(port, () => {
  console.log(`Apps is running on port ${port}`);
});
