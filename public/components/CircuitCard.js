class CircuitCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const data = {
            name: this.getAttribute("name"),
            country: this.getAttribute("country"),
            lengthKm: this.getAttribute("length"),
            laps: this.getAttribute("laps"),
            curves: this.getAttribute("curves"),
            description: this.getAttribute("description"),
            imageUrl: this.getAttribute("image-url"),
        };

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/css/components/CircuitCard.css">
            <div class="circuit-card">
                <div class="circuit-card__header">
                    <div class="circuit-card__name">${data.name}</div>
                    <p>${data.country}</p>
                </div>
                <div class="circuit-card__image-container">
                    <img src="${data.imageUrl}" alt="${data.name}">
                </div>
                <div class="circuit-card__description">${data.description}</div>
                <div class="circuit-card__details">
                    <div>Laps: ${data.laps}</div>
                    <div>Length: ${data.lengthKm} km</div>
                    <div>Curves: ${data.curves}</div>
                </div>
            </div>
        `;
    }
}

customElements.define("circuit-card", CircuitCard);