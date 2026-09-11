const sources = {
  resources: ["ia", "desenvolvimento", "design", "wordpress", "apis", "automacao", "aprendizado"],
  skills: ["claude", "codex", "chatgpt", "gemini", "universal"],
  snippets: ["css", "javascript", "php", "wordpress", "react", "nextjs", "automacao"],
};

const labels = {
  resources: "Recurso",
  skills: "Skill",
  snippets: "Snippet",
  links: "Link do grupo",
  ia: "IA",
  desenvolvimento: "Desenvolvimento",
  design: "Design",
  wordpress: "WordPress",
  apis: "APIs",
  automacao: "Automação",
  aprendizado: "Aprendizado",
  claude: "Claude",
  codex: "Codex",
  chatgpt: "ChatGPT",
  gemini: "Gemini",
  universal: "Universal",
  css: "CSS",
  javascript: "JavaScript",
  php: "PHP",
  react: "React",
  nextjs: "Next.js",
  github: "GitHub",
  "redes-sociais": "Redes sociais",
  videos: "Vídeos",
  marketing: "Marketing",
  referencias: "Referências",
};

const fallbackItems = [
  ["Artificial Analysis", "https://artificialanalysis.ai/", "Comparações independentes de modelos e provedores de inteligência artificial.", "resources", "ia"],
  ["Meetily", "https://github.com/Zackriya-Solutions/meetily", "Assistente de reuniões aberto, com transcrição e processamento local.", "resources", "ia"],
  ["OptMem", "https://github.com/VictorTaelin/OptMem", "Memória persistente e compacta para agentes de IA.", "resources", "ia"],
  ["Orca", "https://github.com/stablyai/orca", "Ambiente para coordenar vários agentes de programação.", "resources", "ia"],
  ["The Maestri", "https://themaestri.app", "Tela visual para organizar agentes e acompanhar a comunicação entre eles.", "resources", "ia"],
  ["PageSpeed Insights", "https://pagespeed.web.dev/", "Análise de desempenho, acessibilidade, SEO e boas práticas de páginas web.", "resources", "desenvolvimento"],
  ["RTK", "https://github.com/rtk-ai/rtk", "Utilitário que compacta saídas para reduzir o contexto consumido por agentes.", "resources", "desenvolvimento"],
  ["21st.dev Components", "https://21st.dev/community/components", "Biblioteca comunitária de componentes de interface.", "resources", "design"],
  ["ASIMOV Design Systems", "https://ds.asimov.academy/", "Referência em português sobre design systems e interfaces consistentes.", "resources", "design"],
  ["Magic UI", "https://magicui.design/", "Componentes animados para interfaces web.", "resources", "design"],
  ["Thiings Collection", "https://www.thiings.co/things", "Coleção com mais de 10 mil ícones 3D gerados por IA.", "resources", "design"],
  ["Awesome MCP Servers", "https://github.com/ever-works/awesome-mcp-servers", "Catálogo comunitário de servidores MCP para agentes.", "resources", "automacao"],
  ["Mostrador físico de cota de IA", "https://www.tabnews.com.br/trindadebra/cansei-de-descobrir-na-marra-que-tinha-estourado-a-cota-da-ia-entao-construi-um-mostrador-pra-mesa", "Relato prático sobre um dispositivo para acompanhar consumo de IA.", "resources", "aprendizado"],
  ["Agent-ready SEO", "https://github.com/caiodomingues/agent-ready-seo", "Skill para tornar sites legíveis e citáveis por mecanismos de IA.", "skills", "claude"],
  ["GEO SEO Claude", "https://github.com/zubair-trabzada/geo-seo-claude", "Auditoria e otimização de presença em buscas feitas por IA.", "skills", "claude"],
  ["PageSpeed SEO Optimizer", "https://github.com/annygabb/pagespeed-seo-optimizer", "Otimização com Lighthouse e PageSpeed Insights.", "skills", "claude"],
  ["Img2ThreeJS", "https://github.com/img2threejs/img2threejs", "Reconstrói uma imagem como modelo procedural em Three.js.", "skills", "codex"],
  ["Video ShotCraft", "https://github.com/Vincentwei1021/video-shotcraft", "Criação de vídeos de produto com Remotion e modelos de produção.", "skills", "codex"],
  ["BMAD Method", "https://github.com/bmad-code-org/BMAD-METHOD", "Método aberto para desenvolvimento ágil orientado por agentes.", "skills", "universal"],
  ["GSAP Skills", "https://github.com/greensock/gsap-skills", "Práticas e padrões oficiais de animação usando GSAP.", "skills", "universal"],
  ["Marketing Skills", "https://github.com/coreyhaines31/marketingskills", "Skills para conversão, copywriting, SEO, análise e crescimento.", "skills", "universal"],
  ["Ponytail", "https://github.com/DietrichGebert/ponytail", "Instruções para reduzir complexidade e evitar código desnecessário.", "skills", "universal"],
  ["Sales Skills", "https://github.com/louisblythe/Sales-Skills", "Playbooks e processos de vendas para agentes de IA.", "skills", "universal"],
  ["Skills de Craig Hewitt", "https://github.com/TheCraigHewitt/skills", "Skills para fundadores, vendas, YouTube e atividades gerais.", "skills", "universal"],
  ["Taste Skill", "https://github.com/Leonxlnx/taste-skill", "Skill voltada à qualidade visual e à redução de resultados genéricos.", "skills", "universal"],
  ["UI/UX Pro Max Skill", "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill", "Inteligência de design para criação de interfaces.", "skills", "universal"],
  ["Vercel Skills", "https://github.com/vercel-labs/skills", "Ferramenta e catálogo aberto para agent skills.", "skills", "universal"],
].map(([name, url, description, type, category]) => ({ name, url, description, type, category }));

