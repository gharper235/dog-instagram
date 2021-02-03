const PostModel = require('../models/PostModel');

/* const index = ( req, res ) => {
  
    db.Post.find({})
    .populate('user')
    .sort({ createdAt: -1 })
    .exec( ( err, posts ) => {
      if ( err ) return console.log(err)
  
      console.log(req.session.currentUser)
  
      const context = {
        posts,
        currentUser: req.session.currentUser
      }
  
      res.render('feed/feed', context );
    })
  } */

const newPost = (req, res) => {
    let post = new PostModel ({
        img: req.body.img,
        caption: req.body.caption,
    });

    post.save()
    .then(result => {
        res.json({ success: true, result: result });
    })
    .catch(err => {
        res.json({ success: false, result: err });
    })
}

const updatePost = (req, res) => {
    PostModel.updateOne({_id: req.body._id}, req.body)
        .then(post => {
            if (!post) res.json({ success: false, result: "Post does not exist" });
            res.json(post);
        })
        .catch(err => {
            res.json({ success: false, result: err });
        })
}

const deletePost = (req, res) => {
    PostModel.deleteOne({_id: req.body._id})
    .then(result => {
        res.json({ success: true, result: result});
    });
}

  module.exports = {
    //   index,
      newPost,
      updatePost,
      deletePost
  }