const db = require('../config/db.config.js');

const Post = {};

// Tạo bài viết mới
Post.create = (title, content, category_id, callback) => {
  db.query("INSERT INTO POST (title, content, category_id) VALUES (?, ?, ?)", [title, content, category_id], (err, res) => {
    if (err) {
      console.log("Error creating post", err);
      callback(err, null);
      return;
    }
    console.log("Post created:", { title, content, category_id });
    callback(null, { title, content, category_id });
  });
};

// Lấy tất cả bài viết
Post.getAll = (result) => {
  db.query("SELECT * FROM POST", (err, res) => {
    if (err) {
      console.log("Error while fetching posts", err);
      result(null, err);
    } else {
      console.log("Posts fetched successfully");
      result(null, res);
    }
  });
};

// Lấy danh sách bài viết dựa trên chủ đề (category)
Post.getByCategory = (category_id, result) => {
  db.query("SELECT * FROM POST WHERE category_id = ?", [category_id], (err, res) => {
    if (err) {
      console.log("Error while fetching posts by category", err);
      result(null, err);
    } else {
      console.log("Posts fetched by category successfully");
      result(null, res);
    }
  });
};

module.exports = Post;
