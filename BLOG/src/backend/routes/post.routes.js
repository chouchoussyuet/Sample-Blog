const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Post = require('../models/post.model');

// Tạo bài viết mới
router.post('/', (req, res) => {
  const { title, content, category_id } = req.body;

  Post.create(title, content, category_id, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ message: 'Post created successfully' });
  });
});


// // Lấy tất cả bài viết
// router.get('/', (req, res) => {
//   Post.getAll((err, posts) => {
//     if (err) res.send(err);
//     res.send(posts);
//   });
// });

// Lấy tất cả bài viết
router.get('/', (req, res) => {
  const category = req.query.category_id; // Lấy giá trị category từ URL

  if (!category) {
    // Nếu không có category, lấy tất cả bài viết
    Post.getAll((err, posts) => {
      if (err) res.status(500).json({ message: 'Internal Server Error' });
      res.status(200).json(posts);
      console.log("Get all");
    });
  } else {
    // Nếu có category, lấy bài viết dựa trên category
    Post.getByCategory(category, (err, posts) => {
      if (err) res.status(500).json({ message: 'Internal Server Error' });
      res.status(200).json(posts);
    });
  }
});



module.exports = router;
