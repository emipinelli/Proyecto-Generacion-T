document.getElementById("login-button").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Credenciales de ejemplo
    const correctUsername = "admin";
    const correctEmail = "admin@gmail.com";
    const correctPassword = "1234";

    if (username === correctUsername && email === correctEmail && password === correctPassword) {

        // Guardar estado de sesión
        localStorage.setItem("loggedIn", "true");

        // Redirigir a la página principal
        window.location.href = "index.html";
    } else {
        document.getElementById("login-message").innerText = "Usuario, correo o contraseña incorrectos.";
    }
});
