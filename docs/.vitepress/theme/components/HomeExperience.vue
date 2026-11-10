<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'

type ModeId = 'starter' | 'practice' | 'builder'

const modes = [
  {
    id: 'starter' as ModeId,
    label: '本機 AI 入門',
    icon: '01',
    title: '先在自己的電腦，建立第一個 AI 對話室。',
    description: '用一套開源桌面程式開始，載入本機模型，不必先註冊雲端 AI 帳號或申請 API Key。',
    cards: [
      { number: '01', eyebrow: 'LOCAL FIRST', title: '認識本機 AI 工作站', detail: '了解對話介面、模型執行引擎、文件知識庫與網路搜尋的分工。', badge: '原創教學', tone: 'lime', href: '/guide/what-is-openclaw/', action: '了解整體架構' },
      { number: '02', eyebrow: 'INSTALL', title: '安裝 AnythingLLM Desktop', detail: '先使用一套桌面程式與內建本機推論，不需要先安裝多個服務。', badge: '免註冊起步', tone: 'blue', href: '/guide/install/', action: '開始安裝' },
      { number: '03', eyebrow: 'FIRST CHAT', title: '完成第一次本機對話', detail: '下載模型、建立工作區、測試聊天與文件問答。', badge: '操作教學', tone: 'coral', href: '/guide/first-assistant/', action: '建立對話室' }
    ]
  },
  {
    id: 'practice' as ModeId,
    label: '對話與網路研究',
    icon: '02',
    title: '讓本機 AI 讀懂文件，也能幫你查網路資料。',
    description: '從個人文件問答開始，再啟用網路搜尋與網頁擷取；每個重要結論都要能回到原始來源。',
    cards: [
      { number: '01', eyebrow: 'KNOWLEDGE', title: '建立本機文件知識庫', detail: '匯入 PDF、筆記與專案文件，練習 RAG 與來源引用。', badge: '文件問答', tone: 'lime', href: '/guide/first-assistant/', action: '建立知識工作區' },
      { number: '02', eyebrow: 'WEB RESEARCH', title: '免 API Key 網路搜尋', detail: '使用 AnythingLLM 內建 DuckDuckGo 搜尋，了解限制與來源查核。', badge: '免申請額度', tone: 'blue', href: '/guide/web-research/', action: '開始網路研究' },
      { number: '03', eyebrow: 'MODEL CHOICE', title: '選擇非中國開發模型', detail: '以 Google Gemma 與 IBM Granite 為優先候選，檢查授權與硬體需求。', badge: '模型白名單', tone: 'coral', href: '/guide/models/', action: '查看模型選擇' }
    ]
  },
  {
    id: 'builder' as ModeId,
    label: 'Agent 自動化',
    icon: '03',
    title: '從聊天升級成會查資料、會使用工具的 AI Agent。',
    description: '先使用 AnythingLLM 內建 Agent，再進一步學習 MCP、SearXNG 與 OpenClaw 等進階架構。',
    cards: [
      { number: '01', eyebrow: 'AGENT', title: '啟用本機 AI Agent', detail: '讓 Agent 搜尋網頁、擷取內容、整理文件與產生報告。', badge: '工具實作', tone: 'lime', href: '/guide/agent-workflows/', action: '開始 Agent 實作' },
      { number: '02', eyebrow: 'OPEN SEARCH', title: '自架 SearXNG 搜尋', detail: '了解免 API Key 的開源中繼搜尋，並認識上游搜尋引擎的限制。', badge: '進階選修', tone: 'blue', href: '/guide/web-research/', action: '查看搜尋架構' },
      { number: '03', eyebrow: 'ADVANCED AGENT', title: 'OpenClaw 進階 Agent', detail: '當你需要多渠道、排程與更細緻的工具路由，再學習 OpenClaw。', badge: '進階選修', tone: 'coral', href: '/agent-lab/', action: '進入 Agent 工作室' }
    ]
  }
]

const guides = [
  { title: '認識本機 AI 工作站', description: '了解對話介面、模型執行引擎、知識庫與網路搜尋。', status: '原創教學', href: '/guide/what-is-openclaw/', tags: '本機 ai local first 架構 anythingllm' },
  { title: '安裝 AnythingLLM Desktop', description: '使用一套桌面程式開始，不必先註冊雲端服務。', status: '操作教學', href: '/guide/install/', tags: '安裝 desktop windows mac linux' },
  { title: '完成第一次本機對話', description: '下載模型、建立工作區、測試聊天與文件問答。', status: '操作教學', href: '/guide/first-assistant/', tags: '聊天 對話室 文件 pdf rag' },
  { title: '免 API Key 網路研究', description: '使用內建搜尋或自架 SearXNG，查找並交叉確認資料。', status: '網路搜尋', href: '/guide/web-research/', tags: 'web search duckduckgo searxng' },
  { title: '選擇非中國開發模型', description: 'Gemma 與 Granite 的授權、尺寸與硬體考量。', status: '模型選擇', href: '/guide/models/', tags: 'gemma granite apache 2 model' },
  { title: '本機 AI Agent 工作流程', description: '讓 Agent 使用工具查資料、擷取網頁與整理檔案。', status: 'Agent 實作', href: '/guide/agent-workflows/', tags: 'agent tool mcp browser' },
  { title: '建立安全的使用邊界', description: '檢查檔案權限、網路搜尋、工具執行與提示詞注入。', status: '安全教學', href: '/guide/safety/', tags: 'security 安全 prompt injection 權限' },
  { title: 'OpenClaw 進階 Agent 工作室', description: '下載多 Agent、Skill 與工作區設定範例。', status: '進階範例', href: '/agent-lab/', tags: 'openclaw 多智能體 agent skill' },
  { title: '繁中術語表', description: '查詢本站採用的台灣繁體中文術語。', status: '參考資源', href: '/reference/glossary', tags: '名詞 術語' },
  { title: '教材狀態與更新紀錄', description: '區分原創教學、上游參考資料與待整理內容。', status: '透明追蹤', href: '/reference/translation-status', tags: '進度 更新 changelog' }
]

