const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ các tệp tĩnh từ thư mục frontend
const path = require('path');
// Phục vụ các tệp tĩnh từ thư mục frontend
app.use(express.static(path.join(__dirname, '../frontend')));


// Sử dụng cors và bodyParser trước các route
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const commentRoutes = require('./routes/comment.routes');
const categoryRoutes = require('./routes/category.routes');


app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/categories', categoryRoutes);


// Lắng nghe trên cổng được chỉ định
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
