const db = require('../config/db.config.js');

const Up = {};

// Thêm mối quan hệ giữa người dùng và bài viết
Up.linkUserToPost = (userId, postId, result) => {
    db.query("INSERT INTO UP (user_id, post_id) VALUES (?, ?)", [userId, postId], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Link created: ", { user_id: userId, post_id: postId });
        result(null, { user_id: userId, post_id: postId });
    });
};

// Xóa mối quan hệ giữa người dùng và bài viết
Up.unlinkUserFromPost = (userId, postId, result) => {
    db.query("DELETE FROM UP WHERE user_id = ? AND post_id = ?", [userId, postId], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Link deleted: ", { user_id: userId, post_id: postId });
        result(null, res);
    });
};

module.exports = Up;
