
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

async function fetchDrivers() {
  try {
    const response = await fetch('/api/driver.json');

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
async function renderTeams() {
  console.log("render teams")
  const cardsContainer = document.getElementById('cards-container');

  if (!cardsContainer) {
    console.error('Cards container not found');
    return;
  }

  try {
    const drivers= await fetchDrivers();
    const vehicles = await fetchVehicles();

    // Sort vehicles by points in descending order
    vehicles.sort((a, b) => b.points - a.points);

    // Create team cards
    vehicles.forEach((vehicle) => {

      console.log(vehicle.pilots)
      const vehiclePilots = drivers.filter(driver => vehicle.pilots.includes(driver.id));
      console.log(vehiclePilots)

      const teamCard = document.createElement('team-card');
      teamCard.setAttribute('team-data', JSON.stringify(vehicle));
      teamCard.setAttribute('drivers-data', JSON.stringify(vehiclePilots));

      cardsContainer.appendChild(teamCard);
    });
  } catch (error) {
    console.error('Error rendering teams:', error);
  }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  renderTeams();
}); 