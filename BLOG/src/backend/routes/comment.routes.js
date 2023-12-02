const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.model');

const jwt = require('jsonwebtoken');

// middleware xác thực token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


// Thêm bình luận mới
router.post('/', (req, res) => {
    // user_id được lấy từ token JWT đã xác thực
    const newComment = {
        post_id: req.body.post_id,
        user_id: req.user.user_id, // Lấy từ token đã xác thực
        content: req.body.content
    };
    // Comment.create(req.body, (err, comment) => {
    //     if (err) res.send(err);
    //     res.json({ message: 'Comment added successfully!', data: comment });
    // });
    Comment.create(newComment, (err, comment) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send(err);
            return;
        }
        res.status(201).json({ message: 'Comment added successfully!', data: comment });
    });
});

module.exports = router;
