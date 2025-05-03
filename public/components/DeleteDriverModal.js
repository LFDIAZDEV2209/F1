class DeleteDriverModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/css/components/DeleteDriverModal.css">
        <div class="modal" style="display:none">
          <div class="modal-content">
            <h2 class="modal-content__title">Eliminar Piloto</h2>
            <p class="modal-content__confirm-message">¿Estás seguro de que deseas eliminar este piloto?</p>
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
            if (this.driverId) {
                try {
                    const res = await fetch(`/api/drivers/${this.driverId}`, {
                        method: "DELETE"
                    });

                    if (!res.ok) throw new Error("Error eliminando piloto");

                    // Si fue exitoso, emite un evento opcional para que otros sepan
                    if (typeof window.loadDrivers === "function") {
                        window.loadDrivers(); // Recargar la lista si está disponible globalmente
                    }
                } catch (error) {
                    console.error("Error al eliminar el piloto:", error);
                } finally {
                    this.hide();
                }
            }
        });
    }

    show(driverId) {
        this.driverId = driverId;
        this.shadowRoot.querySelector(".modal").classList.add("active");
    }

    hide() {
        this.shadowRoot.querySelector(".modal").classList.remove("active");
        this.driverId = null;
    }
}

customElements.define("delete-driver-modal", DeleteDriverModal);