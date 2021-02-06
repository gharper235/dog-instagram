const { Router } = require('express');
const db = require('../models');

const index = ( req, res ) => {
    db.Post.find({}, (err, allPost) => {
        if(err) return console.log('error in index', err)
        const context = {
            posts: allPost,
        }
        res.render('feed/feed', context)
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
        res.redirect('/feed');
}

// http://localhost:3300/feed/updatepost
const updatePost = (req, res) => {
    db.Post.findByIdAndUpdate(
        req.body._id, 
        {...req.body}, 
        {
            new: true,
        })
        .then(result => {
            
            res.redirect('/feed');
            // if (!post) res.json({ success: false, result: "Post does not exist" });
            // res.json(post);
        })
        .catch(err => {
            res.json({ success: false, result: err });
        })
}

// http://localhost:3300/feed/deletepost
const deletePost = (req, res) => {
    console.log(req.body, "This is the deletePost function")
    db.Post.findByIdAndDelete(
        req.body._id,
        {...req.body},
        {
            new: true,
        })
    .then(result => {
        res.redirect('/feed')
        //res.json({ success: true, result: result});
    })
    .catch(err => console.log(err));
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