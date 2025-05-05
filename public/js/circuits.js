async function loadCircuits(query = "") {
    searchInputLoadingIcon.classList.remove("hidden");
    try {
      const [circuitsResponse, countriesResponse] = await Promise.all([
        fetch("/api/circuits"),
        fetch("/api/countries"),
      ]);
  
      if (!circuitsResponse.ok || !countriesResponse.ok ) {
        throw new Error("Error en la carga de datos");
      }
  
      const [circuitsData, countriesData] = await Promise.all([
        circuitsResponse.json(),
        countriesResponse.json(),
      ]);
  
      const container = document.getElementById("cards-container");
      container.innerHTML = ""; // Limpiar contenedor
  
      // Filtrar los circuitos por nombre 
      const filteredCircuits = circuitsData.filter((circuit) =>
        `${circuit.name}`.toLowerCase().includes(query)
      );
  
      filteredCircuits.forEach((circuit) => {
        const countryData = countriesData.find((country) => country.id === circuit.country);
  
        const card = document.createElement("circuit-card");
        card.setAttribute("id", circuit.id);
        card.setAttribute("name", circuit.name);
        card.setAttribute("length", circuit.lengthKm);
        card.setAttribute("laps", circuit.laps);
        card.setAttribute("curves", circuit.curves);
        card.setAttribute("description", circuit.description);
        card.setAttribute("image-url", circuit.imageUrl);
        card.setAttribute("country", countryData ? countryData.name : "Colombia");

        
        container.appendChild(card);
      });
  
      if (filteredCircuits.length === 0) {
        container.innerHTML =
          '<p class="cards-container__no-results">No se encontraron circuitos.</p>';
      }
    } catch (error) {
      console.error("Error loading circuits:", error);
      const container = document.getElementById("cards-container");
      container.innerHTML =
        '<p class="error-message">Error al cargar los datos de los circuitos. Por favor intenta nuevamente más tarde.</p>';
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
        loadCircuits(query);
      }, 500); // espera 500ms después de la última tecla
    });
    loadCircuits();
  });
  