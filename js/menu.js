document.addEventListener('DOMContentLoaded', function() {

    const loaderContainer = document.getElementById('loader-container');
    const mainMenu = document.getElementById('main-menu');
    const loadingText = document.querySelector('.loading-text');
    
    
    let puntos = 0;
    const loadingInterval = setInterval(function() {
        puntos = (puntos + 1) % 4;
        loadingText.textContent = "CARGANDO" + ".".repeat(puntos);
    }, 500);
    
    
    setTimeout(function() {
        
        clearInterval(loadingInterval);
        
        
        loadingText.textContent = "¡COMPLETADO!";
        
        
        const startButton = document.createElement('button');
        startButton.textContent = "INICIAR";
        startButton.className = "start-button";
        startButton.style.position = "absolute";
        startButton.style.bottom = "-40px";
        startButton.style.left = "50%";
        startButton.style.transform = "translateX(-50%)";
        startButton.style.padding = "10px 30px";
        startButton.style.backgroundColor = "#E10600";
        startButton.style.color = "#fff";
        startButton.style.border = "none";
        startButton.style.borderRadius = "5px";
        startButton.style.fontSize = "16px";
        startButton.style.fontWeight = "bold";
        startButton.style.cursor = "pointer";
        startButton.style.transition = "background-color 0.3s";
        
        // Añadir hover effect con JavaScript
        startButton.onmouseover = function() {
            this.style.backgroundColor = "#C00500";
        };
        startButton.onmouseout = function() {
            this.style.backgroundColor = "#E10600";
        };
        
        // Manejar clic para iniciar la aplicación
        startButton.onclick = function() {
            // Desvanecer el loader
            loaderContainer.style.opacity = "0";
            
            // Después de la animación de desvanecido, ocultar loader y mostrar menú
            setTimeout(function() {
                loaderContainer.classList.add('hidden');
                mainMenu.classList.remove('hidden');
            }, 500);
        };
        
        // Añadir botón al contenedor del loader
        document.querySelector('.loader-content').appendChild(startButton);
    }, 3000); // 3 segundos de tiempo de carga simulado
    
    // Agregar funcionalidad al botón "Explorar ahora"
    const btnExplorar = document.querySelector('.btn-explorar');
    if (btnExplorar) {
        btnExplorar.addEventListener('click', function() {
            // Desplazarse a la sección de características
            document.querySelector('.featured-sections').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
    
    // Navegación suave para todos los enlaces del menú
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});