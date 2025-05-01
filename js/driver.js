async function loadDrivers() {
  try {
    // Llamada a la API local
    const response = await fetch('/api/driver.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const driversData = await response.json();
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Limpiar contenedor

    // Mapear los datos de la API a la estructura que espera el componente
    driversData.forEach(driver => {
      const card = document.createElement('driver-card');

      // Prepara los datos que espera tu componente
      const driverData = {
        id: driver.id,
        points: driver.points,
        name: driver.name,
        lastName: driver.lastName,
        team: driver.team,
        imageUrl: driver.imageUrl,      
        driverNumber: driver.driverNumber,
        flag: driver.flag
      };

      card.setAttribute('data', JSON.stringify(driverData));

      // Insertar la card en el contenedor
      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading drivers:', error);
    const container = document.getElementById('cards-container');
    container.innerHTML = '<p class="error-message">Error al cargar los datos de los pilotos. Por favor intenta nuevamente más tarde.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadDrivers);
