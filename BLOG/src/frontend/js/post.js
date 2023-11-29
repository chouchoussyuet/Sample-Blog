function submitPost() {
    var title = document.getElementById('post-title').value;
    var content = document.getElementById('post-content').value;

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Thêm header xác thực nếu cần
        },
        body: JSON.stringify({ title: title, content: content }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post submitted:', data);
        alert('Bài viết đã được đăng!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Lỗi khi đăng bài!');
    });
}

function fetchPosts() {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.querySelector('#posts-container');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerText = post.title; // Adjust according to your post structure
                postsContainer.appendChild(postElement);
            });
        });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchPosts();
});
