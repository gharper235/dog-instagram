/* EXTERNAL MODULES */
const express = require ('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

/* PORT */
const PORT = 3300;

// Database -connect
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

app.get('/login', (req, res) => {
  res.render('user/login');
  });

/* Middleware */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

// allows us to use json forms for data input
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

// Session
app.use( session({
  store: new MongoStore({ url: 'mongodb://127.0.0.1:27017/dogigram' }),
  secret: 'notasecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 24 * 7 * 2 // two weeks 
    }
  }) 
);

// Start Listening devise
app.listen( PORT, () => console.log( `listing at port ${PORT} \nhttp://localhost:${PORT}`) );
