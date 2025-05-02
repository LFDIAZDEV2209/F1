class AdminDriverCard extends HTMLElement {
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
         <link rel="stylesheet" href="/css/components/AdminDriverCard.css">
            <div class="cards-container__card">
                <div class="card__header">
                    <div class="header__position">${data.id}</div>
                    <div class="header__points">${data.points || '0'} PTS</div>
                </div>
                <div class="card__driver-info">
                    <div class="driver-info__driver-name-section">
                        <div class="driver-name-section__driver-details">
                            <div class="driver-details__first-name">${data.name}</div>
                            <div class="driver-details__last-name">${data.lastName}</div>
                        </div>
                        <img src="${data.flag}" class="driver-name-section__flag" alt="Bandera">
                    </div>
                    <div class="driver-info__team">${data.team}</div>
                </div>
                <div class="card__driver-image-container">
                    <img src="${data.imageUrl}" class="driver-image-container__driver-image" alt="${data.name} ${data.lastName}">
                    <div class="driver-image-container__driver-number">${data.driverNumber}</div>
                </div>
                <div class="card__admin-card-actions">
                    <a href="#" class="admin-card-actions__edit-button primary-button" data-driver-id="${data.id}">Editar</a>
                    <a href="#" class="admin-card-actions__remove-button secondary-button" data-driver-id="${data.id}">Eliminar</a>
                </div>
            </div>
        `;
    }
}

customElements.define("admin-driver-card", AdminDriverCard);