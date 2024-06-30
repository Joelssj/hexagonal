import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI no está definida en el archivo .env');
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB conectado correctamente');
  })
  .catch((error) => {
    console.error('Connection error:', error.message);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

export { mongoose, db };







