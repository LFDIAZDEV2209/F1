class DeleteTeamModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/css/components/DeleteTeamModal.css">
        <div class="modal" style="display:none">
          <div class="modal-content">
            <h2 class="modal-content__title">Eliminar Equipo</h2>
            <p class="modal-content__confirm-message">¿Estás seguro de que deseas eliminar este equipo?</p>
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
            if (this.teamId) {
                try {
                    const res = await fetch(`/api/teams/${this.teamId}`, {
                        method: "DELETE"
                    });

                    if (!res.ok) throw new Error("Error eliminando equipo");

                    // Si fue exitoso, emite un evento opcional para que otros sepan
                    if (typeof window.renderTeams === "function") {
                        window.renderTeams(); // Recargar la lista si está disponible globalmente
                    }
                } catch (error) {
                    console.error("Error al eliminar el equipo:", error);
                } finally {
                    this.hide();
                }
            }
        });
    }

    show(teamId) {
        this.teamId = teamId;
        this.shadowRoot.querySelector(".modal").classList.add("active");
    }

    hide() {
        this.shadowRoot.querySelector(".modal").classList.remove("active");
        this.teamId = null;
    }
}

customElements.define("delete-team-modal", DeleteTeamModal);