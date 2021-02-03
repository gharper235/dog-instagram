const PostModel = require('../models/PostModel');

const newPost = (req, res) => {
    let post = new PostModel ({
        img: req.body.img,
        caption: req.body.caption,
        
        // user: {
        //     type: mongoose.Types.ObjectId,
        //     ref: 'User'
        // },
        // likes: [{
        //     type: mongoose.Types.ObjectId,
        //     ref: 'User'
        // }]
    });

    post.save()
    .then(result => {
        res.json({ success: true, result: result });
    })
    .catch(err => {
        res.json({ success: false, result: err });
    })
}

// const updateUser = (req, res) => {
//     UserModel.updateOne({_id: req.body._id}, req.body)
//         .then(user => {
//             if (!user) res.json({ success: false, result: "User does not exist" });
//             res.json(user);
// })
// }

  module.exports = {
      newPost
    //   updateUser
  }