const fallbackProjects = [];

const state = {
  items: fallbackItems,
  type: "todos",
  category: "todos",
  query: "",
  itemLimit: 60,
};

const grid = document.querySelector("#catalog-grid");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const categoryFilters = document.querySelector("#category-filters");
const search = document.querySelector("#search");
const projectGrid = document.querySelector("#project-grid");
const projectEmpty = document.querySelector("#project-empty");
const moreItems = document.querySelector("#more-items");
const moreProjects = document.querySelector("#more-projects");

const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function visibleItems() {
  const query = normalize(state.query.trim());
  return state.items.filter((item) => {
    const matchesType = state.type === "todos" || item.type === state.type;
    const matchesCategory = state.category === "todos" || item.category === state.category;
    const haystack = normalize(`${item.name} ${item.description} ${labels[item.category] || item.category}`);
    return matchesType && matchesCategory && (!query || haystack.includes(query));
  });
}

function renderCategories() {
  const categorySet = new Set(
    state.items
      .filter((item) => state.type === "todos" || item.type === state.type)
      .map((item) => item.category),
  );
  const categories = ["todos", ...categorySet];
  if (!categories.includes(state.category)) state.category = "todos";
  categoryFilters.innerHTML = categories.map((category) => `
    <button class="category-chip ${state.category === category ? "is-active" : ""}" data-category="${category}">
      ${category === "todos" ? "Todas as categorias" : labels[category] || category}
    </button>
  `).join("");
}

function render() {
  const items = visibleItems();
  resultCount.textContent = `${items.length} ${items.length === 1 ? "item encontrado" : "itens encontrados"}`;
  grid.hidden = items.length === 0;
  emptyState.hidden = items.length !== 0;
  moreItems.hidden = items.length <= state.itemLimit;
  grid.innerHTML = items.slice(0, state.itemLimit).map((item) => `
    <article class="card" data-type="${item.type}">
      <div class="card-top">
        <span class="card-kind">${labels[item.type]}</span>
        <span class="card-category">${labels[item.category] || item.category}</span>
      </div>
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <a class="card-link" href="${safeUrl(item.url)}" target="_blank" rel="noreferrer">
        <span>Abrir referência</span><span aria-hidden="true">↗</span>
      </a>
    </article>
  `).join("");
}

