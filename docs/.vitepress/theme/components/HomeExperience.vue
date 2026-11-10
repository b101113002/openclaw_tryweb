<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'

type ModeId = 'starter' | 'practice' | 'builder'

const modes = [
  {
    id: 'starter' as ModeId,
    label: '新手入門',
    icon: '01',
    title: '先理解，再安裝，最後完成自己的第一個助理。',
    description: '從 OpenClaw 的運作方式開始，依照環境檢查、安裝、初次設定與安全檢查逐步完成。',
    cards: [
      { number: '01', eyebrow: 'FOUNDATION', title: '認識 OpenClaw', detail: '先理解 Gateway、Agent、模型、聊天渠道與工具之間的關係。', badge: '原創教學', tone: 'lime', href: '/guide/what-is-openclaw/', action: '理解核心架構' },
      { number: '02', eyebrow: 'INSTALL', title: '準備環境並安裝', detail: '確認 Node.js、作業系統與模型連線方式，再執行官方安裝流程。', badge: '操作教學', tone: 'blue', href: '/guide/install/', action: '開始安裝準備' },
      { number: '03', eyebrow: 'FIRST RUN', title: '完成第一次對話', detail: '設定 Gateway、開啟控制介面，並用安全的測試任務確認一切正常。', badge: '操作教學', tone: 'coral', href: '/guide/first-assistant/', action: '建立第一個助理' }
    ]
  },
  {
    id: 'practice' as ModeId,
    label: '情境實戰',
    icon: '02',
    title: '把 AI 助理放進每天真的會做的事。',
    description: '從郵件、行事曆到知識庫與研究流程，先挑一個需求，再逐步擴充自動化。',
    cards: [
      { number: '01', eyebrow: 'WORKFLOW', title: '郵件與日常摘要', detail: '整理收件匣、彙整重點，建立每天都能使用的工作流程。', badge: '專題規劃中', tone: 'lime', href: '/university/email-assistant/', action: '查看專題入口' },
      { number: '02', eyebrow: 'PRODUCTIVITY', title: '行事曆與會議管理', detail: '整合日程、會議準備與會後紀錄，減少重複行政工作。', badge: '專題規劃中', tone: 'blue', href: '/university/calendar-ops/', action: '查看專題入口' },
      { number: '03', eyebrow: 'KNOWLEDGE', title: '建立可檢索的知識庫', detail: '把文件、研究資料與團隊知識整理成可查詢的工作空間。', badge: '專題規劃中', tone: 'coral', href: '/university/knowledge-base/', action: '查看專題入口' }
    ]
  },
  {
    id: 'builder' as ModeId,
    label: '進階開發',
    icon: '03',
    title: '從使用者，走進 Agent 系統內部。',
    description: '理解 Agent、工具與 Gateway 的分工，再動手擴充自己的 Skill。',
    cards: [
      { number: '01', eyebrow: 'ARCHITECTURE', title: '理解 Agent 系統架構', detail: '建立訊息、路由、工作階段與工具執行的整體心智模型。', badge: '進階導覽', tone: 'lime', href: '/build/intro/', action: '進入進階開發' },
      { number: '02', eyebrow: 'CORE CONCEPTS', title: '拆解工具與權限', detail: '理解工具政策、沙箱與不同 Agent 的工作範圍。', badge: '章節規劃中', tone: 'blue', href: '/build/chapter1/', action: '查看章節入口' },
      { number: '03', eyebrow: 'MAKE A SKILL', title: '親手開發 Skill', detail: '從需求、工具介面到測試，練習把能力封裝成可重用模組。', badge: '實作入口', tone: 'coral', href: '/build/skill-practice/', action: '開始實作' }
    ]
  }
]

