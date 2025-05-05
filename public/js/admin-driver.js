async function loadDrivers(query = "") {
  searchInputLoadingIcon.classList.remove("hidden");
  try {
    const [driversResponse, countriesResponse, teamsResponse] = await Promise.all([
      fetch("/api/drivers"),
      fetch("/api/countries"),
      fetch("/api/teams"),
    ]);

    if (!driversResponse.ok || !countriesResponse.ok || !teamsResponse.ok) {
      throw new Error("Error en la carga de datos");
    }

    const [driversData, countriesData, teamsData] = await Promise.all([
      driversResponse.json(),
      countriesResponse.json(),
      teamsResponse.json(),
    ]);

    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Limpiar contenedor

    // Filtrar los pilotos por nombre y apellido juntos
    const filteredDrivers = driversData.filter((driver) =>
      `${driver.name} ${driver.lastName}`.toLowerCase().includes(query)
    );

    filteredDrivers.forEach((driver) => {
      const countryData = countriesData.find((country) => country.id === driver.country);
      const teamData = teamsData.find((team) => team.id === driver.team);

      const card = document.createElement("admin-driver-card");
      card.setAttribute("id", driver.id);
      card.setAttribute("name", driver.name);
      card.setAttribute("last-name", driver.lastName);
      card.setAttribute("points", driver.points);
      card.setAttribute("team", teamData.name);
      card.setAttribute("image-url", driver.imageUrl);
      card.setAttribute("driver-number", driver.driverNumber);
      card.setAttribute("flag", countryData ? countryData.flag : "/img/flags/colombia.jpg");

      container.appendChild(card);
    });

    if (filteredDrivers.length === 0) {
      container.innerHTML =
        '<p class="cards-container__no-results">No se encontraron pilotos.</p>';
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
  const searchInput = document.querySelector(".search-container__search-input");
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

// Lógica para abrir el formulario de conductor con la finalidad de editar
document.addEventListener("edit-driver", async (e) => {
  console.log("edit");
  const driverId = parseInt(e.detail.driverId);

  const modalEl = document.querySelector("driver-form-modal");
  const modal = modalEl.shadowRoot.querySelector(".modal");
  const modalTitle = modal.querySelector('.driver-form__title');

  const driverRes = await fetch(`/api/drivers/${driverId}`);
  const driver = await driverRes.json();

  const form = modalEl.shadowRoot.querySelector("#driverForm");

  const teamSelect = form.querySelector('[name="team"]');
  const teams = modalEl.teams; // Recuperar los equipos desde la instancia de DriverFormModal
  const currentTeamExists = [...teamSelect.options].some(opt => parseInt(opt.value) === driver.team);

  if (!currentTeamExists) {
      const teamRes = await fetch(`/api/teams/${driver.team}`);
      const team = await teamRes.json();

      const option = document.createElement("option");
      option.value = team.id;
      option.textContent = team.name;
      teamSelect.appendChild(option); // O usa prepend si prefieres que aparezca arriba

      teams.push(team);
  }

  form.querySelector('[name="name"]').value = driver.name;
  form.querySelector('[name="lastName"]').value = driver.lastName;
  form.querySelector('[name="driverNumber"]').value = driver.driverNumber;
  form.querySelector('[name="points"]').value = driver.points;
  form.querySelector('[name="country"]').value = driver.country;
  form.querySelector('[name="team"]').value = driver.team;

  form.dataset.editId = driver.id;
  modalTitle.textContent = "Editar Piloto";
  modal.classList.add("active");
});

document.addEventListener("remove-driver", async (e) => {
  console.log("remove");
  const driverId = parseInt(e.detail.driverId);
  const modalEl = document.querySelector("delete-driver-modal");
  modalEl.show(driverId);
});