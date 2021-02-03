/* EXTERNAL MODULES */
const express = require ('express');
const mongoose = require('mongoose');
const app = express();

/* PORT */
const PORT = 3300;

// Database
const connectionStr = 'mongodb://127.0.0.1:27017/dogigram';

mongoose.connect( connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then( () => console.log('MongoDB connected :)'))
.catch( (err) => console.log('MongoDB error', err))

mongoose.connection.on( 'disconnected', (err) => console.log(err) );

/* INTERNAL MODULES */
// const routes = require('./routes')

/* APP CONFIG */
app.set( 'view engine', 'ejs' );

app.get('/', (req, res) => {
    res.send('Future of doggie-instagram!')
  })

/* Middleware */

// allows us to use json forms for data input
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Controllers
const UserCtrl = require('./controllers/userCtrl');

/* ROUTES */
app.post('/user/create', (UserCtrl.createUser));
app.post('/user/update', (UserCtrl.updateUser));
// app.use('/', indexRouter);

// Start Listening devise
app.listen( PORT, () => console.log( `listing at port ${PORT} \nhttp://localhost:${PORT}`) );
