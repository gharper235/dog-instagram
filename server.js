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
    res.render('index');
  })

app.get('/feed', (req, res) => {
  res.render('feed/feed');
  });

app.get('/newpost', (req, res) => {
  res.render('post/new');
  });

app.get('/newuser', (req, res) => {
  res.render('user/create');
  });

/* Middleware */

// allows us to use json forms for data input
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// for debugging
app.use( ( req, res, next ) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next();
})

// user it create a global obj for our app 
app.use( ( req, res, next)  => {
  app.locals.user =  req.user;
  next();
});

// Controllers


/* ROUTES */

// post routes
app.use( '/feed', routes.post ) ;

// users routes 
app.use('/users', routes.user );
// app.use('/', indexRouter);

// Start Listening devise
app.listen( PORT, () => console.log( `listing at port ${PORT} \nhttp://localhost:${PORT}`) );
