import { useEffect } from "react"

export default function ConfirmarExclusao({ onConfirmar, onCancelar, excluindo }) {
  useEffect(() => {
    function aoPressionar(e) {
      if (e.key === "Escape") onCancelar()
    }
    window.addEventListener("keydown", aoPressionar)
    return () => window.removeEventListener("keydown", aoPressionar)
  }, [onCancelar])

  return (
    <div className="fundo-modal" onClick={onCancelar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="titulo-modal">Excluir chamado</h2>
        <p>Tem certeza que deseja excluir este chamado? Essa ação não pode ser desfeita.</p>
        <div className="modal-acoes">
          <button type="button" className="btn btn-perigo" onClick={onConfirmar} disabled={excluindo}>
            {excluindo ? "Excluindo..." : "Excluir"}
          </button>
          <button type="button" className="btn btn-neutro" onClick={onCancelar} autoFocus>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
