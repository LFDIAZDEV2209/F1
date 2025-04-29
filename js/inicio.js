document.addEventListener('DOMContentLoaded', function() {
    
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
    
    
    const ADMIN_USERNAME = 'yarith1102@gmail.com';
    const ADMIN_PASSWORD = '1234567';
    
    
    video.play();
    
    
    overlay.style.opacity = '1';
    
    
    setTimeout(function() {
        btnEnter.style.display = 'block';
        setTimeout(function() {
            btnEnter.style.opacity = '1';
        }, 100);
    }, 25000);
    
   
    video.addEventListener('ended', function() {
        
        if (loginOptions.style.display !== 'flex') {
            showLoginOptions();
        }
    });
    
    
    btnEnter.addEventListener('click', showLoginOptions);
    
    function showLoginOptions() {
        btnEnter.style.display = 'none';
        loginOptions.style.display = 'flex';
        setTimeout(function() {
            loginOptions.style.opacity = '1';
        }, 100);
    }
    
    
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
    

    closeUserModal.addEventListener('click', function() {
        userModal.style.display = 'none';
    });
    
    closeAdminModal.addEventListener('click', function() {
        adminModal.style.display = 'none';
    });
    
    closeRegisterModal.addEventListener('click', function() {
        registerModal.style.display = 'none';
    });
    

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
    
    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Cargando...';
            submitBtn.disabled = true;
            
            // Autenticación con la API
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    expiresInMins: 30
                }),
                credentials: 'include'
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Credenciales incorrectas');
                }
                return res.json();
            })
            .then(data => {
                
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data));
                
                
                alert('¡Inicio de sesión exitoso! Bienvenido/a ' + data.firstName + ' ' + data.lastName);
                
                
                userModal.style.display = 'none';
            })
            .catch(error => {
                
                alert('Error: ' + error.message);
            })
            .finally(() => {
            
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        }
    });
    
    // Validación de formulario de administrador
    document.getElementById('adminForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const adminUsername = document.getElementById('adminUsername').value;
        const adminPassword = document.getElementById('adminPassword').value;
        
        if (adminUsername && adminPassword) {
            // Verificar credenciales fijas
            if (adminUsername === ADMIN_USERNAME && adminPassword === ADMIN_PASSWORD) {
                // Guardar información en localStorage
                localStorage.setItem('isAdmin', true);
                
                // Mostrar mensaje de éxito
                alert('¡Inicio de sesión como administrador exitoso!');
                
                // Redirigir al panel de administrador (puedes cambiar la URL)
                // window.location.href = 'admin-dashboard.html';
                
                // Ocultar modal
                adminModal.style.display = 'none';
            } else {
                alert('Credenciales de administrador incorrectas');
            }
        }
    });
    
    // Formulario de registro
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
            // Mostrar indicador de carga
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Cargando...';
            submitBtn.disabled = true;
            
            // Simular registro (en una aplicación real, esto sería un endpoint de registro)
            // En DummyJSON no hay endpoint de registro real, así que mostramos mensaje de éxito
            setTimeout(() => {
                alert('¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.');
                
                // Limpiar formulario
                this.reset();
                
                // Ocultar modal de registro y mostrar modal de inicio de sesión
                registerModal.style.display = 'none';
                userModal.style.display = 'flex';
                
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
});