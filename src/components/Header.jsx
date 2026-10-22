import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

export default function Header() {
  const [nome, setNome] = useState("")
  const [falhou, setFalhou] = useState(false)

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get("/eu")
        setNome(data.nome ?? data.name ?? "")
      } catch {
        setFalhou(true)
      }
    }
    carregar()
  }, [])

  return (
    <header className="topo">
      <div className="topo-conteudo">
        <Link to="/" className="marca">
          <span className="marca-icone" aria-hidden="true">C</span>
          Conserta
        </Link>
        <span className="usuario">
          {falhou ? "Chave não reconhecida" : nome ? `Olá, ${nome}` : ""}
        </span>
      </div>
    </header>
  )
}
