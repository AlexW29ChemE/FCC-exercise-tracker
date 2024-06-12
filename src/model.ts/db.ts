import mongoose from 'mongoose'
import user from './user';
import exercise from './exercise';

const mongoURL = process.env.MONGO_URI||'mongodb://127.0.0.1:27017/freecodecamp'; 

class Database {
  User:typeof user;
  Excercise:typeof exercise;
  constructor() {
    this._connect();
    this.User = user
    this.Excercise = exercise
  }
  
  _connect() {
    mongoose
      .connect(mongoURL)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error');
      });
  }
}
export default new Database();