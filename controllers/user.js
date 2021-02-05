const db = require('../models');

// http://localhost:3300/users/create
const createUser = (req, res) => {
    let user = new db.User ({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        avatarImg: req.body.avatarImg,
    });

    user.save()
    // below was for debugging using PostMan
    // .then(result => {
    //     res.json({ success: true, result: result });
    // })
    // .catch(err => {
    //     res.json({ success: false, result: err });
    // })
    res.redirect('/login');
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
    updateUser,
    deleteUser
  }