const progressKey = 'local-open-source-ai-learning-v1'
const tasks = ref([
  { id: 'desktop', label: '安裝 AnythingLLM Desktop', done: false },
  { id: 'model', label: '下載並啟用非中國開發的本機模型', done: false },
  { id: 'chat', label: '完成第一次對話與文件問答', done: false },
  { id: 'search', label: '測試網路搜尋並檢查原始來源', done: false },
  { id: 'safety', label: '檢查 Agent 工具與檔案權限', done: false }
])

const activeMode = ref<ModeId>('starter')
const activePath = computed(() => modes.find((mode) => mode.id === activeMode.value) || modes[0])
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const searchResults = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()
  if (!query) return guides
  return guides.filter((guide) => (guide.title + ' ' + guide.description + ' ' + guide.status + ' ' + guide.tags).toLocaleLowerCase().includes(query))
})

const progressKey = 'openclaw-zh-tw-learning-checklist-v2'
const tasks = ref([
  { id: 'install', label: '完成 AnythingLLM Desktop 安裝', done: false },
  { id: 'onboard', label: '下載並啟用非中國開發的本機模型', done: false },
  { id: 'test', label: '完成第一次對話與文件問答', done: false },
  { id: 'security', label: '測試網路搜尋並檢查 Agent 權限', done: false }
])
const completedCount = computed(() => tasks.value.filter((task) => task.done).length)
const progress = computed(() => Math.round((completedCount.value / tasks.value.length) * 100))

function handleSearchShortcut(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    searchInput.value?.focus()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleSearchShortcut)
  try {
    const saved = JSON.parse(window.localStorage.getItem(progressKey) || '[]')
    if (Array.isArray(saved)) tasks.value = tasks.value.map((task) => ({ ...task, done: saved.includes(task.id) }))
  } catch {
    // Ignore unavailable or malformed local progress data.
  }
})

onUnmounted(() => window.removeEventListener('keydown', handleSearchShortcut))

function resetProgress() {
  tasks.value = tasks.value.map((task) => ({ ...task, done: false }))
}

watch(tasks, (value) => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(progressKey, JSON.stringify(value.filter((task) => task.done).map((task) => task.id)))
    } catch {
      // The checklist remains usable even when browser storage is blocked.
    }
  }
}, { deep: true })


</script>

