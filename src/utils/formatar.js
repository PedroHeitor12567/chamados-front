// Se a API usar outro texto para o status "em andamento", ajuste aqui.
export const STATUS = ["aberto", "em andamento", "resolvido"]

export function formatarData(data) {
  if (!data) return "—"
  const [ano, mes, dia] = data.slice(0, 10).split("-")
  return `${dia}/${mes}/${ano}`
}

// Data de hoje no formato AAAA-MM-DD (horário local)
export function hoje() {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, "0")
  const dia = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mes}-${dia}`
}

// "em andamento" -> "em-andamento", "média" -> "media" (usado nas classes CSS)
export function slug(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
}

// Aceita lista de textos ou lista de objetos
export function normalizarOpcoes(dados) {
  const itens = Array.isArray(dados) ? dados : dados?.itens ?? []
  return itens.map((item) =>
    typeof item === "string" ? item : item.nome ?? item.valor ?? String(item.id)
  )
}

export function extrairLista(dados) {
  if (Array.isArray(dados)) return dados
  return dados?.chamados ?? dados?.itens ?? dados?.items ?? []
}

export function mensagemErro(erro) {
  const resposta = erro.response
  if (!resposta) return "Não foi possível conectar à API. Verifique sua conexão."
  if (resposta.status === 401) return "Chave inválida. Confira o VITE_API_KEY no arquivo .env."
  const detail = resposta.data?.detail
  if (typeof detail === "string") return detail
  if (Array.isArray(detail)) return detail.map((d) => d.msg).join(". ")
  return `A API respondeu com erro ${resposta.status}.`
}
