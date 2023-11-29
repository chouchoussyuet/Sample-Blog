const express = require('express');
const router = express.Router();

const Up = require('../models/up.model');

// Tạo mối quan hệ giữa người dùng và bài viết
router.post('/', (req, res) => {
    Up.linkUserToPost(req.body.userId, req.body.postId, (err, data) => {
        if (err) res.send(err);
        res.json({ message: 'Link created successfully!', data: data });
    });
});

// Xóa mối quan hệ giữa người dùng và bài viết
router.delete('/', (req, res) => {
    Up.unlinkUserFromPost(req.body.userId, req.body.postId, (err, data) => {
        if (err) res.send(err);
        res.json({ message: 'Link deleted successfully!', data: data });
    });
});

module.exports = router;
