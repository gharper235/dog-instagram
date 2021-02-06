const bcrypt = require('bcryptjs');
const db = require('../models');

// http://localhost:3300/users/create
const createUser = (req, res) => {
    console.log('before hash', req.body )
    db.User.findOne( { email: req.body.email }, ( err, foundUser ) => {
      if ( err ) return console.log(err);
      if ( foundUser ) return console.log('user exist');
      
      bcrypt.genSalt( 10, ( err, salt ) => {
        if ( err ) return console.log(err);
        
        bcrypt.hash( req.body.password, salt, ( err, hash ) => {
          if ( err ) return console.log(err);
          
          req.body.password = hash
          console.log('after hash', req.body )
           
          db.User.create( req.body, ( err, createdUser ) => {
            if ( err ) return console.log(err);
  
            console.log(createUser);
            res.redirect('/login');
          })
        });
      })
    })
  }

// http://localhost:3300/users/create
// const createUser = (req, res) => {
//     db.User.findOne({ email: req.body.email }, (err, foundUser) =>{
//         if (err) return console.log(err);
//         if (foundUser) return console.log('user exists');
//         bcrypt.genSalt(10)
//     })
//     let user = new db.User ({
//         username: req.body.username,
//         email: req.body.email,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password,
//         avatarImg: req.body.avatarImg,
//     });

//     user.save()
//     // below was for debugging using JSon in PostMan
//     // .then(result => {
//     //     res.json({ success: true, result: result });
//     // })
//     // .catch(err => {
//     //     res.json({ success: false, result: err });
//     // })
//     res.redirect('/login');
// }

// presentational
const loginForm = ( req, res ) => {
    res.render('user/login')
  };

const login = ( req, res ) => {
    if ( req.body.email === '' || 
    req.body.password === '' ) return res.render('user/login');
    
    db.User.findOne( { email: req.body.email }, ( err, foundUser ) => {
      if ( err ) return res.render('user/login')
      if ( !foundUser ) return res.render('user/login')
  
      bcrypt.compare( req.body.password, foundUser.password, ( err, isMatch ) => {
        if ( err ) return res.render('user/login')  
        if ( !isMatch ) return res.render('user/login', {message: 'login incorrect, please try again'});
  

console.log(req.session); // the login session appears to work here

        // TODO it breaks here.... 
        req.session.currentUser = {
          username: foundUser.username,
          userImg: foundUser.avatarImg,
          userId: foundUser._id
        }
  
        res.redirect('/feed');
      })
    });
  }

// http://localhost:3300/user/update
const updateUser = (req, res) => {
    db.User.updateOne({_id: req.body._id}, req.body)
        .then(user => {
            if (!user) res.json({ success: false, result: "User does not exist" });
            res.json(user);
        })
        .catch(err => {
            res.json({ success: false, result: err });
        })
}

// http://localhost:3300/users/delete
const deleteUser = (req, res) => {
    db.User.deleteOne({_id: req.body._id})
    .then(result => {
        res.json({ success: true, result: result});
    });
}

module.exports = {
    createUser,
    loginForm,
    login,
    updateUser,
    deleteUser
  }