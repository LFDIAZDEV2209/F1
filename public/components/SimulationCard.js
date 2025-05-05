class SimulationCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const data = {
            id: this.getAttribute("id"),
            name: this.getAttribute("name"),
            description: this.getAttribute("description"),
            imageUrl: this.getAttribute("image-url")
        };

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/css/components/SimulationCard.css">
            <div class="cards-container__card">
                <div class="card__header">
                    <div class="header__title">${data.name}</div>
                </div>
                <div class="card__simulation-info">
                    <div class="simulation-info__description">${data.description}</div>
                </div>
                <div class="card__simulation-image-container">
                    <img src="${data.imageUrl}" class="simulation-image-container__image" alt="${data.name}">
                </div>
            </div>
        `;

        // Agregar evento de clic a la tarjeta
        const card = this.shadowRoot.querySelector('.cards-container__card');
        card.addEventListener('click', () => {
            // Redirigir al juego correspondiente según el ID
            const gameId = parseInt(data.id);
            window.location.href = gameId === 1 ? '/juego' : '/juego2';
        });
    }
}

customElements.define("simulation-card", SimulationCard); 