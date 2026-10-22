import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../services/api"
import Estado from "../components/Estado.jsx"
import ConfirmarExclusao from "../components/ConfirmarExclusao.jsx"
import { Status, Prioridade } from "../components/Selos.jsx"
import { formatarData, mensagemErro } from "../utils/formatar"

export default function Detalhe() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [chamado, setChamado] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  const [responsavel, setResponsavel] = useState("")
  const [solucao, setSolucao] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [erroAcao, setErroAcao] = useState("")
  const [confirmando, setConfirmando] = useState(false)

  const carregar = useCallback(async () => {
    try {
      const { data } = await api.get(`/chamados/${id}`)
      setChamado(data)
      setErro("")
    } catch (e) {
      setErro(mensagemErro(e))
    } finally {
      setCarregando(false)
    }
  }, [id])

  useEffect(() => {
    carregar()
  }, [carregar])

  async function iniciar(e) {
    e.preventDefault()
    setEnviando(true)
    setErroAcao("")
    try {
      await api.patch(`/chamados/${id}/iniciar`, { responsavel })
      setResponsavel("")
      await carregar()
    } catch (err) {
      setErroAcao(mensagemErro(err))
    } finally {
      setEnviando(false)
    }
  }

  async function resolver(e) {
    e.preventDefault()
    setEnviando(true)
    setErroAcao("")
    try {
      await api.patch(`/chamados/${id}/resolver`, { solucao })
      setSolucao("")
      await carregar()
    } catch (err) {
      setErroAcao(mensagemErro(err))
    } finally {
      setEnviando(false)
    }
  }

  async function excluir() {
    setEnviando(true)
    try {
      await api.delete(`/chamados/${id}`)
      navigate("/")
    } catch (err) {
      setConfirmando(false)
      setEnviando(false)
      setErroAcao(mensagemErro(err))
    }
  }

  if (carregando) {
    return (
      <main className="pagina">
        <Estado tipo="carregando">Carregando chamado...</Estado>
      </main>
    )
  }

  if (erro) {
    return (
      <main className="pagina">
        <Link to="/" className="voltar">← Voltar</Link>
        <Estado tipo="erro">Não foi possível carregar. {erro}</Estado>
      </main>
    )
  }

  const resolvido = chamado.status === "resolvido"
  const aberto = chamado.status === "aberto"

  return (
    <main className="pagina pagina-estreita">
      <Link to="/" className="voltar">← Voltar</Link>

      <div className="detalhe-topo">
        <h1>{chamado.titulo}</h1>
        <div className="selos">
          <Status valor={chamado.status} />
          <Prioridade valor={chamado.prioridade} />
        </div>
      </div>

      <section className="painel">
        <dl className="campos">
          <div className="campo-cheio">
            <dt>Descrição</dt>
            <dd>{chamado.descricao}</dd>
          </div>
          <div>
            <dt>Tipo</dt>
            <dd>{chamado.tipo}</dd>
          </div>
          <div>
            <dt>Local</dt>
            <dd>{chamado.local}</dd>
          </div>
          <div>
            <dt>Aberto em</dt>
            <dd>{formatarData(chamado.data_abertura)}</dd>
          </div>
          <div>
            <dt>Responsável</dt>
            <dd>{chamado.responsavel || "—"}</dd>
          </div>
          <div className="campo-cheio">
            <dt>Solução</dt>
            <dd>{chamado.solucao || "—"}</dd>
          </div>
          {resolvido && (
            <div>
              <dt>Resolvido em</dt>
              <dd>{formatarData(chamado.data_resolucao)}</dd>
            </div>
          )}
        </dl>

        <div className="painel-acoes">
          {!resolvido && (
            <Link to={`/editar/${chamado.id}`} className="btn btn-neutro">Editar</Link>
          )}
          <button type="button" className="btn btn-perigo-suave" onClick={() => setConfirmando(true)}>
            Excluir
          </button>
        </div>
      </section>

      {!resolvido && (
        <section className="painel etapa">
          <h2>Próxima etapa</h2>
          {aberto ? (
            <form onSubmit={iniciar}>
              <label htmlFor="responsavel">Responsável pelo atendimento</label>
              <input
                id="responsavel"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                placeholder="Nome de quem vai atender"
                required
              />
              <button type="submit" className="btn" disabled={enviando}>
                {enviando ? "Enviando..." : "Iniciar atendimento"}
              </button>
            </form>
          ) : (
            <form onSubmit={resolver}>
              <label htmlFor="solucao">Solução aplicada</label>
              <textarea
                id="solucao"
                rows={3}
                value={solucao}
                onChange={(e) => setSolucao(e.target.value)}
                placeholder="Descreva o que foi feito"
                required
              />
              <button type="submit" className="btn" disabled={enviando}>
                {enviando ? "Enviando..." : "Resolver chamado"}
              </button>
            </form>
          )}
        </section>
      )}

      {erroAcao && <p className="aviso aviso-erro" role="alert">{erroAcao}</p>}

      {confirmando && (
        <ConfirmarExclusao
          excluindo={enviando}
          onConfirmar={excluir}
          onCancelar={() => setConfirmando(false)}
        />
      )}
    </main>
  )
}
