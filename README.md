# Portal Criandos Sites

Catálogo público da comunidade Criandos Sites. O site lê os índices dos repositórios `resources`, `skills` e `snippets` e apresenta o conteúdo com busca e filtros.

## Publicação

O GitHub Pages publica o diretório `dist` por meio do workflow em `.github/workflows/pages.yml`.

## Atualização do conteúdo

Os dados iniciais ficam incorporados em `dist/app.js` para garantir uma abertura rápida. Depois do carregamento, o navegador consulta os arquivos Markdown públicos dos três repositórios e atualiza o catálogo automaticamente.
