let selectedVehicles = [];

async function loadVehicles(query = "") {
  searchInputLoadingIcon.classList.remove("hidden");
  try {
    const [vehiclesResponse, driversResponse, powerUnitsResponse, teamsResponse] = await Promise.all([
      fetch("/api/vehicles"),
      fetch("/api/drivers"),
      fetch("/api/power-unit"),
      fetch("/api/teams"),
    ]);

    if (!vehiclesResponse.ok || !driversResponse.ok || !powerUnitsResponse.ok || !teamsResponse.ok) {
      throw new Error("Error en la carga de datos");
    }

    const [vehiclesData, driversData, powerUnitsData, teamsData] = await Promise.all([
      vehiclesResponse.json(),
      driversResponse.json(),
      powerUnitsResponse.json(),
      teamsResponse.json(),
    ]);

    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Limpiar contenedor

    // Filtrar los pilotos por nombre y apellido juntos
    const filteredVehicles = vehiclesData.filter((vehicle) =>
      `${vehicle.name}`.toLowerCase().includes(query)
    );

    filteredVehicles.forEach((vehicle) => {
      const powerUnitData = powerUnitsData.find((powerUnit) => powerUnit.id === vehicle.powerUnit);
      const driverData = driversData.find((driver) => driver.id === vehicle.pilot);
      const teamData = driverData ? teamsData.find((team) => team.id === driverData.team) : null;
    
      const card = document.createElement("admin-vehicle-card");
    
      card.setAttribute("id", vehicle.id);
      card.setAttribute("name", vehicle.name);
      card.setAttribute("image-url", vehicle.imageUrl);
      card.setAttribute("power-unit", powerUnitData?.name || "Sin datos");
      card.setAttribute("chassis", vehicle.chassis);
      card.setAttribute("pilot", driverData ? `${driverData.name} ${driverData.lastName}` : "Sin piloto");
      card.setAttribute("team", teamData ? teamData.name : "Sin equipo");
      card.setAttribute("speed-max", vehicle.performanceSpecifications.speedMax);
      card.setAttribute("acceleration", vehicle.performanceSpecifications.acceleration);
      card.setAttribute("fuel-consumption", vehicle.performanceSpecifications.fuelConsumption);
      card.setAttribute("tire-wear", vehicle.performanceSpecifications.tireWear);
    
      card.addEventListener("compare", (event) => handleCompare(event));
    
      container.appendChild(card);
    });

    if (filteredVehicles.length === 0) {
      container.innerHTML =
        '<p class="cards-container__no-results">No se encontraron vehículos.</p>';
    }
  } catch (error) {
    console.error("Error loading drivers:", error);
    const container = document.getElementById("cards-container");
    container.innerHTML =
      '<p class="error-message">Error al cargar los datos de los vehículos. Por favor intenta nuevamente más tarde.</p>';
  } finally {
    searchInputLoadingIcon.classList.add("hidden");
  }
}

let debounceTimeout;
let searchInputLoadingIcon;

function handleCompare(event) {
  const vehicle = event.detail;

  if (selectedVehicles.length < 2) {
    selectedVehicles.push(vehicle);
    updateComparisonBar();
  }
}

function updateComparisonBar() {
  const comparisonBar = document.getElementById("comparison-bar");
  if (selectedVehicles.length === 2) {
    const vehicle1 = selectedVehicles[0];
    const vehicle2 = selectedVehicles[1];

    // Comparar las propiedades
    const compare = (prop) => {
      const v1 = vehicle1[prop];
      const v2 = vehicle2[prop];
      let superior = '';
      let difference = 0;
    
      if (v1 > v2) {
        superior = vehicle1.name;
        difference = (v1 - v2).toFixed(2); // Redondear la diferencia a 2 decimales
      } else if (v1 < v2) {
        superior = vehicle2.name;
        difference = (v2 - v1).toFixed(2); // Redondear la diferencia a 2 decimales
      } else {
        superior = 'Ambos';
        difference = 0;
      }
    
      return { superior, difference, v1, v2 };
    };

    const speedComparison = compare("speedMax");
    const accelerationComparison = compare("acceleration");
    const fuelComparison = compare("fuelConsumption");
    const tireWearComparison = compare("tireWear");

    comparisonBar.innerHTML = `
    <div class="comparison-bar__vehicles-container">
      <div class="comparison-bar__vehicle">
        <h3>${vehicle1.name}</h3>
        <span>Velocidad Máx.: ${vehicle1.speedMax} km/h</span>
        <span>Aceleración: ${vehicle1.acceleration} s</span>
        <span>Consumo: ${vehicle1.fuelConsumption} L/km</span>
        <span>Desgaste: ${vehicle1.tireWear} %</span>
      </div>
      <div class="comparison-bar__vehicle">
        <h3>${vehicle2.name}</h3>
        <span>Velocidad Máx.: ${vehicle2.speedMax} km/h</span>
        <span>Aceleración: ${vehicle2.acceleration} s</span>
        <span>Consumo: ${vehicle2.fuelConsumption} L/km</span>
        <span>Desgaste: ${vehicle2.tireWear} %</span>
      </div>
    </div>
    <div class="comparison-bar__results">
      
    <h4>Comparación:</h4>
      <p><strong>Velocidad Máx.:</strong> ${speedComparison.superior} es superior por ${speedComparison.difference} km/h</p>
      <p><strong>Aceleración:</strong> ${accelerationComparison.superior} es superior por ${accelerationComparison.difference} s</p>
      <p><strong>Consumo de Combustible:</strong> ${fuelComparison.superior} es superior por ${fuelComparison.difference} L/km</p>
      <p><strong>Desgaste de Llantas:</strong> ${tireWearComparison.superior} es superior por ${tireWearComparison.difference} %</p>
    </div>
      <button id="exit-comparison" class="primary-button">Salir</button>
    `;

    document.getElementById("exit-comparison").addEventListener("click", exitComparisonMode);
    comparisonBar.classList.remove('hidden');
  } else {
    comparisonBar.innerHTML = ``;
    comparisonBar.classList.add('hidden');
  }
}


function exitComparisonMode() {
  selectedVehicles = [];
  document.getElementById("comparison-bar").classList.add('hidden');
  updateComparisonBar();
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-container__search-input");
  searchInputLoadingIcon = document.querySelector(
    ".search-container__loading-spinner"
  );
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const query = searchInput.value.trim().toLowerCase();
      loadVehicles(query);
    }, 500); // espera 500ms después de la última tecla
  });
  loadVehicles();
});
