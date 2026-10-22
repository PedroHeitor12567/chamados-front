import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import useOpcoes from "../hooks/useOpcoes"
import Filtros from "../components/Filtros.jsx"
import ChamadoItem from "../components/ChamadoItem.jsx"
import Estado from "../components/Estado.jsx"
import { extrairLista, mensagemErro } from "../utils/formatar"

const FILTROS_VAZIOS = { busca: "", status: "", tipo: "", local: "", prioridade: "" }

export default function Home() {
  const [filtros, setFiltros] = useState(FILTROS_VAZIOS)
  const [chamados, setChamados] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")
  const { opcoes } = useOpcoes()

  useEffect(() => {
    let ativo = true

    // Pequena espera para não chamar a API a cada letra digitada
    const timer = setTimeout(async () => {
      setCarregando(true)
      setErro("")
      try {
        const params = {}
        Object.entries(filtros).forEach(([campo, valor]) => {
          if (valor) params[campo] = valor
        })
        const { data } = await api.get("/chamados", { params })
        if (ativo) setChamados(extrairLista(data))
      } catch (e) {
        if (ativo) {
          setChamados([])
          setErro(mensagemErro(e))
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }, 300)

    return () => {
      ativo = false
      clearTimeout(timer)
    }
  }, [filtros])

  function alterarFiltro(campo, valor) {
    setFiltros((atual) => ({ ...atual, [campo]: valor }))
  }

  return (
    <main className="pagina">
      <div className="pagina-topo">
        <div>
          <h1>Chamados</h1>
          {!carregando && !erro && (
            <p className="texto-suave">
              {chamados.length} {chamados.length === 1 ? "chamado" : "chamados"}
            </p>
          )}
        </div>
        <Link to="/novo" className="btn">+ Abrir chamado</Link>
      </div>

      <Filtros
        filtros={filtros}
        opcoes={opcoes}
        onChange={alterarFiltro}
        onLimpar={() => setFiltros(FILTROS_VAZIOS)}
      />

      {carregando && <Estado tipo="carregando">Carregando chamados...</Estado>}
      {!carregando && erro && (
        <Estado tipo="erro">Não foi possível carregar. {erro}</Estado>
      )}
      {!carregando && !erro && chamados.length === 0 && (
        <Estado tipo="vazio">Nenhum chamado encontrado.</Estado>
      )}
      {!carregando && !erro && chamados.length > 0 && (
        <ul className="lista">
          {chamados.map((c) => (
            <ChamadoItem key={c.id} chamado={c} />
          ))}
        </ul>
      )}
    </main>
  )
}
