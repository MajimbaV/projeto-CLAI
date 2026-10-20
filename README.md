# CLAI

O **CLAI** é um sistema em desenvolvimento para centralizar informações e documentos relacionados ao acompanhamento de estudantes com necessidades específicas do campus Cajazeiras do Instituto Federal da Paraíba (IFPB). A plataforma é destinada aos profissionais da comunidade acadêmica envolvidos nesse acompanhamento, incluindo professores, diretores, equipes de coordenação e demais servidores e colaboradores do campus.

> **Status:** atualmente, o sistema permite cadastrar, consultar, listar e atualizar alunos. A gestão de documentos e o controle de acesso por usuário ainda não estão disponíveis.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 7, TanStack Query 5 e Axios |
| Backend | Java 21, Spring Boot 4.1, Spring MVC, Spring Data JPA, Bean Validation, Lombok e Actuator |
| Ferramenta de build | Maven 3.9.16 (Maven Wrapper) |
| Banco de dados | PostgreSQL 17.11 |
| Containers | Docker Compose; Node.js 22.13+ para build e desenvolvimento do frontend |

O backend é organizado em camadas e disponibiliza uma API REST consumida pelo frontend.

## Executar com Docker

Requisito: Docker Engine ou Docker Desktop com Docker Compose.

Na raiz do projeto, crie os arquivos de ambiente:

```powershell
Copy-Item .env.example .env
Copy-Item apps\frontend\projeto-clai-frontend\.env.example apps\frontend\projeto-clai-frontend\.env
```

No `.env` da raiz, defina uma senha para `DB_PASSWORD`. No `.env` do frontend, configure o endereço da API:

```dotenv
VITE_API_URL=http://localhost:8080
```

Suba a aplicação:

```powershell
docker compose up --build
```

| Serviço | Endereço |
| --- | --- |
| Aplicação web | http://localhost:5173 |
| API | http://localhost:8080 |
| PostgreSQL | `localhost:5432` |

Para parar os serviços, use `Ctrl+C` e execute `docker compose down`. Para apagar também os dados persistidos do banco, execute `docker compose down -v`.

## API

**URL base:** `http://localhost:8080`

### Alunos

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/alunos?page=0&size=10` | Lista alunos de forma paginada. `page` começa em `0`; `size` padrão é `10`. |
| `GET` | `/alunos/matricula/{matricula}` | Consulta um aluno pela matrícula. |
| `POST` | `/alunos` | Cadastra um aluno. |
| `PUT` | `/alunos/{id}` | Atualiza um aluno pelo UUID. |

Para cadastro e atualização, a API recebe os dados do aluno em JSON. A matrícula deve conter apenas números; datas usam o formato `AAAA-MM-DD` e períodos letivos, `AAAA.S` (por exemplo, `2026.1`). Os campos obrigatórios são nome, nascimento, matrícula, curso, período de ingresso e período letivo.

### Outras entidades

No momento, **Aluno** é a única entidade disponível na API. As rotas de outras entidades serão documentadas aqui quando forem implementadas.

Também está disponível uma coleção do Postman em `apps/backend/docs/clai.postman_collection.json`.

## Estrutura do projeto

```text
apps/
  backend/                         API Spring Boot
  frontend/
    projeto-clai-frontend/          Aplicação React
docs/                               Documentação de arquitetura
compose.yaml                        Orquestração dos serviços
```

## Desenvolvedores

- Rafael Fagundes Oliveira
- Francisco Sãmily Silva de Souza
- Sofia Marianna Lisboa Souza
- Manoel Victor dos Santos Dias Ferreira
- Francisco Everton Maciel Rodrigues
