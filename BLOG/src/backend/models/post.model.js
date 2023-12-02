const db = require('../config/db.config.js');

const Post = {};

// Tạo bài viết mới
Post.create = (title, content, category_id, user_id, callback) => {
  db.query("INSERT INTO POST (title, content, category_id, user_id) VALUES (?, ?, ?, ?)", [title, content, category_id, user_id], (err, res) => {
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

// lấy thông tin chi tiết của bài viết và thông tin người đăng, các bình luận 
Post.getDetailed = (postId, result) => {
  const query = `
    SELECT p.*, u.username, c.comment_content, c.user_id as comment_user_id 
    FROM POST p 
    LEFT JOIN USERS u ON p.user_id = u.id 
    LEFT JOIN COMMENT c ON p.id = c.post_id 
    WHERE p.id = ?
  `;
  db.query(query, [postId], (err, res) => {
    if (err) {
      console.log("Error fetching detailed post", err);
      result(null, err);
      return;
    }
    console.log("Detailed post fetched successfully");
    result(null, res);
  });
};

// Xóa bài viết
Post.delete = (postId, result) => {
  db.query("DELETE FROM POST WHERE post_id = ?", [postId], (err, res) => {
    if (err) {
      console.log("Error deleting post", err);
      result(null, err);
      return;
    }
    console.log("Post deleted successfully");
    result(null, res);
  });
};


module.exports = Post;