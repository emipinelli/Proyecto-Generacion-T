document.getElementById("logout-button").addEventListener("click", () => {
    // Eliminar el estado de sesión y redirigir a la página de inicio de sesión
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
});
