async function loadDrivers(query = "") {
    searchInputLoadingIcon.classList.remove('hidden');
  try {
    const response = await fetch("/api/driver.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const driversData = await response.json();
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Limpiar contenedor

    // Filtrar los pilotos por nombre y apellido juntos
    const filteredDrivers = driversData.filter((driver) =>
      `${driver.name} ${driver.lastName}`.toLowerCase().includes(query)
    );

    filteredDrivers.forEach((driver) => {
      const card = document.createElement("driver-card");

      const driverData = {
        id: driver.id,
        points: driver.points,
        name: driver.name,
        lastName: driver.lastName,
        team: driver.team,
        imageUrl: driver.imageUrl,
        driverNumber: driver.driverNumber,
        flag: driver.flag,
      };

      card.setAttribute("data", JSON.stringify(driverData));
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
    searchInputLoadingIcon.classList.add('hidden');
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
