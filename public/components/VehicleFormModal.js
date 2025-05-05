class VehicleFormModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const style = `<link rel="stylesheet" href="/css/components/VehicleFormModal.css">`;
        this.shadowRoot.innerHTML = `${style}<div class="modal"><p class="modal__loading">Cargando datos...</p></div>`;

        try {
            const [powerUnitsRes, driversRes] = await Promise.all([
                fetch("/api/power-unit"),
                fetch("/api/drivers"),
            ]);

            const powerUnits = await powerUnitsRes.json();
            const drivers = await driversRes.json();

            this.renderForm(powerUnits, drivers);
        } catch (error) {
            this.shadowRoot.innerHTML = `${style}<div class="modal"><p class="modal__error">Error cargando datos</p></div>`;
            console.error("Error al cargar JSON:", error);
        }

        this.setupTriggers();
    }

    setupTriggers() {
        const addVehicleButton = document.querySelector(".page-content__add-vehicle-button");

        addVehicleButton?.addEventListener("click", (e) => {
            e.preventDefault();
            const modal = this.shadowRoot.querySelector(".modal");
            const modalTitle = modal.querySelector('.vehicle-form__title');
            const formEl = this.shadowRoot.querySelector("#vehicleForm");
            delete formEl.dataset.editId;
            
            modalTitle.textContent = "Registrar Vehículo";

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

    renderForm(powerUnits, drivers) {
        const form = `
        <div class="modal" style="display: none">
            <div class="modal__content">
                <form class="vehicle-form" id="vehicleForm">
                    <h2 class="vehicle-form__title">Registrar Vehículo</h2>

                    <div class="vehicle-form__field">
                        <label class="vehicle-form__label">Nombre:</label>
                        <input class="vehicle-form__input" type="text" name="name" required minlength="3" maxlength="15" />
                    </div>

                    <div class="vehicle-form__field">
                        <label class="vehicle-form__label">Motor:</label>
                        <select class="vehicle-form__select" name="power-unit" required>
                            <option value="">Selecciona un motor</option>
                            ${powerUnits.map(powerUnit => `<option value="${powerUnit.id}">${powerUnit.name}</option>`).join('')}
                        </select>
                    </div>

                    <div class="vehicle-form__field">
                        <label class="vehicle-form__label">Chasis:</label>
                        <input class="vehicle-form__input" type="text" name="chassis" required />
                    </div>

                    <div class="vehicle-form__field">
                        <label class="vehicle-form__label">Piloto:</label>
                        <select class="vehicle-form__select" name="pilot" required>
                            <option value="">Selecciona un piloto</option>
                            ${drivers.map(driver => `<option value="${driver.id}">${driver.name}</option>`).join('')}
                        </select>
                    </div>

                    <div class="vehicle-form__field">
                        <label class="vehicle-form__label">Velocidad máxima (320-365 km/h):</label>
                        <input class="vehicle-form__input" type="text" name="speed-max" required />
                    </div>

                    <div class="vehicle-form__field">
                        <label class="vehicle-form__label">Aceleración (2.0-3.0 m/s2):</label>
                        <input class="vehicle-form__input" type="text" name="acceleration" required />
                    </div>

                    <div class="vehicle-form__field">
                        <label class="vehicle-form__label">Consumo de combustible (2.0-3.0 L/km):</label>
                        <input class="vehicle-form__input" type="text" name="fuel-consumption" required />
                    </div>

                    <div class="vehicle-form__field">
                        <label class="vehicle-form__label">Desgaste de neumáticos (1.0-2.0 %):</label>
                        <input class="vehicle-form__input" type="text" name="tire-wear" required />
                    </div>

                    <button class="vehicle-form__submit primary-button" type="submit">Enviar</button>
                    <div class="vehicle-form__error" id="formError"></div>
                </form>
            </div>
        </div>
    `;

        this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.split('<div class="modal"')[0] + form;

        const modalEl = this.shadowRoot.querySelector('.modal');
        const formEl = this.shadowRoot.querySelector("#vehicleForm");
        const errorEl = this.shadowRoot.querySelector("#formError");

        formEl.addEventListener("submit", async (e) => {
            e.preventDefault();
            errorEl.textContent = "";

            const formData = new FormData(formEl);
            const name = formData.get("name").trim();
            const powerUnit = parseInt(formData.get("power-unit"));
            const chassis = formData.get("chassis").trim().toUpperCase();
            const pilot = parseInt(formData.get("pilot"));
            const speedMax = parseInt(formData.get("speed-max"));
            const acceleration = Number(parseFloat(formData.get("acceleration")).toFixed(2));
            const fuelConsumption = Number(parseFloat(formData.get("fuel-consumption")).toFixed(2));
            const tireWear = Number(parseFloat(formData.get("tire-wear")).toFixed(2));

            const isPowerUnitValid = powerUnits.some(pUnit => pUnit.id === powerUnit);
            const isDriverValid = drivers.some(driver => driver.id === pilot);

            if (name.length < 3 || name.length > 15) {
                errorEl.textContent = "El nombre debe tener entre 3 y 15 caracteres.";
                return;
            }

            if (!isPowerUnitValid) {
                errorEl.textContent = "Por favor selecciona un motor válido.";
                return;
            }

            if (chassis.length < 2 || chassis.length > 7) {
                errorEl.textContent = "El nombre debe tener entre 2 y 7 caracteres.";
                return;
            }

            if (!isDriverValid) {
                errorEl.textContent = "Por favor selecciona un piloto válido.";
                return;
            }

            if (!Number.isInteger(speedMax) || speedMax < 320 || speedMax > 365) {
                errorEl.textContent = "La velocidad máxima debe ser un número entero entre 320 y 365.";
                return;
            }

            if (isNaN(acceleration)
                || acceleration < 2 
                || acceleration > 3) {
                errorEl.textContent = "La aceleración debe ser un número decimal entre 2 y 3.";
                console.log(acceleration);
                console.log(typeof acceleration)
                return;
            }

            if (isNaN(fuelConsumption)
                || fuelConsumption < 2 
                || fuelConsumption > 3) {
                    errorEl.textContent = "El consumo de combustible debe ser un número decimal entre 2 y 3.";
                return;
            }

            if (isNaN(tireWear)
                || tireWear < 1 
                || tireWear > 2) {
                    errorEl.textContent = "El desgaste de neumáticos debe ser un número decimal entre 1 y 2.";
                return;
            }

            const editId = formEl.dataset.editId;
            if (editId) {
                const vehiclePayload = {
                    name,
                    powerUnit,
                    chassis,
                    pilot,
                    performanceSpecifications: {
                        speedMax,
                        acceleration,
                        fuelConsumption,
                        tireWear
                    }
                }
                // Modo edición: PUT
                await fetch(`/api/vehicles/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(vehiclePayload)
                });
                delete formEl.dataset.editId;
            } else {
                const newVehicle = {
                    name,
                    imageUrl: "/img/vehicles/default.jpg",
                    powerUnit,
                    chassis,
                    pilot,
                    performanceSpecifications: {
                        speedMax,
                        acceleration,
                        fuelConsumption,
                        tireWear
                    }
                };
                // Enviar la data como JSON al servidor
                await fetch('/api/vehicles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newVehicle)
                });
            }
            formEl.reset();
            modalEl.classList.remove('active');
            if (typeof window.loadVehicles === "function") {
                window.loadVehicles(); // Recargar la lista si está disponible globalmente
            }
        });
    }
}

customElements.define("vehicle-form-modal", VehicleFormModal);
