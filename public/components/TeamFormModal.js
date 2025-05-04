class TeamFormModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const style = `<link rel="stylesheet" href="/css/components/TeamFormModal.css">`;
        this.shadowRoot.innerHTML = `${style}<div class="modal"><p class="modal__loading">Cargando datos...</p></div>`;

        try {
            const [countriesRes] = await Promise.all([
                fetch("/api/countries"),
            ]);

            const countries = await countriesRes.json();

            this.renderForm(countries);
        } catch (error) {
            this.shadowRoot.innerHTML = `${style}<div class="modal"><p class="modal__error">Error cargando datos</p></div>`;
            console.error("Error al cargar JSON:", error);
        }

        this.setupTriggers();
    }

    setupTriggers() {
        const addTeamButton = document.querySelector(".page-content__add-team-button");

        addTeamButton?.addEventListener("click", (e) => {
            e.preventDefault();
            const modal = this.shadowRoot.querySelector(".modal");
            const modalTitle = modal.querySelector('.team-form__title');
            const formEl = this.shadowRoot.querySelector("#teamForm");
            delete formEl.dataset.editId;

            modalTitle.textContent = "Registrar Equipo";

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

    renderForm(countries) {
        const form = `
        <div class="modal" style="display: none">
            <div class="modal__content">
                <form class="team-form" id="teamForm">
                    <h2 class="team-form__title">Registrar Equipo</h2>

                    <div class="team-form__field">
                        <label class="team-form__label">Nombre:</label>
                        <input class="team-form__input" type="text" name="name" required minlength="3" maxlength="25" />
                    </div>

                    <div class="team-form__field">
                        <label class="team-form__label">País:</label>
                        <select class="team-form__select" name="country" required>
                            <option value="">Selecciona un país</option>
                            ${countries.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="team-form__field">
                        <label class="team-form__label" for="color">Color del equipo:</label>
                        <input class="team-form__input --input-color" type="color" name="color" id="color" value="#000000" required />
                    </div>
                    <button class="team-form__submit primary-button" type="submit">Enviar</button>
                    <div class="team-form__error" id="formError"></div>
                </form>
            </div>
        </div>
    `;

        this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.split('<div class="modal"')[0] + form;

        const modalEl = this.shadowRoot.querySelector('.modal');
        const formEl = this.shadowRoot.querySelector("#teamForm");
        const errorEl = this.shadowRoot.querySelector("#formError");

        formEl.addEventListener("submit", async (e) => {
            e.preventDefault();
            errorEl.textContent = "";

            const formData = new FormData(formEl);
            const name = formData.get("name").trim();
            const country = parseInt(formData.get("country"));
            const color = formData.get("color");

            const isCountryValid = countries.some(c => c.id === country);

            if (name.length < 3 || name.length > 25) {
                errorEl.textContent = "El nombre debe tener entre 3 y 25 caracteres.";
                return;
            }

            if (!isCountryValid) {
                errorEl.textContent = "Por favor selecciona un país válido.";
                return;
            }

            const editId = formEl.dataset.editId;
            if (editId) {
                const teamPayload = {
                    name,
                    country,
                    color,
                }
                // Modo edición: PUT
                await fetch(`/api/teams/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(teamPayload)
                });
                delete formEl.dataset.editId;
            } else {
                const newTeam = {
                    name,
                    imageUrl: '/img/teams/default-logo.jpg',
                    country,
                    color
                };
                // Enviar la data como JSON al servidor
                await fetch('/api/teams', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTeam)
                });
            }
            formEl.reset();
            modalEl.classList.remove('active');
            if (typeof window.renderTeams === "function") {
                window.renderTeams(); // Recargar la lista si está disponible globalmente
            } else {
                console.log("no hay render teams")
            }
        });
    }
}

customElements.define("team-form-modal", TeamFormModal);
