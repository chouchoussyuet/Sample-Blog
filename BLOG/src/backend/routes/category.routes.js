const express = require('express');
const router = express.Router();

const Category = require('../models/category.model');

// Lấy tất cả danh mục
router.get('/', (req, res) => {
    Category.getAll((err, categories) => {
        if (err) res.send(err);
        res.send(categories);
    });
});

// Thêm danh mục mới
router.post('/', (req, res) => {
    Category.create(req.body, (err, category) => {
        if (err) res.send(err);
        res.json({ message: 'Category created successfully!', data: category });
    });
});

module.exports = router;
