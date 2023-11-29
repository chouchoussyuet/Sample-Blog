const db = require('../config/db.config.js');

const Category = {};

// Lấy tất cả danh mục
Category.getAll = (result) => {
    db.query("SELECT * FROM CATEGORY", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("categories: ", res);
        result(null, res);
    });
};

// Thêm danh mục mới
Category.create = (newCategory, result) => {
    db.query("INSERT INTO CATEGORY SET ?", newCategory, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created category: ", { id: res.insertId, ...newCategory });
        result(null, { id: res.insertId, ...newCategory });
    });
};

module.exports = Category;
