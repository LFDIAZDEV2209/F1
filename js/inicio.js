document.addEventListener('DOMContentLoaded', function() {
    
    const startButton = document.querySelector('.start-button');
    const userSelection = document.querySelector('.user-selection');
    const userTypeButtons = document.querySelectorAll('.user-type-btn');
    
    
    setTimeout(() => {
        startButton.style.transform = 'translateX(-50%) scale(1)';
        startButton.style.opacity = '1';
    }, 3000);
    
    
    startButton.addEventListener('click', () => {
        startButton.style.transform = 'translateX(-50%) scale(0)';
        startButton.style.opacity = '0';
        
        
        setTimeout(() => {
            userSelection.style.opacity = '1';
            userSelection.style.visibility = 'visible';
        }, 500);
    });
    
    
    userTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userType = button.getAttribute('data-type');
            
           
            if (userType === 'usuario') {
                window.location.href = 'usuario.html';
            } else if (userType === 'admin') {
                window.location.href = 'administrador.html';
            }
        });
    });
    
    
    setInterval(() => {
        const trackLine = document.createElement('div');
        trackLine.classList.add('track-line');
        trackLine.style.top = '-100px';
        document.querySelector('.race-track').appendChild(trackLine);
        
       
        setTimeout(() => {
            trackLine.remove();
        }, 1000);
    }, 200);
});