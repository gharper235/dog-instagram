/* const mongoose = require('mongoose');

const connectionStr = 'mongodb://127.0.0.1:27017/doggie-instagram';

mongoose.connect( connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then( () => console.log('MongoDB connected :)'))
.catch( (err) => console.log('MongoDB error', err))


mongoose.connection.on( 'disconnected', (err) => console.log(err) ); */

// TODO not working
module.exports = {
  User: require('./User')
  // Post: require('./PostModel'),
}