const guides = [
  { title: 'OpenClaw 是什麼？', description: '理解 Gateway、Agent、模型、渠道與工具如何合作。', status: '原創教學', href: '/guide/what-is-openclaw/', tags: '入門 概念 架構 gateway agent channel tool' },
  { title: '安裝前準備與環境檢查', description: '確認 Node.js、作業系統、模型與部署方式。', status: '操作教學', href: '/guide/install/', tags: '安裝 node mac windows linux wsl2' },
  { title: '完成第一次對話', description: '執行 onboarding、檢查 Gateway 並開啟控制介面。', status: '操作教學', href: '/guide/first-assistant/', tags: 'onboard gateway dashboard 第一次' },
  { title: '建立安全的使用邊界', description: '認識配對、允許清單、工具權限與提示詞注入。', status: '安全教學', href: '/guide/safety/', tags: 'security 安全 prompt injection 沙箱 權限' },
  { title: 'Agent 實作工作室', description: '從單功能助理到多 Agent 協作的本機範例。', status: '範例套件', href: '/agent-lab/', tags: 'agent lab 多智能體 範例' },
  { title: '郵件與日常摘要', description: '把收件匣整理與每日摘要設計成可驗證的流程。', status: '實戰專題', href: '/university/email-assistant/', tags: 'email 郵件 摘要' },
  { title: '進階開發導覽', description: '深入理解 OpenClaw 架構、工具與 Skill。', status: '進階課程', href: '/build/intro/', tags: '開發 架構 skill' },
  { title: 'Skill 開發實作', description: '將重複任務封裝成可重用的技能。', status: '實作入口', href: '/build/skill-practice/', tags: 'skill 技能 開發' },
  { title: '繁中術語表', description: '查詢本站採用的台灣繁體中文術語。', status: '參考資源', href: '/reference/glossary', tags: '名詞 術語' },
  { title: '教材狀態與更新紀錄', description: '區分原創教學、上游參考資料與待整理內容。', status: '透明追蹤', href: '/reference/translation-status', tags: '進度 更新 changelog' }
]

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
  { id: 'install', label: '完成 OpenClaw 安裝與版本檢查', done: false },
  { id: 'onboard', label: '完成初次設定並確認模型連線', done: false },
  { id: 'test', label: '在控制介面完成第一次對話', done: false },
  { id: 'security', label: '檢查 Gateway、渠道與工具權限', done: false }
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

const copyMessage = ref('')
async function copyCommand() {
  try {
    await navigator.clipboard.writeText('openclaw onboard')
    copyMessage.value = '已複製指令'
  } catch {
    copyMessage.value = '請手動選取指令複製'
  }
}
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
            <input ref="searchInput" v-model="searchQuery" type="search" placeholder="試試搜尋：安裝、Gateway、Telegram、Skill…" aria-label="搜尋教學內容" />
            <button v-if="searchQuery" type="button" class="clear-search" @click="searchQuery = ''">清除</button>
            <kbd>⌘ K</kbd>
          </label>
          <div class="search-meta"><span>{{ searchResults.length }} 個相關入口</span><span>目前收錄 10 個常用導覽</span></div>
          <div v-if="searchResults.length" class="search-results">
            <a v-for="guide in searchResults" :key="guide.href" class="search-result" :href="withBase(guide.href)">
              <span class="result-arrow">↗</span>
              <span class="result-main"><strong>{{ guide.title }}</strong><small>{{ guide.description }}</small></span>
              <span class="result-status">{{ guide.status }}</span>
            </a>
          </div>
          <div v-else class="empty-search">找不到完全相符的內容。試試「安裝」、「模型」、「聊天平台」或「Skill」。</div>
        </div>
      </section>

      <section class="workspace-section">
        <div class="section-heading">
          <div>
            <p class="section-kicker">MAKE IT HAPPEN</p>
            <h2>建立自己的第一個 OpenClaw 工作空間</h2>
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
              <p class="terminal-comment"># 已完成安裝？啟動 OpenClaw 初次設定：</p>
              <div class="terminal-command"><span><em>$</em> openclaw onboard</span><button type="button" @click="copyCommand" aria-label="複製 openclaw onboard 指令">複製</button></div>
              <p class="terminal-hint">{{ copyMessage || '依照設定精靈確認模型、工作區與 Gateway。' }}</p>
              <a :href="withBase('/guide/first-assistant/') " class="terminal-doc-link">閱讀第一次啟動教學 <span>↗</span></a>
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
        <span>OPENCLAW · TRADITIONAL CHINESE FIELD GUIDE</span>
        <span>獨立社群教學與範例專案，非 OpenClaw 官方網站。</span>
        <a :href="withBase('/about/source-license')">來源與授權</a>
      </footer>
    </div>
  </section>
</template>
