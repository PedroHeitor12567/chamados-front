// Mensagens de carregando, vazio e erro
export default function Estado({ tipo, children }) {
  return (
    <div
      className={`estado estado-${tipo}`}
      role={tipo === "erro" ? "alert" : "status"}
    >
      {children}
    </div>
  )
}
