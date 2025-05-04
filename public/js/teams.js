
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
    const teams = await fetchTeams();

    // Sort vehicles by points in descending order
    vehicles.sort((a, b) => b.points - a.points);

    // Create team cards
    teams.forEach((team) => {
      
      const teamPilots = drivers.filter(driver => driver.team === team.id);
      const teamPilotsWithVehicle = teamPilots.map(pilot => {
        const vehicle = vehicles.find(vehicle => vehicle.pilot == pilot.id);
        return {
          ...pilot,
          vehicle: vehicle ? vehicle : null
        };
      });

      const teamCard = document.createElement('team-card');
      teamCard.setAttribute('team-data', JSON.stringify(team));
      teamCard.setAttribute('drivers-data', JSON.stringify(teamPilotsWithVehicle));

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