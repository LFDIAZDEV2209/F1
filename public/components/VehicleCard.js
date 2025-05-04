class vehicleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const data = {
            id: this.getAttribute("id"),
            name: this.getAttribute("name"),
            imageUrl: this.getAttribute("image-url"),
            powerUnit: this.getAttribute("power-unit"),
            chassis: this.getAttribute("chassis"),
            pilot: this.getAttribute("pilot"),
            team: this.getAttribute("team"),
            speedMax: this.getAttribute("speed-max"),
            acceleration: this.getAttribute("acceleration"),
            fuelConsumption: this.getAttribute("fuel-consumption"),
            tireWear: this.getAttribute("tire-wear"),
        };

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/css/components/VehicleCard.css">
            <div class="vehicle-card">
                <div class="vehicle-card__header">
                    <h2 class="vehicle-card__name">${data.name}</h2>
                    <span class="vehicle-card__pilot">${data.pilot}</span>
                    <span class="vehicle-card__team">${data.team}</span>
                </div>
                
                <div class="vehicle-card__image-container">
                    <img src="${data.imageUrl}" alt="${data.name}" class="vehicle-card__image">
                </div>
                
                <div class="vehicle-card__details">
                    <div class="vehicle-card__detail">
                        <span class="vehicle-card__label">Velocidad Máx.:</span>
                        <span class="vehicle-card__value">${data.speedMax} km/h</span>
                    </div>
                    <div class="vehicle-card__detail">
                        <span class="vehicle-card__label">Aceleración:</span>
                        <span class="vehicle-card__value">${data.acceleration} s</span>
                    </div>
                    <div class="vehicle-card__detail">
                        <span class="vehicle-card__label">Consumo de Combustible:</span>
                        <span class="vehicle-card__value">${data.fuelConsumption} L/km</span>
                    </div>
                    <div class="vehicle-card__detail">
                        <span class="vehicle-card__label">Desgaste de Llantas:</span>
                        <span class="vehicle-card__value">${data.tireWear} %</span>
                    </div>
                </div>
                <button class="compare-btn">Comparar</button>
            </div>
        `;
        this.shadowRoot.querySelector('.compare-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('compare', { 
                detail: data, 
                bubbles: true, 
                composed: true 
            }));
        });
    }
}

customElements.define("vehicle-card", vehicleCard);
