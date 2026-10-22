# Conserta · Front-end de chamados de manutenção

Front-end do Sistema de Chamados de Manutenção do IFRN (Campus Pau dos Ferros), feito em React + Vite e consumindo a API publicada em `https://api-chamados.jefersonqueiroga.com.br`.

## Tela inicial

[Tela inicial](./img.png)

## Funcionalidades

- Nome do dono da chave no topo (`GET /eu`)
- Lista de chamados com busca por texto e filtros por status, tipo, local e prioridade
- Detalhe do chamado em `/chamado/:id`
- Abrir chamado (`/novo`) e editar (`/editar/:id`) com o mesmo formulário; chamados resolvidos não podem ser editados
- Iniciar atendimento (informando o responsável) e resolver (informando a solução), mostrando só a ação do status atual
- Exclusão com confirmação
- Estados de carregando, lista vazia e erros vindos da API

## Tecnologias

React, Vite, React Router e Axios. Sem biblioteca de componentes.

## Como rodar

```bash
npm install
cp .env.example .env   # coloque a sua chave em VITE_API_KEY
npm run dev
```

O arquivo `.env` está no `.gitignore` e não deve ser enviado ao GitHub.

## Estrutura

```
src/
  components/   Header, Filtros, ChamadoItem, ChamadoForm, Selos, Estado, ConfirmarExclusao
  hooks/        useOpcoes (tipos, locais e prioridades)
  pages/        Home, Detalhe, Formulario
  services/     api.js (instância única do Axios)
  utils/        formatar.js (datas, erros e helpers)
```
