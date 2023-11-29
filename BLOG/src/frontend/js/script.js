// function fetchPosts() {
//     fetch('http://localhost:3000/posts')
//         .then(response => response.json())
//         .then(posts => {
//             const postsContainer = document.querySelector('#posts-container');
//             posts.forEach(post => {
//                 const postElement = document.createElement('div');
//                 postElement.innerText = post.title; // Adjust according to your post structure
//                 postsContainer.appendChild(postElement);
//             });
//         });
// }

function registerUser(userData) {
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

// function postComment(commentData) {
//     fetch('http://localhost:3000/comments', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(commentData),
//     })
//     .then(response => response.json())
//     .then(data => console.log('Comment posted:', data))
//     .catch((error) => console.error('Error:', error));
// }

// document.addEventListener("DOMContentLoaded", function() {
//     fetchPosts();
// });
