import { STATUS } from "../utils/formatar"

function Seletor({ rotulo, valor, opcoes, onChange }) {
  return (
    <select aria-label={rotulo} value={valor} onChange={(e) => onChange(e.target.value)}>
      <option value="">{rotulo}</option>
      {opcoes.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  )
}

export default function Filtros({ filtros, opcoes, onChange, onLimpar }) {
  const ativo = Object.values(filtros).some(Boolean)

  return (
    <div className="filtros">
      <input
        type="search"
        className="busca"
        placeholder="Buscar por título ou descrição"
        aria-label="Buscar chamados"
        value={filtros.busca}
        onChange={(e) => onChange("busca", e.target.value)}
      />
      <div className="filtros-selects">
        <Seletor rotulo="Todos os status" valor={filtros.status} opcoes={STATUS} onChange={(v) => onChange("status", v)} />
        <Seletor rotulo="Todos os tipos" valor={filtros.tipo} opcoes={opcoes.tipos} onChange={(v) => onChange("tipo", v)} />
        <Seletor rotulo="Todos os locais" valor={filtros.local} opcoes={opcoes.locais} onChange={(v) => onChange("local", v)} />
        <Seletor rotulo="Todas as prioridades" valor={filtros.prioridade} opcoes={opcoes.prioridades} onChange={(v) => onChange("prioridade", v)} />
        {ativo && (
          <button type="button" className="btn-link" onClick={onLimpar}>
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  )
}
