# Portal Criandos Sites

Catálogo público da comunidade Criandos Sites. O site lê os índices dos repositórios `resources`, `skills` e `snippets` e apresenta o conteúdo com busca e filtros. A vitrine de páginas criadas pela comunidade é carregada do arquivo `projects.json` no repositório `projects`.

## Publicação

O GitHub Pages publica o diretório `dist` por meio do workflow em `.github/workflows/pages.yml`.

## Atualização do conteúdo

Os dados iniciais ficam incorporados em `dist/app.js` para garantir uma abertura rápida. Depois do carregamento, o navegador consulta os arquivos Markdown públicos dos três repositórios e atualiza o catálogo automaticamente.

O formulário da página permite compartilhar um projeto pelo WhatsApp ou abrir uma sugestão no GitHub. O link da página é obrigatório e o link do código é opcional.
