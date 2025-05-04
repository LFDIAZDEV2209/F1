
// Function to fetch vehicle data
async function fetchVehicles() {
    try {
        const response = await fetch('/api/vehicles');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vehicle data:', error);

        // If fetch fails, use hardcoded data from vehiclesData.js if available
        if (typeof vehiclesData !== 'undefined') {
            return vehiclesData;
        }

        return [];
    }
}

async function fetchTeams() {
    try {
        const response = await fetch('/api/teams');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vehicle data:', error);

        // If fetch fails, use hardcoded data from vehiclesData.js if available
        if (typeof vehiclesData !== 'undefined') {
            return vehiclesData;
        }

        return [];
    }
}

async function fetchDrivers() {
    try {
        const response = await fetch('/api/drivers');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vehicle data:', error);
    }
}


// Function to render teams
async function renderTeams(query = "") {
    searchInputLoadingIcon.classList.remove("hidden");
    const cardsContainer = document.getElementById('cards-container');
    if (!cardsContainer) {
        console.error('Cards container not found');
        return;
    }
    cardsContainer.innerHTML = ""; // Limpiar contenedor
    try {
        const drivers = await fetchDrivers();
        const vehicles = await fetchVehicles();
        const teams = await fetchTeams();

        const filteredTeams = teams.filter((team) =>
            `${team.name}`.toLowerCase().includes(query)
        );

        // Create team cards
        filteredTeams.forEach((team) => {

            const teamPilots = drivers.filter(driver => driver.team === team.id);
            const teamPilotsWithVehicle = teamPilots.map(pilot => {
                const vehicle = vehicles.find(vehicle => vehicle.pilot == pilot.id);
                return {
                    ...pilot,
                    vehicle: vehicle ? vehicle : null
                };
            });

            const teamCard = document.createElement('admin-team-card');
            teamCard.setAttribute('team-data', JSON.stringify(team));
            teamCard.setAttribute('drivers-data', JSON.stringify(teamPilotsWithVehicle));

            cardsContainer.appendChild(teamCard);
        });
    } catch (error) {
        console.error('Error rendering teams:', error);
        cardsContainer.innerHTML =
            '<p class="error-message">Error al cargar los datos de los equipos. Por favor intenta nuevamente más tarde.</p>';
    } finally {
        searchInputLoadingIcon.classList.add("hidden");
    }
}

let debounceTimeout;
let searchInputLoadingIcon;


// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector(".search-container__search-input");
    searchInputLoadingIcon = document.querySelector(
        ".search-container__loading-spinner"
    );
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const query = searchInput.value.trim().toLowerCase();
            renderTeams(query);
        }, 500); // espera 500ms después de la última tecla
    });
    renderTeams();
}); 