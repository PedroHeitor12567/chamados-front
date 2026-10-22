import { slug } from "../utils/formatar"

export function Status({ valor }) {
  return <span className={`status status-${slug(valor)}`}>{valor}</span>
}

export function Prioridade({ valor }) {
  return (
    <span className="prioridade">
      <span className={`ponto ponto-${slug(valor)}`} aria-hidden="true" />
      {valor}
    </span>
  )
}
