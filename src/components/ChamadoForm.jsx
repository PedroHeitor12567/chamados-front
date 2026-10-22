import { Link } from "react-router-dom"

function Campo({ rotulo, id, children }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{rotulo}</label>
      {children}
    </div>
  )
}

function Opcoes({ id, valor, lista, onChange }) {
  return (
    <select id={id} name={id} value={valor} onChange={onChange} required>
      <option value="" disabled>Selecione</option>
      {lista.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  )
}

// Usado tanto para abrir quanto para editar um chamado
export default function ChamadoForm({ form, opcoes, onChange, onSubmit, salvando, erro, sucesso, rotuloBotao, voltarPara }) {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      <Campo rotulo="Título" id="titulo">
        <input id="titulo" name="titulo" value={form.titulo} onChange={onChange} maxLength={120} required />
      </Campo>

      <Campo rotulo="Descrição" id="descricao">
        <textarea id="descricao" name="descricao" rows={4} value={form.descricao} onChange={onChange} required />
      </Campo>

      <div className="campos-linha">
        <Campo rotulo="Tipo" id="tipo">
          <Opcoes id="tipo" valor={form.tipo} lista={opcoes.tipos} onChange={onChange} />
        </Campo>
        <Campo rotulo="Local" id="local">
          <Opcoes id="local" valor={form.local} lista={opcoes.locais} onChange={onChange} />
        </Campo>
        <Campo rotulo="Prioridade" id="prioridade">
          <Opcoes id="prioridade" valor={form.prioridade} lista={opcoes.prioridades} onChange={onChange} />
        </Campo>
      </div>

      <Campo rotulo="Data de abertura" id="data_abertura">
        <input id="data_abertura" name="data_abertura" type="date" value={form.data_abertura} onChange={onChange} required />
      </Campo>

      {erro && <p className="aviso aviso-erro" role="alert">{erro}</p>}
      {sucesso && <p className="aviso aviso-sucesso" role="status">{sucesso}</p>}

      <div className="formulario-acoes">
        <button type="submit" className="btn" disabled={salvando}>
          {salvando ? "Salvando..." : rotuloBotao}
        </button>
        <Link to={voltarPara} className="btn btn-neutro">Cancelar</Link>
      </div>
    </form>
  )
}
