const express = require('express');
const router = express.Router();

const Comment = require('../models/comment.model');

// Thêm bình luận mới
router.post('/', (req, res) => {
    Comment.create(req.body, (err, comment) => {
        if (err) res.send(err);
        res.json({ message: 'Comment added successfully!', data: comment });
    });
});

module.exports = router;
