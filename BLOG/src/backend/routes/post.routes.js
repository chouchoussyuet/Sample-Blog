const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Post = require('../models/post.model');

// Tạo bài viết mới
router.post('/', (req, res) => {
  const { title, content, category_id, user_id } = req.body;
  console.log('Received user ID:', user_id); // Thêm dòng này để kiểm tra

  Post.create(title, content, category_id, user_id, (err, result) => {
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

router.get('/:id', (req, res) => {
  Post.getDetailed(req.params.id, (err, post) => {
    if (err) {
      res.status(500).send({ message: "Error retrieving post" });
    } else {
      res.status(200).send(post);
    }
  });
});

// Xóa bài viết
router.delete('/:id', (req, res) => {
  Post.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  });
});



module.exports = router;
