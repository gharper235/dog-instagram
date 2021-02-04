const db = require('../models');

const index = ( req, res ) => {
  
    db.Post.find({})
    .populate('user')
    .sort({ createdAt: -1 })
    .exec( ( err, posts ) => {
      if ( err ) return console.log(err)
  
      console.log("there was an error displaying posts")
  
    //   const context = {
    //     posts,
    //     // currentUser: req.session.currentUser
    //   }
  
      res.render('feed/feed', context );
    })
  }

// http://localhost:3300/feed/post
const newPost = (req, res) => {
    let post = new db.Post ({
        img: req.body.img,
        caption: req.body.caption,
    });

    post.save()
    // below was for debugging using PostMan
    // .then(result => {
    //     res.json({ success: true, result: result });
    // })
    // .catch(err => {
    //     res.json({ success: false, result: err });
    // })
        res.render('feed/feed');
}

// http://localhost:3300/feed/updatepost
const updatePost = (req, res) => {
    db.Post.updateOne({_id: req.body._id}, req.body)
        .then(post => {
            if (!post) res.json({ success: false, result: "Post does not exist" });
            res.json(post);
        })
        .catch(err => {
            res.json({ success: false, result: err });
        })
}

// http://localhost:3300/feed/deletepost
const deletePost = (req, res) => {
    db.Post.deleteOne({_id: req.body._id})
    .then(result => {
        res.json({ success: true, result: result});
    });
}

// presentational
const addPostForm = ( req, res ) => {
    res.render('post/new');
  }

const testPosts = ( req, res ) => {
    db.Post.find({})
    .then( posts => res.send(posts) )
    .catch( err => console.log(err) );
  }

  module.exports = {
      index,
      newPost,
      updatePost,
      deletePost,
      addPostForm,
      testPosts
  }