async function loadSimulations(query = "") {
    searchInputLoadingIcon.classList.remove("hidden");
    try {
        const response = await fetch("/api/simulation");

        if (!response.ok) {
            throw new Error("Error en la carga de datos");
        }

        const simulationsData = await response.json();
        const container = document.getElementById("cards-container");
        container.innerHTML = ""; // Limpiar contenedor

        // Filtrar las simulaciones por nombre
        const filteredSimulations = simulationsData.filter((simulation) =>
            simulation.name.toLowerCase().includes(query.toLowerCase())
        );

        filteredSimulations.forEach((simulation) => {
            const card = document.createElement("simulation-card");
            card.setAttribute("id", simulation.id);
            card.setAttribute("name", simulation.name);
            card.setAttribute("description", simulation.description);
            card.setAttribute("image-url", simulation.url);

            container.appendChild(card);
        });

        if (filteredSimulations.length === 0) {
            container.innerHTML =
                '<p class="cards-container__no-results">No se encontraron simulaciones.</p>';
        }
    } catch (error) {
        console.error("Error loading simulations:", error);
        const container = document.getElementById("cards-container");
        container.innerHTML =
            '<p class="error-message">Error al cargar los datos de las simulaciones. Por favor intenta nuevamente más tarde.</p>';
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
            loadSimulations(query);
        }, 500); // espera 500ms después de la última tecla
    });
    loadSimulations();
});
  