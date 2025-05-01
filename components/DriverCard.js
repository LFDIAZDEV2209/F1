class DriverCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const data = {
            id: this.getAttribute("id"),
            name: this.getAttribute("name"),
            lastName: this.getAttribute("last-name"),
            points: this.getAttribute("points"),
            team: this.getAttribute("team"),
            imageUrl: this.getAttribute("image-url"),
            driverNumber: this.getAttribute("driver-number"),
            flag: this.getAttribute("flag")
        };
        
        this.shadowRoot.innerHTML = `
         <link rel="stylesheet" href="/css/driver.css">
            <div class="card">
                <div class="card-header">
                    <div class="position">${data.id}</div>
                    <div class="points">${data.points || '0'} PTS</div>
                </div>
                <div class="driver-info">
                    <div class="driver-name-section">
                        <div class="driver-details">
                            <div class="first-name">${data.name}</div>
                            <div class="last-name">${data.lastName}</div>
                        </div>
                        <img src="${data.flag}" class="flag" alt="Bandera">
                    </div>
                    <div class="team">${data.team}</div>
                </div>
                <div class="driver-image-container">
                    <img src="${data.imageUrl}" class="driver-image" alt="${data.name} ${data.lastName}">
                    <div class="driver-number">${data.driverNumber}</div>
                </div>
            </div>
        `;
    }
}

customElements.define("driver-card", DriverCard);