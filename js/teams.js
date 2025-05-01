const container = document.getElementById("cards-container");

const teams = [
  {
    name: "Red Bull Racing",
    points: "540",
    position: "1",
    driver1: "Max Verstappen",
    driver2: "Sergio Pérez"
  },
  {
    name: "Ferrari",
    points: "420",
    position: "2",
    driver1: "Charles Leclerc",
    driver2: "Carlos Sainz"
  }
];

teams.forEach((team) => {
  const card = document.createElement("team-card");
  card.setAttribute("name", team.name);
  card.setAttribute("points", team.points);
  card.setAttribute("position", team.position);
  card.setAttribute("driver1", team.driver1);
  card.setAttribute("driver2", team.driver2);
  container.appendChild(card);
});
