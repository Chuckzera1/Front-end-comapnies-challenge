## Main Technologies:

# React + TypeScript + Vite

# Env variables:

- `VITE_BASE_API_URL` -> api Url -> Default `http://localhost:8080/api`
- `VITE_CEP_LA_URL` -> CEP validator Url -> Default `http://cep.la`

# To run the web app:

## Must populate env variables

- It's necessary to clone de repo and run `yarn` and then `yarn dev`
- By default will run at port `5173`

# About the Web App

There are two pages. One for Company management and the other for Supplier management.
The two pages are basically listing, creating, updating and deleting their respective entities.
There is a simple navigation bar to help with navigation when you are not on the homepage.
When you try to edit companies, you can also vinculate a supplier to that company.

---

## Tecnologias Principais:

# React + TypeScript + Vite

# Variáveis de Ambiente:

- `VITE_BASE_API_URL` -> Url base da api -> Padrão `http://localhost:8080/api`
- `VITE_CEP_LA_URL` -> Url do validador de CEP -> Padrão `http://cep.la`

# Para rodar o web app:

## Deve popular as variáveis de ambiente

- É necessário clonar o repositória e rodar `yarn` e depois `yarn dev`. Ambos dentro da pasta do projeto
- Por padrão roda na porta `5173`

# Sobre o Web App

Existem duas páginas. Um para gestão da Empresa e outro para gestão de Fornecedores.
As duas páginas estão basicamente listando, criando, atualizando e excluindo suas respectivas entidades.
Há uma barra de navegação simples para ajudar na navegação quando você não está na página inicial.<br/>
Caso você tente editar uma empresa, também é possível vincular um fornecedor a essa empresa. Basta clicar no botão "vincular"
**O Web App também possui uma tratativa para temas Dark e Light**

# Sobre os filtros

O filtro da duas listas principais funciona pela api. Na api, é feito um match perfeito do termo de pesquisa, por isso é necessário escrever o nome ou documento completo.
O filtro de relacionar fornecedor é feito no front de forma que não bate na api.
Esse filtro é mais inteligente e consegue filtrar mesmo com acentos, espaços e palavras incompletas (nome ou documento).
