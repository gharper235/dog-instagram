/* EXTERNAL MODULES */
const express = require ('express');


/* INTERNAL MODULES */
// const routes = require('./routes')

/* PORT */
const PORT = 3500;

const app = express()


/* APP CONFIG */
app.get('/', (req, res) => {
    res.send('Future of doggie-instagram!')
  })

/* Middleware */


// for our session 


/* ROUTES */


app.listen( PORT, () => console.log( `listing at port ${PORT} \nhttp://localhost:${PORT}`) );