<template>
  <section class="home-experience">
    <div class="home-wrap">
      <section class="home-proof" aria-label="網站內容概況">
        <div class="proof-item"><span class="proof-value">04</span><span class="proof-label">篇原創入門教學</span></div>
        <div class="proof-divider"></div>
        <div class="proof-item"><span class="proof-value">01</span><span class="proof-label">套 Agent 範例工作室</span></div>
        <div class="proof-divider"></div>
        <div class="proof-item"><span class="proof-value">20</span><span class="proof-label">個實戰專題入口</span></div>
        <div class="proof-note"><span class="status-dot"></span><span>教材持續查核與更新</span></div>
      </section>

      <section class="journey-section">
        <div class="section-heading">
          <div>
            <p class="section-kicker">FIND YOUR WAY</p>
            <h2>選一條適合現在的學習路線</h2>
            <p class="section-desc">不需要一次學完。從眼前最想完成的事情開始就好。</p>
          </div>
          <span class="section-index">01 / 03</span>
        </div>

        <div class="path-tabs" role="group" aria-label="選擇學習路徑">
          <button v-for="mode in modes" :key="mode.id" type="button" class="path-tab" :class="{ active: activeMode === mode.id }" :aria-pressed="activeMode === mode.id" @click="activeMode = mode.id">
            <span class="tab-number">{{ mode.icon }}</span><span>{{ mode.label }}</span><span class="tab-arrow">↗</span>
          </button>
        </div>

        <div class="journey-intro" :key="activePath.id">
          <div>
            <p class="journey-overline">YOUR NEXT STEP</p>
            <h3>{{ activePath.title }}</h3>
            <p>{{ activePath.description }}</p>
          </div>
          <span class="journey-stamp">{{ activePath.icon }}</span>
        </div>

        <div class="journey-cards" :key="activePath.id + '-cards'">
          <article v-for="card in activePath.cards" :key="card.number" class="journey-card" :class="'tone-' + card.tone">
            <div class="card-topline">
              <span class="card-number">{{ card.number }}</span>
              <span class="card-eyebrow">{{ card.eyebrow }}</span>
              <span class="card-badge">{{ card.badge }}</span>
            </div>
            <div class="card-content"><h4>{{ card.title }}</h4><p>{{ card.detail }}</p></div>
            <a class="card-link" :href="withBase(card.href)">{{ card.action }}<span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section class="explore-section">
        <div class="section-heading">
          <div>
            <p class="section-kicker">SEARCH THE GUIDE</p>
            <h2>想找的內容，直接搜尋</h2>
            <p class="section-desc">搜尋操作步驟、功能名稱或專題關鍵字，直接前往對應教學。</p>
          </div>
          <span class="section-index">02 / 03</span>
        </div>

        <div class="search-panel">
          <label class="search-box">
            <span class="search-icon" aria-hidden="true">⌕</span>
            <input ref="searchInput" v-model="searchQuery" type="search" placeholder="試試搜尋：本機模型、AnythingLLM、SearXNG、Agent…" aria-label="搜尋教學內容" />
            <button v-if="searchQuery" type="button" class="clear-search" @click="searchQuery = ''">清除</button>
            <kbd>⌘ K</kbd>
          </label>
          <div class="search-meta"><span>{{ searchResults.length }} 個相關入口</span><span>目前收錄 10 個常用入口</span></div>
          <div v-if="searchResults.length" class="search-results">
            <a v-for="guide in searchResults" :key="guide.href" class="search-result" :href="withBase(guide.href)">
              <span class="result-arrow">↗</span>
              <span class="result-main"><strong>{{ guide.title }}</strong><small>{{ guide.description }}</small></span>
              <span class="result-status">{{ guide.status }}</span>
            </a>
          </div>
          <div v-else class="empty-search">找不到完全相符的內容。試試「AnythingLLM」、「Gemma」、「網路搜尋」或「Agent」。</div>
        </div>
      </section>

      <section class="workspace-section">
        <div class="section-heading">
          <div>
            <p class="section-kicker">MAKE IT HAPPEN</p>
            <h2>建立自己的本機 AI 工作空間</h2>
            <p class="section-desc">依序完成這份小清單。勾選進度只會保存在目前瀏覽器，不需要註冊帳號。</p>
          </div>
          <span class="section-index">03 / 03</span>
        </div>

        <div class="workspace-grid">
          <div class="checklist-panel">
            <div class="checklist-header">
              <div><p class="panel-overline">YOUR CHECKLIST</p><h3>入門進度</h3></div>
              <div class="progress-ring" :style="{ '--progress': progress + '%' }"><span>{{ progress }}%</span></div>
            </div>
            <div class="checklist-items">
              <label v-for="(task, index) in tasks" :key="task.id" class="check-item" :class="{ checked: task.done }">
                <input v-model="task.done" type="checkbox" />
                <span class="check-custom">{{ task.done ? '✓' : String(index + 1).padStart(2, '0') }}</span>
                <span>{{ task.label }}</span>
              </label>
            </div>
            <div class="checklist-footer"><span>{{ completedCount }} / {{ tasks.length }} 項已完成</span><button type="button" class="reset-progress" @click="resetProgress">重設進度</button></div>
          </div>

          <div class="terminal-panel">
            <div class="terminal-top">
              <div class="terminal-dots"><i></i><i></i><i></i></div>
              <span>TERMINAL / QUICK START</span>
              <span class="terminal-live"><b></b> READY</span>
            </div>
            <div class="terminal-body">
              <p class="terminal-comment"># 從一套本機桌面程式開始，不需要註冊雲端帳號：</p>
              <div class="terminal-command"><span><em>↗</em> AnythingLLM Desktop</span><a href="https://anythingllm.com/download" target="_blank" rel="noreferrer">官方下載</a></div>
              <p class="terminal-hint">安裝後選擇內建本機模型引擎，模型來源指定 Hugging Face；不使用自動切換到 ModelScope 的來源設定。</p>
              <a :href="withBase('/guide/install/') " class="terminal-doc-link">查看安裝與本機模型設定 <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section class="principles-strip">
        <div class="principle-mark" aria-hidden="true">✳</div>
        <div>
          <p class="principle-title">本機優先．權限最小化．來源透明</p>
          <p class="principle-desc">本站以原創教學與可重現範例為主，使用 OpenClaw 官方文件查核指令與設定；舊版上游教材另列參考，避免混淆內容來源。</p>
        </div>
        <a :href="withBase('/reference/translation-status')">查看教材狀態 <span>↗</span></a>
      </section>

      <footer class="home-footer">
        <span>LOCAL OPEN-SOURCE AI · TRADITIONAL CHINESE GUIDE</span>
        <span>獨立社群教學與範例專案，非 OpenClaw 官方網站。</span>
        <a :href="withBase('/about/source-license')">來源與授權</a>
      </footer>
    </div>
  </section>
</template>
