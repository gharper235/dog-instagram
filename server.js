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
const routes = require('./routes')

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
// I 
// const UserCtrl = require('./controllers/userCtrl');
// const PostCtrl = require('./controllers/postCtrl');

/* ROUTES */
// User Routes need to split out
// app.post('/user/create', (UserCtrl.createUser));
// app.post('/user/update', (UserCtrl.updateUser));
// app.delete('/user/delete', (UserCtrl.deleteUser));

// Post routes need to be split
// app.post('/feed/post', (PostCtrl.newPost));
// app.post('/feed/updatepost', (PostCtrl.updatePost));
// app.delete('/feed/deletepost', (PostCtrl.deletePost));

// post routes
app.use( '/feed', routes.post ) ;

// users routes 
app.use('/users', routes.user );
// app.use('/', indexRouter);

// Start Listening devise
app.listen( PORT, () => console.log( `listing at port ${PORT} \nhttp://localhost:${PORT}`) );
