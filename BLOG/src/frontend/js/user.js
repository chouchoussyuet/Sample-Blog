    function showLoginForm() {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    }
    
    function showRegisterForm() {
        document.getElementById('register-form').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
    }
    
    function register() {
        var username = document.getElementById('register-username').value;
        var password = document.getElementById('register-password').value;
        var email = document.getElementById('register-email').value;
        var fullname = document.getElementById('register-fullname').value;
    
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password, email: email, fullname: fullname }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Registration successful!');
            showLoginForm(); // Hiển thị form đăng nhập sau khi đăng ký thành công
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Registration failed!');
        });
    }

    function login() {
        var username = document.getElementById('login-username').value;
        var password = document.getElementById('login-password').value;
    
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Login successful:', data);
            alert('Login successful!');
            
            // Lưu token vào localStorage
            localStorage.setItem('accessToken', data.token);

            // Redirect to post.html
            window.location.href = 'post.html';
        })
        .catch(error => {
            console.error('Login failed:', error);
            alert('Login failed!');
        });
    }
    
    