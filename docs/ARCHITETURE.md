# Projeto CLAI - Arquitetura e Organização de Pacotes

Este documento descreve e justifica o padrão arquitetural e de organização de pacotes utilizado pela equipe durante o desenvolvimento do projeto.

## Arquitetura do Projeto

**Padrão Utilizado:** Em camadas (Layered) com Frontend Desacoplado

**Justificativa:** A equipe decidiu seguir por um padrão de arquitetura backend em camadas com o frontend  desacoplado por dois principais motivos:

1. É o padrão de arquitetura mais comum de projetos em Spring, o que facilita a compreensão entre os envolvidos e a busca de material didático.
2. É um padrão que a equipe já está acostumado a utilizar, tanto por parte do backend, quanto por parte do front, o que permite um desenvolvimento mais tranquilo.

### Opções Descartadas
- **MVC:** Descartada por incompatibilidade com o uso de React, que foi escolhido como parte da Stack.
- **Outras Arquiteturas:** Descartadas por falta de familiaridade/interesse por parte da equipe.

## Padrão de Pacotes

Seguindo especificamente para o backend, o time optou por utilizar um padrão de pacotes por camada (package by layer), por também ser um padrão com o qual o time tem familiaridade e por se adequar bem com a arquitetura do próprio projeto. Dessa forma, o padrão base dos pacotes segue da seguinte maneira:

```plaintext
com.ifpb.edu.br.clai
├── controller/
├── service/
├── repository/
├── model/
├── dtos/
└── config/
```

## Tratamento de Erros

A equipe optou por utilizar do padrão de Problem Details (RFC 9457) como contrato oficial de falhas da API e Handlers Globais para o tratamento de erros pelos seguintes motivos:
- Redução da repetição de código try/catch e centralização dos tratamentos de erro
- Padronização das mensagens de erro levantadas pelo backend, facilitando o consumo e a exibição dos problemas no frontend
- Aprendizagem desse padrão na prática



