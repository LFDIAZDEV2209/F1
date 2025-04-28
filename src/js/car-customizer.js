// Variables globales
let currentCarId = null;
let cars = [];

// Cargar autos guardados cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    loadCars();
    setupEventListeners();
    updateCarPreview();
});

// Configurar todos los event listeners
function setupEventListeners() {
    // Event listeners para personalización en tiempo real
    document.getElementById('primary-color').addEventListener('input', updateCarPreview);
    document.getElementById('secondary-color').addEventListener('input', updateCarPreview);
    document.getElementById('accent-color').addEventListener('input', updateCarPreview);
    document.getElementById('car-number').addEventListener('input', updateCarPreview);
    document.getElementById('sponsor').addEventListener('change', updateCarPreview);
    
    // Event listeners para botones
    document.getElementById('save-car').addEventListener('click', saveCar);
    document.getElementById('reset-car').addEventListener('click', resetCarForm);
    
    // Event listeners para modales
    document.getElementById('update-car').addEventListener('click', updateCar);
    document.getElementById('cancel-edit').addEventListener('click', closeEditModal);
    document.getElementById('confirm-delete').addEventListener('click', deleteCar);
    document.getElementById('cancel-delete').addEventListener('click', closeDeleteModal);
    
    // Cerrar modal con el botón X
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('edit-modal').style.display = 'none';
        });
    });
}

// Actualizar la vista previa del auto basado en las selecciones
function updateCarPreview() {
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;
    const accentColor = document.getElementById('accent-color').value;
    const carNumber = document.getElementById('car-number').value;
    const sponsor = document.getElementById('sponsor').value;
    
    // Actualizar colores
    document.querySelector('.car-part.body').style.backgroundColor = primaryColor;
    document.querySelector('.car-part.front-wing').style.backgroundColor = secondaryColor;
    document.querySelector('.car-part.rear-wing').style.backgroundColor = secondaryColor;
    document.querySelector('.car-part.detail-1').style.backgroundColor = accentColor;
    
    // Actualizar número
    const detailElement = document.querySelector('.car-part.detail-2');
    detailElement.style.backgroundColor = accentColor;
    detailElement.textContent = carNumber;
    
    // Actualizar patrocinador (esto podría ser extendido con logos, etc)
    // Por ahora solo cambiamos algunos estilos basados en la selección
    if (sponsor !== 'none') {
        const bodyElement = document.querySelector('.car-part.body');
        
        // Añadir un pequeño "logo" basado en el patrocinador seleccionado
        switch(sponsor) {
            case 'racing':
                bodyElement.style.borderTop = `5px solid ${accentColor}`;
                break;
            case 'velocity':
                bodyElement.style.borderBottom = `5px solid ${accentColor}`;
                break;
            case 'turbo':
                bodyElement.style.borderLeft = `5px solid ${accentColor}`;
                break;
            case 'speedx':
                bodyElement.style.borderRight = `5px solid ${accentColor}`;
                break;
        }
    } else {
        // Remover todos los bordes si no hay patrocinador
        const bodyElement = document.querySelector('.car-part.body');
        bodyElement.style.border = 'none';
    }
}

// Guardar un nuevo auto
function saveCar() {
    const carName = document.getElementById('car-name').value.trim() || 'Mi Auto F1';
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;
    const accentColor = document.getElementById('accent-color').value;
    const carNumber = document.getElementById('car-number').value;
    const sponsor = document.getElementById('sponsor').value;
    
    // Validación simple
    if (!carName) {
        alert('Por favor ingresa un nombre para tu auto');
        return;
    }
    
    // Crear objeto del auto
    const car = {
        id: Date.now().toString(), // Usar timestamp como ID único
        name: carName,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        accentColor: accentColor,
        number: carNumber,
        sponsor: sponsor,
        createdAt: new Date().toISOString()
    };
    
    // Añadir a la lista y guardar
    cars.push(car);
    saveCarsToLocalStorage();
    displaySavedCars();
    
    // Mostrar feedback
    alert(`¡${carName} ha sido guardado correctamente!`);
    resetCarForm();
}

// Reestablecer formulario a valores predeterminados
function resetCarForm() {
    document.getElementById('car-name').value = '';
    document.getElementById('primary-color').value = '#E10600';
    document.getElementById('secondary-color').value = '#000000';
    document.getElementById('accent-color').value = '#FFFFFF';
    document.getElementById('car-number').value = '1';
    document.getElementById('sponsor').value = 'none';
    
    updateCarPreview();
}

// Cargar autos desde localStorage
function loadCars() {
    const savedCars = localStorage.getItem('f1Cars');
    if (savedCars) {
        cars = JSON.parse(savedCars);
        displaySavedCars();
    }
}

