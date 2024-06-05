document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('errorMessage');

    fetch('http://localhost:3000/usuario')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.usuario_login === username && user.usuario_pass === password);
            if (user) {
                errorMessage.style.display = 'none';
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'menu.html';
                console.log("hola!");
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos';
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            errorMessage.textContent = 'Ocurrió un error al intentar iniciar sesión.';
            errorMessage.style.display = 'block';
        });
});