function refresh() {
  renderCategories();
  render();
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProjects(projects = fallbackProjects) {
  const validProjects = projects.filter((project) => safeUrl(project.url));
  const visibleProjects = validProjects.slice(0, renderProjects.limit);
  projectGrid.hidden = validProjects.length === 0;
  projectEmpty.hidden = validProjects.length !== 0;
  moreProjects.hidden = validProjects.length <= renderProjects.limit;
  moreProjects.onclick = () => {
    renderProjects.limit += 12;
    renderProjects(validProjects);
  };
  projectGrid.innerHTML = visibleProjects.map((project, index) => {
    const codeUrl = safeUrl(project.code);
    return `
      <article class="project-card">
        <div class="project-index">${String(index + 1).padStart(2, "0")}</div>
        <div class="project-content">
          <p class="project-author">${project.author ? `Por ${escapeHtml(project.author)}` : "Projeto da comunidade"}</p>
          <h3>${escapeHtml(project.name)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="project-links">
            <a class="visit-project" href="${safeUrl(project.url)}" target="_blank" rel="noreferrer">Visitar página <span aria-hidden="true">↗</span></a>
            ${codeUrl ? `<a class="code-link" href="${codeUrl}" target="_blank" rel="noreferrer">Ver código &lt;/&gt;</a>` : ""}
          </div>
        </div>
      </article>
    `;
  }).join("");
}
renderProjects.limit = 12;

async function syncProjects() {
  const response = await fetch("https://raw.githubusercontent.com/Criandos-Sites/projects/main/projects.json", { cache: "no-cache" });
  if (!response.ok) throw new Error("Não foi possível carregar os projetos");
  const projects = await response.json();
  if (!Array.isArray(projects)) throw new Error("Formato de projetos inválido");
  renderProjects(projects);
}

document.querySelector(".type-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-type]");
  if (!button) return;
  state.type = button.dataset.type;
  state.category = "todos";
  state.itemLimit = 60;
  document.querySelectorAll(".type-tab").forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  refresh();
});

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  state.itemLimit = 60;
  refresh();
});

search.addEventListener("input", () => {
  state.query = search.value;
  state.itemLimit = 60;
  render();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== search) {
    event.preventDefault();
    search.focus();
  }
});

document.querySelector("#clear-filters").addEventListener("click", () => {
  state.query = "";
  state.type = "todos";
  state.category = "todos";
  state.itemLimit = 60;
  search.value = "";
  document.querySelectorAll(".type-tab").forEach((tab) => {
    const active = tab.dataset.type === "todos";
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  refresh();
});

moreItems.addEventListener("click", () => {
  state.itemLimit += 60;
  render();
});

function parseMarkdown(markdown, type, category) {
  const pattern = /^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)\s+—\s+(.+)$/gm;
  return [...markdown.matchAll(pattern)].map((match) => ({
    name: match[1].trim(),
    url: match[2].trim(),
    description: match[3].replace(/\s+(?:Idioma|Verificado|Links coletados).*$/i, "").trim(),
    type,
    category,
  }));
}

async function syncFromGitHub() {
  const requests = Object.entries(sources).flatMap(([type, categories]) =>
    categories.map(async (category) => {
      const url = `https://raw.githubusercontent.com/Criandos-Sites/${type}/main/${category}/README.md`;
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Não foi possível carregar ${type}/${category}`);
      return parseMarkdown(await response.text(), type, category);
    }),
  );

  const results = await Promise.allSettled(requests);
  const remoteItems = results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  try {
    const response = await fetch("https://raw.githubusercontent.com/Criandos-Sites/projects/main/links.json", { cache: "no-cache" });
    if (response.ok) {
      const groupLinks = await response.json();
      if (Array.isArray(groupLinks)) remoteItems.push(...groupLinks);
    }
  } catch {
    // Os repositórios de recursos continuam disponíveis se a lista geral falhar.
  }
  if (!remoteItems.length) return;

  const unique = new Map(remoteItems.map((item) => [item.url.toLowerCase(), item]));
  state.items = [...unique.values()].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  document.querySelector("#sync-status").textContent = "Atualizado pelo GitHub";
  refresh();
}

document.querySelector("#year").textContent = new Date().getFullYear();
refresh();
syncFromGitHub().catch(() => {
  document.querySelector("#sync-status").textContent = "Catálogo disponível";
});

renderProjects();
syncProjects().catch(() => renderProjects());

const projectForm = document.querySelector("#project-form");

function projectSubmission() {
  const data = new FormData(projectForm);
  const name = data.get("name").trim();
  const url = data.get("url").trim();
  const description = data.get("description").trim();
  const author = data.get("author").trim();
  const code = data.get("code").trim();
  const lines = [
    "Quero compartilhar um projeto na vitrine Criandos Sites:",
    "",
    `Projeto: ${name}`,
    `Página: ${url}`,
    `Descrição: ${description}`,
  ];
  if (author) lines.push(`Criado por: ${author}`);
  if (code) lines.push(`Código (opcional): ${code}`);
  return { name, body: lines.join("\n") };
}

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!projectForm.reportValidity()) return;
  const { body } = projectSubmission();
  window.open(`https://wa.me/?text=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#submit-github").addEventListener("click", () => {
  if (!projectForm.reportValidity()) return;
  const { name, body } = projectSubmission();
  const params = new URLSearchParams({ title: `[Projeto] ${name}`, body });
  window.open(`https://github.com/Criandos-Sites/projects/issues/new?${params}`, "_blank", "noopener,noreferrer");
});
