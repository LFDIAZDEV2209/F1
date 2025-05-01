class TeamCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          position: relative;
          border: 2px solid #ccc;
          border-radius: 10px;
          padding: 1rem;
          margin: 1rem;
          background: #fff;
        }
        .position {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 2rem;
          font-weight: bold;
          color: black;
        }
      </style>
      <div class="card">
        <div class="position">${this.getAttribute("position")}</div>
        <h2>${this.getAttribute("name")}</h2>
        <p>Points: ${this.getAttribute("points")}</p>
        <p>Drivers: ${this.getAttribute("driver1")} & ${this.getAttribute("driver2")}</p>
      </div>
    `;
  }
}

customElements.define("team-card", TeamCard);
