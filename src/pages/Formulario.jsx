import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../services/api"
import useOpcoes from "../hooks/useOpcoes"
import ChamadoForm from "../components/ChamadoForm.jsx"
import Estado from "../components/Estado.jsx"
import { hoje, mensagemErro } from "../utils/formatar"

const FORM_INICIAL = {
  titulo: "",
  descricao: "",
  tipo: "",
  local: "",
  prioridade: "",
  data_abertura: hoje(),
}

export default function Formulario() {
  const { id } = useParams()
  const editando = Boolean(id)
  const navigate = useNavigate()
  const { opcoes, erro: erroOpcoes } = useOpcoes()

  const [form, setForm] = useState(FORM_INICIAL)
  const [carregando, setCarregando] = useState(editando)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")
  const [resolvido, setResolvido] = useState(false)

  useEffect(() => {
    if (!editando) return

    async function carregar() {
      try {
        const { data } = await api.get(`/chamados/${id}`)
        setResolvido(data.status === "resolvido")
        setForm({
          titulo: data.titulo,
          descricao: data.descricao,
          tipo: data.tipo,
          local: data.local,
          prioridade: data.prioridade,
          data_abertura: data.data_abertura?.slice(0, 10) ?? hoje(),
        })
      } catch (e) {
        setErro(mensagemErro(e))
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [editando, id])

  function alterar(e) {
    setForm((atual) => ({ ...atual, [e.target.name]: e.target.value }))
  }

  async function salvar(e) {
    e.preventDefault()
    setSalvando(true)
    setErro("")
    setSucesso("")
    try {
      const resposta = editando
        ? await api.put(`/chamados/${id}`, form)
        : await api.post("/chamados", form)

      setSucesso(editando ? "Chamado atualizado." : "Chamado aberto.")
      const destino = resposta.data?.id ?? id
      setTimeout(() => navigate(destino ? `/chamado/${destino}` : "/"), 800)
    } catch (err) {
      setErro(mensagemErro(err))
      setSalvando(false)
    }
  }

  const voltarPara = editando ? `/chamado/${id}` : "/"

  return (
    <main className="pagina pagina-estreita">
      <Link to={voltarPara} className="voltar">← Voltar</Link>
      <h1>{editando ? "Editar chamado" : "Abrir chamado"}</h1>

      {carregando && <Estado tipo="carregando">Carregando chamado...</Estado>}

      {!carregando && resolvido && (
        <Estado tipo="erro">Chamados resolvidos não podem ser editados.</Estado>
      )}

      {!carregando && !resolvido && (
        <>
          {erroOpcoes && <p className="aviso aviso-erro" role="alert">{erroOpcoes}</p>}
          <ChamadoForm
            form={form}
            opcoes={opcoes}
            onChange={alterar}
            onSubmit={salvar}
            salvando={salvando}
            erro={erro}
            sucesso={sucesso}
            rotuloBotao={editando ? "Salvar alterações" : "Abrir chamado"}
            voltarPara={voltarPara}
          />
        </>
      )}
    </main>
  )
}
