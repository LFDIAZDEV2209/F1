// teams.js
import './TeamCard.js';

// Mock drivers data
const driversData = {
  1: { id: 1, name: "Oscar Piastri", photoUrl: "/img/drivers/piastri.avif" },
  2: { id: 2, name: "Lando Norris", photoUrl: "/img/drivers/norris.png" },
  3: { id: 3, name: "Max Verstappen", photoUrl: "/img/drivers/verstappen.png" },
  4: { id: 4, name: "George Russell", photoUrl: "/img/drivers/russell.png" },
  5: { id: 5, name: "Charles Leclerc", photoUrl: "/img/drivers/leclerc.png" },
  6: { id: 6, name: "Kimi Antonelli", photoUrl: "/img/drivers/antonelli.png" },
  7: { id: 7, name: "Lewis Hamilton", photoUrl: "/img/drivers/hamilton.png" },
  8: { id: 8, name: "Alex Albon", photoUrl: "/img/drivers/albon.png" },
  9: { id: 9, name: "Kevin Magnussen", photoUrl: "/img/drivers/magnussen.png" },
  10: { id: 10, name: "Fernando Alonso", photoUrl: "/img/drivers/alonso.png" },
  11: { id: 11, name: "Pierre Gasly", photoUrl: "/img/drivers/gasly.png" },
  12: { id: 12, name: "Valtteri Bottas", photoUrl: "/img/drivers/bottas.png" },
  13: { id: 13, name: "Oliver Bearman", photoUrl: "/img/drivers/bearman.png" },
  14: { id: 14, name: "Yuki Tsunoda", photoUrl: "/img/drivers/tsunoda.png" },
  15: { id: 15, name: "Franco Colapinto", photoUrl: "/img/drivers/colapinto.png" },
  16: { id: 16, name: "Sergio Perez", photoUrl: "/img/drivers/perez.png" },
  17: { id: 17, name: "Lance Stroll", photoUrl: "/img/drivers/stroll.png" },
  18: { id: 18, name: "Daniel Ricciardo", photoUrl: "/img/drivers/ricciardo.png" },
  19: { id: 19, name: "Esteban Ocon", photoUrl: "/img/drivers/ocon.png" },
  20: { id: 20, name: "Zhou Guanyu", photoUrl: "/img/drivers/zhou.png" }
};

// Function to fetch vehicle data
async function fetchVehicles() {
  try {
    const response = await fetch('/api/vehicle.json');
    
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

// Function to get team drivers
function getTeamDrivers(vehicle) {
  if (!vehicle.pilots || !Array.isArray(vehicle.pilots)) {
    return [];
  }
  
  return vehicle.pilots.map(pilotId => driversData[pilotId]).filter(Boolean);
}

// Function to render teams
async function renderTeams() {
  const cardsContainer = document.getElementById('cards-container');
  
  if (!cardsContainer) {
    console.error('Cards container not found');
    return;
  }
  
  try {
    const vehicles = await fetchVehicles();
    
    // Sort vehicles by points in descending order
    vehicles.sort((a, b) => b.points - a.points);
    
    // Create team cards
    vehicles.forEach((vehicle, index) => {
      const teamPosition = index + 1;
      const drivers = getTeamDrivers(vehicle);
      
      const teamCard = document.createElement('team-card');
      teamCard.setAttribute('position', teamPosition);
      teamCard.setAttribute('team-data', JSON.stringify(vehicle));
      teamCard.setAttribute('drivers-data', JSON.stringify(drivers));
      
      cardsContainer.appendChild(teamCard);
    });
  } catch (error) {
    console.error('Error rendering teams:', error);
  }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderTeams);