const mongoose = require('mongoose')
const mongodb = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb+srv://ajmalazeez:SJ3tKfwv4SDNO3Cu@cluster0.3pm6rid.mongodb.net/Bandid?retryWrites=true&w=majority', {
      retryWrites: true,
      w: 'majority'
    })
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
        console.log(error);
      console.log('Cannot connect to the database');
    });
  };
  
  module.exports = mongodb;


