const UserModel = require('../models/UserModel');

const createUser = (req, res) => {
    let user = new UserModel ({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        avatarImg: req.body.avatarImg
    });

    user.save()
    .then(result => {
        res.json({ success: true, result: result });
    })
    .catch(err => {
        res.json({ success: false, result: err });
    })
}

const updateUser = (req, res) => {
    UserModel.updateOne({_id: req.body._id}, req.body)
        .then(user => {
            if (!user) res.json({ success: false, result: "User does not exist" });
            res.json(user);
        })
        .catch(err => {
            res.json({ success: false, result: err });
        })
}

const deleteUser = (req, res) => {
    UserModel.deleteOne({_id: req.body._id})
    .then(result => {
        res.json({ success: true, result: result});
    });
}

  module.exports = {
    createUser,
    updateUser,
    deleteUser
  }