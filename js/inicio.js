document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const video = document.getElementById('videoBackground');
    const overlay = document.getElementById('overlay');
    const btnEnter = document.getElementById('btnEnter');
    const loginOptions = document.getElementById('loginOptions');
    const userLogin = document.getElementById('userLogin');
    const adminLogin = document.getElementById('adminLogin');
    const userModal = document.getElementById('userModal');
    const adminModal = document.getElementById('adminModal');
    const registerModal = document.getElementById('registerModal');
    const closeUserModal = document.getElementById('closeUserModal');
    const closeAdminModal = document.getElementById('closeAdminModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const registerLink = document.getElementById('registerLink');
    
    // Iniciar reproducción del video
    video.play();
    
    // Mostrar el overlay al cargar la página
    overlay.style.opacity = '1';
    
    // Contador para mostrar el botón "ENTRAR" después de 25 segundos
    setTimeout(function() {
        btnEnter.style.display = 'block';
        setTimeout(function() {
            btnEnter.style.opacity = '1';
        }, 100);
    }, 25000);
    
    // Evento cuando termina el video (28 segundos)
    video.addEventListener('ended', function() {
        // Si el usuario no ha hecho clic en "ENTRAR", mostrar las opciones de login
        if (loginOptions.style.display !== 'flex') {
            showLoginOptions();
        }
    });
    
    // Mostrar opciones de login al hacer clic en "ENTRAR"
    btnEnter.addEventListener('click', showLoginOptions);
    
    function showLoginOptions() {
        btnEnter.style.display = 'none';
        loginOptions.style.display = 'flex';
        setTimeout(function() {
            loginOptions.style.opacity = '1';
        }, 100);
    }
    
    // Eventos para mostrar modals
    userLogin.addEventListener('click', function() {
        userModal.style.display = 'flex';
    });
    
    adminLogin.addEventListener('click', function() {
        adminModal.style.display = 'flex';
    });
    
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        userModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });
    
    // Eventos para cerrar modals
    closeUserModal.addEventListener('click', function() {
        userModal.style.display = 'none';
    });
    
    closeAdminModal.addEventListener('click', function() {
        adminModal.style.display = 'none';
    });
    
    closeRegisterModal.addEventListener('click', function() {
        registerModal.style.display = 'none';
    });
    
    // Cerrar modals al hacer clic fuera de ellos
    window.addEventListener('click', function(e) {
        if (e.target === userModal) {
            userModal.style.display = 'none';
        }
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
    
    // Validación de formularios
    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            alert('¡Inicio de sesión como usuario exitoso!');
            userModal.style.display = 'none';
        }
    });
    
    document.getElementById('adminForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const adminUsername = document.getElementById('adminUsername').value;
        const adminPassword = document.getElementById('adminPassword').value;
        
        if (adminUsername && adminPassword) {
            alert('¡Inicio de sesión como administrador exitoso!');
            adminModal.style.display = 'none';
        }
    });
    
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const email = document.getElementById('email').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        if (newUsername && email && newPassword) {
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            registerModal.style.display = 'none';
        }
    });
});