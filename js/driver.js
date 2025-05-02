async function loadDrivers(query = "") {
  searchInputLoadingIcon.classList.remove("hidden");
  try {
    const [driversResponse, countriesResponse] = await Promise.all([
      fetch("/api/driver.json"),
      fetch("/api/country.json"),
    ]);

    if (!driversResponse.ok || !countriesResponse.ok) {
      throw new Error("Error en la carga de datos");
    }

    const [driversData, countriesData] = await Promise.all([
      driversResponse.json(),
      countriesResponse.json(),
    ]);

    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Limpiar contenedor

    // Filtrar los pilotos por nombre y apellido juntos
    const filteredDrivers = driversData.filter((driver) =>
      `${driver.name} ${driver.lastName}`.toLowerCase().includes(query)
    );

    filteredDrivers.forEach((driver) => {
      const countryData = countriesData.find((country) => country.id === driver.country);
      
      const card = document.createElement("driver-card");
      card.setAttribute("id", driver.id);
      card.setAttribute("name", driver.name);
      card.setAttribute("last-name", driver.lastName);
      card.setAttribute("points", driver.points);
      card.setAttribute("team", driver.team);
      card.setAttribute("image-url", driver.imageUrl);
      card.setAttribute("driver-number", driver.driverNumber);
      card.setAttribute("flag", countryData ? countryData.flag : "/img/flags/colombia.jpg");

      container.appendChild(card);
    });

    if (filteredDrivers.length === 0) {
      container.innerHTML =
        '<p class="no-results">No se encontraron pilotos.</p>';
    }
  } catch (error) {
    console.error("Error loading drivers:", error);
    const container = document.getElementById("cards-container");
    container.innerHTML =
      '<p class="error-message">Error al cargar los datos de los pilotos. Por favor intenta nuevamente más tarde.</p>';
  } finally {
    searchInputLoadingIcon.classList.add("hidden");
  }
}

let debounceTimeout;
let searchInputLoadingIcon;

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  searchInputLoadingIcon = document.querySelector(
    ".search-container__loading-spinner"
  );
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const query = searchInput.value.trim().toLowerCase();
      loadDrivers(query);
    }, 500); // espera 500ms después de la última tecla
  });
  loadDrivers();
});
// Suponiendo que este código se añade a tu archivo driver.js existente
// o se ejecuta después de que las tarjetas de pilotos se han creado

document.addEventListener('DOMContentLoaded', function() {
  // Esta función inicializa la animación slide-up en todas las tarjetas
  function initializeSlideUpAnimation() {
      // Primero, aseguramos que cada tarjeta de piloto tenga la estructura correcta
      const pilotoCards = document.querySelectorAll('#cards-container > div');
      
      pilotoCards.forEach(card => {
          // Si no tiene la clase card-container, se la añadimos
          if (!card.classList.contains('card-container')) {
              card.classList.add('card-container');
          }
          
          // Obtenemos los datos del piloto para crear la tarjeta de información
          const nombre = card.querySelector('h3')?.textContent || 'Piloto';
          const equipo = card.querySelector('p')?.textContent || 'Equipo';
          const imgSrc = card.querySelector('img')?.src || '';
          
          // Si no existe la tarjeta de información, la creamos
          if (!card.querySelector('.info-card')) {
              // Creamos el elemento para la información del piloto
              const infoCard = document.createElement('div');
              infoCard.className = 'info-card';
              
              // Podemos usar datos reales o genéricos
              // Aquí usamos datos genéricos que deberás reemplazar con datos reales
              infoCard.innerHTML = `
                  <div class="piloto-info">
                      <h3>${nombre}</h3>
                      <ul>
                          <li><strong>Team:</strong> ${equipo}</li>
                          <li><strong>Country:</strong> Country</li>
                          <li><strong>Podiums:</strong> 0</li>
                          <li><strong>Points:</strong> 0</li>
                          <li><strong>Grands Prix entered:</strong> 0</li>
                          <li><strong>Date of birth:</strong> DD/MM/YYYY</li>
                      </ul>
                      <button class="back-btn">Back</button>
                  </div>
              `;
              
              // Añadimos la tarjeta de información al contenedor
              card.appendChild(infoCard);
          }
          
          // Añadimos el evento de clic a la tarjeta
          card.addEventListener('click', function() {
              this.classList.add('active');
          });
          
          // Añadimos el evento de clic al botón volver
          const backBtn = card.querySelector('.back-btn');
          if (backBtn) {
              backBtn.addEventListener('click', function(e) {
                  e.stopPropagation();
                  card.classList.remove('active');
              });
          }
      });
  }

  // Si estás cargando los pilotos con AJAX o dinámicamente
  // puedes llamar a esta función después de que los datos se hayan cargado
  function loadDriversAndInitialize() {
      // Tu código existente para cargar pilotos...
      
      // Después de cargar y renderizar los pilotos, inicializa la animación
      initializeSlideUpAnimation();
  }
  
  // También puedes añadir esta función al objeto window para llamarla desde otro lugar
  window.initializeSlideUpAnimation = initializeSlideUpAnimation;
  
  // Si estás usando el evento de búsqueda, puedes reinicializar las animaciones después de filtrar
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
      searchInput.addEventListener('input', function() {
          // Asumiendo que tienes un temporizador para evitar demasiadas llamadas
          clearTimeout(this.searchTimer);
          this.searchTimer = setTimeout(() => {
              // Después de actualizar los resultados de búsqueda
              initializeSlideUpAnimation();
          }, 300);
      });
  }
  // Después de cargar tus datos y crear las tarjetas
initializeToggleSlideAnimation();

  
});