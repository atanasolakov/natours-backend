const dotenv = require('dotenv')
dotenv.config({ path: './config.env'})
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./../../models/tourModel')

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



const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted!')
  } catch (err) {
    console.log(err);
  }
  process.exit()
}

if(process.argv[2] === '--import') {
  importData()
} else if(process.argv[2] === '--delete') {
  deleteData()
}


