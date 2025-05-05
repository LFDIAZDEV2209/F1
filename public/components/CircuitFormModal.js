class CircuitFormModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const style = `<link rel="stylesheet" href="/css/components/CircuitFormModal.css">`;
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
        const addCircuitButton = document.querySelector(".page-content__add-circuits-button");

        addCircuitButton?.addEventListener("click", (e) => {
            e.preventDefault();
            const modal = this.shadowRoot.querySelector(".modal");
            const modalTitle = modal.querySelector('.circuit-form__title');
            const formEl = this.shadowRoot.querySelector("#circuitForm");
            delete formEl.dataset.editId;

            modalTitle.textContent = "Registrar Circuito";

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
                <form class="circuit-form" id="circuitForm">
                    <h2 class="circuit-form__title">Registrar Piloto</h2>

                    <div class="circuit-form__field">
                        <label class="circuit-form__label">Nombre:</label>
                        <input class="circuit-form__input" type="text" name="name" required minlength="3" maxlength="30" />
                    </div>

                    <div class="circuit-form__field">
                        <label class="circuit-form__label">País:</label>
                        <select class="circuit-form__select" name="country" required>
                            <option value="">Selecciona un país</option>
                            ${countries.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="circuit-form__field">
                        <label class="circuit-form__label">Longitud (3km a 300km):</label>
                        <input class="circuit-form__input" type="text" name="length" required />
                    </div>
                    <div class="circuit-form__field">
                        <label class="circuit-form__label">Vueltas (1 a 100):</label>
                        <input class="circuit-form__input" type="text" name="laps" required />
                    </div>
                    <div class="circuit-form__field">
                        <label class="circuit-form__label">Curvas (separadas por coma):</label>
                        <input class="circuit-form__input" type="text" name="curves" placeholder="Ej: 0.7, 1.6, 2.4" required />
                    </div>
                    <div class="circuit-form__field">
                        <label class="circuit-form__label">Descripción:</label>
                        <textarea class="circuit-form__input --textarea" type="text" name="description" required></textarea>
                    </div>

                    <button class="circuit-form__submit primary-button" type="submit">Enviar</button>
                    <div class="circuit-form__error" id="formError"></div>
                </form>
            </div>
        </div>
    `;

        this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.split('<div class="modal"')[0] + form;

        const modalEl = this.shadowRoot.querySelector('.modal');
        const formEl = this.shadowRoot.querySelector("#circuitForm");
        const errorEl = this.shadowRoot.querySelector("#formError");

        formEl.addEventListener("submit", async (e) => {
            e.preventDefault();
            errorEl.textContent = "";

            const formData = new FormData(formEl);
            const name = formData.get("name").trim();
            const country = parseInt(formData.get("country"));
            const lengthKm = Number(parseFloat(formData.get("length")).toFixed(2));
            const laps = parseInt(formData.get("laps"));
            const curvesRaw = formData.get("curves").trim();
            const curves = curvesRaw
                .split(",")
                .map(s => parseFloat(s.trim()))
                .filter(n => !isNaN(n));
            const description = formData.get("description").trim();

            const isCountryValid = countries.some(c => c.id === country);

            if (name.length < 3 || name.length > 30) {
                errorEl.textContent = "El nombre debe tener entre 3 y 30 caracteres.";
                return;
            }

            if (!isCountryValid) {
                errorEl.textContent = "Por favor selecciona un país válido.";
                return;
            }
            if (isNaN(lengthKm)
                || lengthKm < 3
                || lengthKm > 300) {
                errorEl.textContent = "La longitud del circuito debe ser un número entre 3 y 300";
                return;
            }
            if (!Number.isInteger(laps) || laps < 1 || laps > 100) {
                errorEl.textContent = "Las vueltas deben ser un número entre 1 y 100";
                return;
            }

            if (curves.length === 0) {
                errorEl.textContent = "Debes ingresar al menos una curva válida (números separados por coma).";
                return;
            }

            if (description.length < 10 && description.length > 77) {
                errorEl.textContent = "La descripción debe contener entre 10 y 77 caracteres";
                return;
            }


            const editId = formEl.dataset.editId;
            if (editId) {
                const circuitPayload = {
                    name,
                    country,
                    lengthKm,
                    laps,
                    curves,
                    description
                }
                // Modo edición: PUT
                await fetch(`/api/circuits/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(circuitPayload)
                });
                delete formEl.dataset.editId;
            } else {
                const newCircuit = {
                    name,
                    country,
                    lengthKm,
                    laps,
                    curves,
                    description,
                    imageUrl: '/img/circuits/default.webp',
                };
                // Enviar la data como JSON al servidor
                fetch('/api/circuits', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCircuit)
                });
            }
            formEl.reset();
            modalEl.classList.remove('active');
            if (typeof window.loadCircuits === "function") {
                window.loadCircuits(); // Recargar la lista si está disponible globalmente
            }
        });
    }
}

customElements.define("circuit-form-modal", CircuitFormModal);
