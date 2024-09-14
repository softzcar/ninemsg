async function login(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('loginButton');

    // Desactivar el botón para evitar múltiples envíos
    loginButton.disabled = true;
    loginButton.textContent = 'Enviando...';

    // Convertir los datos a formato `x-www-form-urlencoded`
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString() // Enviar los datos correctamente formateados
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar el token en LocalStorage
            localStorage.setItem('token', data.token);

            // Redirigir a la página de QR
            window.location.href = '/qr';
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        alert('Error en el proceso de login');
    } finally {
        // Habilitar el botón de nuevo si hay un error
        loginButton.disabled = false;
        loginButton.textContent = 'Enviar';
    }
}

// Agregar el event listener al formulario
document.getElementById('loginForm').addEventListener('submit', login);

async function fetchQr() {
    const token = localStorage.getItem('token');

    const response = await fetch('/qr', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
        // Mostrar el contenido del código QR
        const qrCode = await response.text();
        document.getElementById('qr-container').innerHTML = qrCode;
    } else {
        alert('Acceso denegado');
    }
}
