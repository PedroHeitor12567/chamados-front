import { useEffect, useState } from "react"
import api from "../services/api"
import { normalizarOpcoes, mensagemErro } from "../utils/formatar"

// Carrega as listas usadas nos campos de seleção
export default function useOpcoes() {
  const [opcoes, setOpcoes] = useState({ tipos: [], locais: [], prioridades: [] })
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function carregar() {
      try {
        const [tipos, locais, prioridades] = await Promise.all([
          api.get("/tipos"),
          api.get("/locais"),
          api.get("/prioridades"),
        ])
        setOpcoes({
          tipos: normalizarOpcoes(tipos.data),
          locais: normalizarOpcoes(locais.data),
          prioridades: normalizarOpcoes(prioridades.data),
        })
      } catch (e) {
        setErro(mensagemErro(e))
      }
    }
    carregar()
  }, [])

  return { opcoes, erro }
}