// Guardar autos en localStorage
function saveCarsToLocalStorage() {
    localStorage.setItem('f1Cars', JSON.stringify(cars));
}

// Mostrar autos guardados en la interfaz
function displaySavedCars() {
    const savedCarsList = document.getElementById('saved-cars-list');
    
    // Limpiar contenido actual
    savedCarsList.innerHTML = '';
    
    if (cars.length === 0) {
        savedCarsList.innerHTML = '<div class="no-cars-message">No tienes autos guardados todavía.</div>';
        return;
    }
    
    // Crear una tarjeta para cada auto guardado
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'saved-car-card';
        carCard.innerHTML = `
            <div class="saved-car-preview">
                <div class="f1-car small">
                    <div class="car-part body" style="background-color: ${car.primaryColor}; ${getCarBorderStyle(car.sponsor, car.accentColor)}"></div>
                    <div class="car-part front-wing" style="background-color: ${car.secondaryColor}"></div>
                    <div class="car-part rear-wing" style="background-color: ${car.secondaryColor}"></div>
                    <div class="car-part cockpit"></div>
                    <div class="car-part wheel front-left"></div>
                    <div class="car-part wheel front-right"></div>
                    <div class="car-part wheel rear-left"></div>
                    <div class="car-part wheel rear-right"></div>
                    <div class="car-part detail-1" style="background-color: ${car.accentColor}"></div>
                    <div class="car-part detail-2" style="background-color: ${car.accentColor}">${car.number}</div>
                </div>
            </div>
            <div class="saved-car-info">
                <h3>${car.name}</h3>
                <p>Número: ${car.number}</p>
                <p>Patrocinador: ${getSponsorName(car.sponsor)}</p>
            </div>
            <div class="saved-car-actions">
                <button class="car-action-btn edit-btn" data-car-id="${car.id}">Editar</button>
                <button class="car-action-btn delete-btn" data-car-id="${car.id}">Eliminar</button>
            </div>
        `;
        
        savedCarsList.appendChild(carCard);
    });
    
    // Añadir event listeners a los botones
    addButtonEventListeners();
}

// Obtener el nombre del patrocinador para mostrar
function getSponsorName(sponsorValue) {
    switch(sponsorValue) {
        case 'racing': return 'Racing Team';
        case 'velocity': return 'Velocity Energy';
        case 'turbo': return 'Turbo Racing';
        case 'speedx': return 'SpeedX';
        default: return 'Ninguno';
    }
}

// Obtener el estilo de borde basado en el patrocinador
function getCarBorderStyle(sponsor, accentColor) {
    switch(sponsor) {
        case 'racing': return `border-top: 5px solid ${accentColor}`;
        case 'velocity': return `border-bottom: 5px solid ${accentColor}`;
        case 'turbo': return `border-left: 5px solid ${accentColor}`;
        case 'speedx': return `border-right: 5px solid ${accentColor}`;
        default: return '';
    }
}

// Añadir event listeners a los botones de editar y eliminar
function addButtonEventListeners() {
    // Botones de editar
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const carId = this.getAttribute('data-car-id');
            openEditModal(carId);
        });
    });
    
    // Botones de eliminar
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const carId = this.getAttribute('data-car-id');
            openDeleteModal(carId);
        });
    });
}

// Abrir modal de edición
function openEditModal(carId) {
    currentCarId = carId;
    const car = cars.find(car => car.id === carId);
    
    if (car) {
        document.getElementById('edit-car-name').value = car.name;
        document.getElementById('edit-primary-color').value = car.primaryColor;
        document.getElementById('edit-secondary-color').value = car.secondaryColor;
        document.getElementById('edit-accent-color').value = car.accentColor;
        document.getElementById('edit-car-number').value = car.number;
        document.getElementById('edit-sponsor').value = car.sponsor;
        
        document.getElementById('edit-modal').style.display = 'flex';
    }
}

// Cerrar modal de edición
function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
    currentCarId = null;
}

// Actualizar auto existente
function updateCar() {
    if (!currentCarId) return;
    
    const carIndex = cars.findIndex(car => car.id === currentCarId);
    
    if (carIndex !== -1) {
        // Obtener valores actualizados
        const updatedName = document.getElementById('edit-car-name').value.trim() || 'Mi Auto F1';
        const updatedPrimaryColor = document.getElementById('edit-primary-color').value;
        const updatedSecondaryColor = document.getElementById('edit-secondary-color').value;
        const updatedAccentColor = document.getElementById('edit-accent-color').value;
        const updatedCarNumber = document.getElementById('edit-car-number').value;
        const updatedSponsor = document.getElementById('edit-sponsor').value;
        
        // Actualizar objeto
        cars[car