class DeleteVehicleModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/css/components/DeleteVehicleModal.css">
        <div class="modal" style="display:none">
          <div class="modal-content">
            <h2 class="modal-content__title">Eliminar Vehículo</h2>
            <p class="modal-content__confirm-message">¿Estás seguro de que deseas eliminar este vehículo?</p>
            <div class="modal-content__action-container">
                <button id="cancel" class="modal-content__cancel-button secondary-button">Cancelar</button>
                <button id="confirm" class="modal-content__confirm-button primary-button">Eliminar</button>
            </div>
          </div>
        </div>
      `;

        this.shadowRoot.querySelector("#cancel").addEventListener("click", () => {
            this.hide();
        });

        this.shadowRoot.querySelector("#confirm").addEventListener("click", async () => {
            console.log(this.vehicleId);
            if (this.vehicleId) {
                try {
                    const res = await fetch(`/api/vehicles/${this.vehicleId}`, {
                        method: "DELETE"
                    });

                    if (!res.ok) throw new Error("Error eliminando vehículo");

                    // Si fue exitoso, emite un evento opcional para que otros sepan
                    if (typeof window.loadVehicles === "function") {
                        window.loadVehicles(); // Recargar la lista si está disponible globalmente
                    }
                } catch (error) {
                    console.error("Error al eliminar el vehículo:", error);
                } finally {
                    this.hide();
                }
            }
        });
    }

    show(vehicleId) {
        this.vehicleId = vehicleId;
        this.shadowRoot.querySelector(".modal").classList.add("active");
    }

    hide() {
        this.shadowRoot.querySelector(".modal").classList.remove("active");
        this.vehicleId = null;
    }
}

customElements.define("delete-vehicle-modal", DeleteVehicleModal);