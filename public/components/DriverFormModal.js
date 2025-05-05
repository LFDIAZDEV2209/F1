class DriverFormModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const style = `<link rel="stylesheet" href="/css/components/DriverFormModal.css">`;
        this.shadowRoot.innerHTML = `${style}<div class="modal"><p class="modal__loading">Cargando datos...</p></div>`;

        try {
            const [countriesRes, teamsRes, driversRes] = await Promise.all([
                fetch("/api/countries"),
                fetch("/api/teams"),
                fetch("/api/drivers"),
            ]);

            const countries = await countriesRes.json();
            const teams = await teamsRes.json();
            const drivers = await driversRes.json();

            // Contar cuántos pilotos tiene cada equipo
            const teamPilotCount = {};

            drivers.forEach(driver => {
                const teamId = driver.team;
                teamPilotCount[teamId] = (teamPilotCount[teamId] || 0) + 1;
            });

            // Filtrar solo los equipos con menos de 2 pilotos
            const availableTeams = teams.filter(team => (teamPilotCount[team.id] || 0) < 2);

            this.renderForm(countries, availableTeams);
        } catch (error) {
            this.shadowRoot.innerHTML = `${style}<div class="modal"><p class="modal__error">Error cargando datos</p></div>`;
            console.error("Error al cargar JSON:", error);
        }

        this.setupTriggers();
    }

    setupTriggers() {
        const addDriverButton = document.querySelector(".page-content__add-driver-button");

        addDriverButton?.addEventListener("click", (e) => {
            e.preventDefault();
            const modal = this.shadowRoot.querySelector(".modal");
            const modalTitle = modal.querySelector('.driver-form__title');
            const formEl = this.shadowRoot.querySelector("#driverForm");
            delete formEl.dataset.editId;

            modalTitle.textContent = "Registrar Piloto";

            modal?.classList.add("active");
        });

        this.shadowRoot.addEventListener("click", (e) => {
            const modal = this.shadowRoot.querySelector(".modal");
            const content = this.shadowRoot.querySelector(".modal__content");

            // Si se hace clic fuera del contenido (overlay), cierra
            if (modal && content && !content.contains(e.target)) {
                modal.classList.remove("active");
            }
        });

        // Cerrar con tecla ESC
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                const modal = this.shadowRoot.querySelector(".modal");
                modal?.classList.remove("active");
            }
        });
    }

    renderForm(countries, teams) {
        const form = `
        <div class="modal" style="display: none">
            <div class="modal__content">
                <form class="driver-form" id="driverForm">
                    <h2 class="driver-form__title">Registrar Piloto</h2>

                    <div class="driver-form__field">
                        <label class="driver-form__label">Nombre:</label>
                        <input class="driver-form__input" type="text" name="name" required minlength="3" maxlength="15" />
                    </div>

                    <div class="driver-form__field">
                        <label class="driver-form__label">Apellido:</label>
                        <input class="driver-form__input" type="text" name="lastName" required minlength="3" maxlength="15" />
                    </div>

                    <div class="driver-form__field">
                        <label class="driver-form__label">Número del piloto:</label>
                        <input class="driver-form__input" type="text" name="driverNumber" required />
                    </div>

                    <div class="driver-form__field">
                        <label class="driver-form__label">Puntos:</label>
                        <input class="driver-form__input" type="text" name="points" required />
                    </div>

                    <div class="driver-form__field">
                        <label class="driver-form__label">País:</label>
                        <select class="driver-form__select" name="country" required>
                            <option value="">Selecciona un país</option>
                            ${countries.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                        </select>
                    </div>

                    <div class="driver-form__field">
                        <label class="driver-form__label">Equipo:</label>
                        <select class="driver-form__select" name="team" required>
                            <option value="">Selecciona un equipo</option>
                            ${teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                        </select>
                    </div>

                    <button class="driver-form__submit primary-button" type="submit">Enviar</button>
                    <div class="driver-form__error" id="formError"></div>
                </form>
            </div>
        </div>
    `;

        this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.split('<div class="modal"')[0] + form;

        const modalEl = this.shadowRoot.querySelector('.modal');
        const formEl = this.shadowRoot.querySelector("#driverForm");
        const errorEl = this.shadowRoot.querySelector("#formError");

        formEl.addEventListener("submit", async (e) => {
            e.preventDefault();
            errorEl.textContent = "";

            const formData = new FormData(formEl);
            const name = formData.get("name").trim();
            const lastName = formData.get("lastName").trim();
            const driverNumber = parseInt(formData.get("driverNumber"));
            const points = parseInt(formData.get("points"));
            const country = parseInt(formData.get("country"));
            const team = parseInt(formData.get("team"));

            const isCountryValid = countries.some(c => c.id === country);
            const isTeamValid = teams.some(t => t.id === team);

            if (name.length < 3 || name.length > 15) {
                errorEl.textContent = "El nombre debe tener entre 3 y 15 caracteres.";
                return;
            }

            if (lastName.length < 3 || lastName.length > 15) {
                errorEl.textContent = "El apellido debe tener entre 3 y 15 caracteres.";
                return;
            }

            if (!Number.isInteger(driverNumber) || driverNumber < 1 || driverNumber > 200) {
                errorEl.textContent = "El número del piloto debe ser un número entero entre 1 y 200.";
                return;
            }

            if (!Number.isInteger(points) || points < 1 || points > 200) {
                errorEl.textContent = "Los puntos deben ser un número entero entre 1 y 200.";
                return;
            }

            if (!isCountryValid) {
                errorEl.textContent = "Por favor selecciona un país válido.";
                return;
            }

            if (!isTeamValid) {
                errorEl.textContent = "Por favor selecciona un equipo válido.";
                return;
            }

            const editId = formEl.dataset.editId;
            if (editId) {
                const driverPayload = {
                    name,
                    lastName,
                    team,
                    driverNumber,
                    country,
                    points,
                }
                // Modo edición: PUT
                await fetch(`/api/drivers/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(driverPayload)
                });
                delete formEl.dataset.editId;
            } else {
                const newDriver = {
                    name,
                    lastName,
                    imageUrl: '/img/drivers/default.png',
                    team,
                    driverNumber,
                    country,
                    points
                };
                // Enviar la data como JSON al servidor
                await fetch('/api/drivers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newDriver)
                });
            }
            formEl.reset();
            modalEl.classList.remove('active');
            if (typeof window.loadDrivers === "function") {
                window.loadDrivers(); // Recargar la lista si está disponible globalmente
            }
        });
    }
}

customElements.define("driver-form-modal", DriverFormModal);
