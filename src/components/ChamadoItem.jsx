import { Link } from "react-router-dom"
import { Status, Prioridade } from "./Selos.jsx"
import { formatarData, slug } from "../utils/formatar"

export default function ChamadoItem({ chamado }) {
  return (
    <li>
      <Link to={`/chamado/${chamado.id}`} className="chamado">
        <span className={`faixa faixa-${slug(chamado.prioridade)}`} aria-hidden="true" />
        <div className="chamado-corpo">
          <h2>{chamado.titulo}</h2>
          <p className="meta">
            <span>{chamado.tipo}</span>
            <span>{chamado.local}</span>
            <span>Aberto em {formatarData(chamado.data_abertura)}</span>
          </p>
        </div>
        <div className="chamado-selos">
          <Status valor={chamado.status} />
          <Prioridade valor={chamado.prioridade} />
        </div>
      </Link>
    </li>
  )
}
