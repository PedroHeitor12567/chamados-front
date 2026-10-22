import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Header from "./components/Header.jsx"
import Home from "./pages/Home.jsx"
import Detalhe from "./pages/Detalhe.jsx"
import Formulario from "./pages/Formulario.jsx"

function NaoEncontrada() {
  return (
    <main className="pagina">
      <h1>Página não encontrada</h1>
      <p className="texto-suave">O endereço que você abriu não existe.</p>
      <Link to="/" className="btn">Voltar para a lista</Link>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chamado/:id" element={<Detalhe />} />
        <Route path="/novo" element={<Formulario key="novo" />} />
        <Route path="/editar/:id" element={<Formulario key="editar" />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </BrowserRouter>
  )
}
