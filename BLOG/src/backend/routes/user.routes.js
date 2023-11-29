const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

// Đăng ký người dùng mới
router.post('/', (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) res.send(err);
        res.json({ message: 'User created successfully!', data: user });
    });
});

// ... các import ...

// // Đăng nhập
router.post('/login', (req, res) => {
    User.findByUsernameAndPassword(req.body.username, req.body.password, (err, user) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User not found with username ${req.body.username}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with username " + req.body.username
                });
            }
        } else {
            // Tạo token nếu cần
            res.send(user);
        }
    });
});

// router.post('/login', async (req, res) => {
//     try {
//       const user = await User.findOne({ where: { username: req.body.username } });
//       if (!user) {
//         return res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
//       }
      
//       const passwordMatch = await bcrypt.compare(req.body.password, user.password);
//       if (!passwordMatch) {
//         return res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
//       }
      
//       // Thực hiện xử lý đăng nhập thành công ở đây
//       res.json({ message: 'Đăng nhập thành công' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Lỗi khi đăng nhập' });
//     }
// });

// ... export ...

module.exports = router;
