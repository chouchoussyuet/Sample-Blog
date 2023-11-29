const db = require('../config/db.config.js');
const bcrypt = require('bcrypt');

const User = {};

// Thêm người dùng mới
User.create = (newUser, result) => {
    db.query("INSERT INTO USERS SET ?", newUser, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // Trong hàm tạo người dùng mới của User model

        newUser.password = bcrypt.hashSync(newUser.password, 10);
        // Sau đó tiếp tục quy trình thêm người dùng

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

// ... các import ...

User.findByUsernameAndPassword = (username, password, result) => {
    db.query("SELECT * FROM USERS WHERE username = ?", [username], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            // Kiểm tra mật khẩu
            const validPassword = bcrypt.compareSync(password, res[0].password);
            if (validPassword) {
                result(null, res[0]);
            } else {
                result({ kind: "not_found" }, null);
            }
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};

// ... export ...


module.exports = User;
