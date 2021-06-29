const express = require('express');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://kiran:n7mMezZu86sWshV@cluster0.bpcl8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to database!')
})
.catch(() => {
  console.log('Connection failed!')
})

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use((req, res, nxt) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  nxt();
});

app.post('/api/posts', (req, res, nxt) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, nxt) => {
  // const posts = [
  //   {id:"1", title:"First post", content: "This is First post's content"},
  //   {id:"2", title:"Second post", content: "This is Second post's content"},
  //   {id:"3", title:"Third post", content: "This is Third post's content"}
  // ]
  Post.find()
  .then(documents => {
    console.log(documents)
      res.status(200).json({
      message: 'Posta fetched succesfully!',
      posts: documents
  });
  });
});

app.delete('/api/posts/:id', (req, res, nxt) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Post deleted!' });
  })
});

module.exports = app;
