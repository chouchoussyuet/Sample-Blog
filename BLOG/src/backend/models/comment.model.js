const db = require('../config/db.config.js');

const Comment = {};

// Thêm bình luận mới
Comment.create = (newComment, result) => {
    db.query("INSERT INTO COMMENT SET ?", newComment, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created comment: ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

module.exports = Comment;
