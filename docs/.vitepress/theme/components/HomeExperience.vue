<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'

type ModeId = 'starter' | 'practice' | 'builder'

const modes = [
  {
    id: 'starter' as ModeId,
    label: '新手入門',
    icon: '01',
    title: '先讓 OpenClaw 在自己的電腦跑起來。',
    description: '從官方 CLI 開始，先完成最小可用設定，再慢慢接上聊天平台與工具。',
    cards: [
      { number: '01', eyebrow: 'START HERE', title: '手動安裝 OpenClaw', detail: '從自己的裝置安裝 CLI。這是本站優先推薦的入門路徑。', badge: '精簡導讀', tone: 'lime', href: '/adopt/chapter2/', action: '閱讀安裝導讀' },
      { number: '02', eyebrow: 'CONFIGURE', title: '設定 Gateway 與模型', detail: '理解 QuickStart、工作區、驗證方式與初始設定精靈。', badge: '繁中改寫', tone: 'blue', href: '/adopt/chapter3/', action: '開始設定' },
      { number: '03', eyebrow: 'CONNECT', title: '接上日常聊天平台', detail: '從單一渠道開始測試，並用最小權限原則管理 Bot。', badge: '繁中改寫', tone: 'coral', href: '/adopt/chapter4/', action: '查看渠道教學' }
    ]
  },
  {
    id: 'practice' as ModeId,
    label: '情境實戰',
    icon: '02',
    title: '把 AI 助理放進每天真的會做的事。',
    description: '從郵件、行事曆到知識庫與研究流程，先挑一個需求，再逐步擴充自動化。',
    cards: [
      { number: '01', eyebrow: 'WORKFLOW', title: '郵件與日常摘要', detail: '整理收件匣、彙整重點，建立每天都能使用的工作流程。', badge: '教材整理中', tone: 'lime', href: '/university/email-assistant/', action: '查看課程入口' },
      { number: '02', eyebrow: 'PRODUCTIVITY', title: '行事曆與會議管理', detail: '整合日程、會議準備與會後紀錄，減少重複行政工作。', badge: '教材整理中', tone: 'blue', href: '/university/calendar-ops/', action: '查看課程入口' },
      { number: '03', eyebrow: 'KNOWLEDGE', title: '建立可檢索的知識庫', detail: '把文件、研究資料與團隊知識整理成可查詢的工作空間。', badge: '教材整理中', tone: 'coral', href: '/university/knowledge-base/', action: '查看課程入口' }
    ]
  },
  {
    id: 'builder' as ModeId,
    label: '開發者路徑',
    icon: '03',
    title: '從使用者，走進 Agent 系統內部。',
    description: '理解 Agent、工具與 Gateway 的分工，再動手擴充自己的 Skill。',
    cards: [
      { number: '01', eyebrow: 'ARCHITECTURE', title: '理解 OpenClaw 架構', detail: '由開發篇導覽開始，建立 Agent 系統的整體心智模型。', badge: '開發篇導覽', tone: 'lime', href: '/build/intro/', action: '進入開發篇' },
      { number: '02', eyebrow: 'CORE CONCEPTS', title: '拆解 Agent 核心機制', detail: '循序閱讀架構章節，理解提示詞、工具與訊息處理。', badge: '教材整理中', tone: 'blue', href: '/build/chapter1/', action: '查看章節入口' },
      { number: '03', eyebrow: 'MAKE A SKILL', title: '親手開發 Skill', detail: '從需求、工具介面到測試，練習把能力封裝成可重用模組。', badge: '實作入口', tone: 'coral', href: '/build/skill-practice/', action: '開始實作' }
    ]
  }
]

const guides = [
  { title: 'AutoClaw 一鍵安裝', description: '第三方桌面方案，作為上游教材參考與選讀。', status: '第三方／選讀', href: '/adopt/chapter1/', tags: 'autoclaw 安裝 桌面 第三方' },
  { title: '手動安裝 OpenClaw', description: '在自己的電腦安裝 CLI，開始本機部署。', status: '精簡導讀', href: '/adopt/chapter2/', tags: '安裝 cli 手動 mac windows linux' },
  { title: '初始設定精靈', description: '設定模型、工作區、Gateway 與背景服務。', status: '繁中改寫', href: '/adopt/chapter3/', tags: '設定 onboarding gateway model workspace' },
  { title: '連接聊天平台', description: '理解渠道、Bot 權限、事件訂閱與配對。', status: '繁中改寫', href: '/adopt/chapter4/', tags: 'telegram discord slack line feishu lark channel' },
  { title: '領養 OpenClaw 使用篇', description: '從安裝、設定到日常使用的完整學習順序。', status: '學習導覽', href: '/adopt/intro/', tags: '新手 入門 使用篇' },
  { title: '龍蝦大學情境實戰', description: '探索郵件、行事曆、知識庫與多智能體案例。', status: '20 個情境入口', href: '/university/intro/', tags: '情境 實戰 自動化 工作流' },
  { title: '構建 OpenClaw 開發篇', description: '從 Agent 架構、ReAct 到工具與 Gateway。', status: '開發篇導覽', href: '/build/intro/', tags: '開發 架構 react agent gateway' },
  { title: 'Skill 開發實作', description: '將重複任務封裝成可重用的技能。', status: '實作入口', href: '/build/skill-practice/', tags: 'skill 技能 開發' },
  { title: '繁體中文術語表', description: '查詢本站採用的台灣繁體中文譯詞。', status: '參考資料', href: '/reference/glossary', tags: '名詞 翻譯 術語' },
  { title: '翻譯進度與更新紀錄', description: '查看哪些章節已完成、哪些仍在整理。', status: '透明追蹤', href: '/reference/translation-status', tags: '進度 更新 changelog' }
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

const progressKey = 'openclaw-zh-tw-learning-checklist-v1'
const tasks = ref([
  { id: 'install', label: '完成 OpenClaw CLI 安裝', done: false },
  { id: 'onboard', label: '完成初始設定精靈', done: false },
  { id: 'test', label: '在本機完成第一次測試', done: false },
  { id: 'security', label: '檢查渠道、工具與檔案權限', done: false }
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
    if (Array.isArray(saved)) {
      tasks.value = tasks.value.map((task) => ({ ...task, done: saved.includes(task.id) }))
    }
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
        <div class="proof-item"><span class="proof-value">03</span><span class="proof-label">章繁中改寫完成</span></div>
        <div class="proof-divider"></div>
        <div class="proof-item"><span class="proof-value">01</span><span class="proof-label">章精簡安裝導讀</span></div>
        <div class="proof-divider"></div>
        <div class="proof-item"><span class="proof-value">20</span><span class="proof-label">個情境實戰入口</span></div>
        <div class="proof-note"><span class="status-dot"></span><span>教材持續更新中</span></div>
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
            <p class="section-desc">搜尋章節、功能或關鍵字；結果會連到本站現有的教材頁面。</p>
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
            <p class="section-desc">安裝後依序完成這份小清單。勾選進度只會保存在目前瀏覽器，不需要註冊帳號。</p>
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
              <p class="terminal-comment"># 已安裝 OpenClaw CLI？啟動初始設定精靈：</p>
              <div class="terminal-command"><span><em>$</em> openclaw onboard</span><button type="button" @click="copyCommand" aria-label="複製 openclaw onboard 指令">複製</button></div>
              <p class="terminal-hint">{{ copyMessage || '依照終端機提示完成模型、工作區與 Gateway 設定。' }}</p>
              <a :href="withBase('/adopt/chapter3/')" class="terminal-doc-link">先看初始設定說明 <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section class="principles-strip">
        <div class="principle-mark" aria-hidden="true">✳</div>
        <div>
          <p class="principle-title">本機優先．權限最小化．來源透明</p>
          <p class="principle-desc">本指南優先介紹可自行掌控的工具與非中國開發模型。未完成翻譯的章節會明確標示，不以佔位內容冒充完整教材。</p>
        </div>
        <a :href="withBase('/reference/translation-status')">查看翻譯進度 <span>↗</span></a>
      </section>

      <footer class="home-footer">
        <span>OPENCLAW · TRADITIONAL CHINESE FIELD GUIDE</span>
        <span>社群繁體中文改作，非 OpenClaw 官方網站。</span>
        <a :href="withBase('/about/source-license')">來源與授權</a>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.home-experience { position: relative; padding: 0 24px 72px; color: var(--vp-c-text-1); }
.home-wrap { width: min(1120px, 100%); margin: 0 auto; }
.home-proof { display: flex; align-items: center; gap: 28px; padding: 26px 0 34px; border-bottom: 1px solid var(--vp-c-divider); }
.proof-item { display: flex; align-items: baseline; gap: 10px; }
.proof-value { color: var(--vp-c-text-1); font-size: 25px; font-weight: 760; letter-spacing: -.06em; font-variant-numeric: tabular-nums; }
.proof-label { color: var(--vp-c-text-2); font-size: 13px; font-weight: 560; }
.proof-divider { width: 1px; height: 26px; background: var(--vp-c-divider); }
.proof-note { display: flex; align-items: center; gap: 9px; margin-left: auto; color: var(--vp-c-text-2); font-size: 12px; letter-spacing: .04em; }
.status-dot, .terminal-live b { width: 7px; height: 7px; border-radius: 50%; background: #8fc65d; box-shadow: 0 0 0 4px rgba(143, 198, 93, .13); }
.journey-section, .explore-section, .workspace-section { padding-top: 76px; }
.section-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 24px; }
.section-kicker, .journey-overline, .panel-overline { margin: 0 0 10px; color: #658b54; font-size: 10px; font-weight: 800; letter-spacing: .18em; }
.section-heading h2 { margin: 0; color: var(--vp-c-text-1); font-size: clamp(25px, 3.4vw, 35px); line-height: 1.2; letter-spacing: -.055em; }
.section-desc { margin: 10px 0 0; color: var(--vp-c-text-2); font-size: 14px; line-height: 1.8; }
.section-index { flex: none; padding-bottom: 5px; color: var(--vp-c-text-3); font-size: 11px; letter-spacing: .12em; font-variant-numeric: tabular-nums; }
.path-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
.path-tab { display: flex; align-items: center; gap: 12px; padding: 15px 17px; border: 1px solid var(--vp-c-divider); border-radius: 14px; background: var(--vp-c-bg); color: var(--vp-c-text-2); cursor: pointer; font: inherit; font-size: 13px; font-weight: 700; text-align: left; transition: border-color .2s ease, background .2s ease, transform .2s ease, color .2s ease; }
.path-tab:hover { border-color: #8aab71; transform: translateY(-2px); }
.path-tab.active { border-color: #314b3c; background: #20362c; color: #f4f7ee; box-shadow: 0 10px 26px rgba(23, 47, 35, .12); }
.tab-number { color: #9abf78; font-size: 10px; font-weight: 800; letter-spacing: .08em; }
.tab-arrow { margin-left: auto; opacity: .55; }
.journey-intro { display: flex; align-items: center; justify-content: space-between; min-height: 152px; margin-bottom: 14px; padding: 27px 32px; overflow: hidden; border-radius: 18px; background: linear-gradient(115deg, #e7eee1 0%, #eff2e9 58%, #e0ebe2 100%); animation: reveal .35s ease both; }
.journey-overline { color: #658b54; }
.journey-intro h3 { max-width: 660px; margin: 0; color: #20352c; font-size: clamp(23px, 3vw, 31px); font-weight: 740; letter-spacing: -.05em; line-height: 1.35; }
.journey-intro p:last-child { max-width: 650px; margin: 8px 0 0; color: #596b5d; font-size: 13px; line-height: 1.8; }
.journey-stamp { display: grid; flex: none; place-items: center; width: 76px; height: 76px; margin-left: 18px; border: 1px solid rgba(68, 101, 76, .18); border-radius: 50%; color: #42634b; font-size: 22px; font-weight: 780; }
.journey-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; animation: reveal .45s ease both; }
.journey-card { display: flex; min-height: 244px; flex-direction: column; padding: 22px; border: 1px solid var(--vp-c-divider); border-radius: 17px; background: var(--vp-c-bg); transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease; }
.journey-card:hover { transform: translateY(-4px); border-color: rgba(110, 145, 91, .52); box-shadow: 0 16px 38px rgba(30, 48, 36, .08); }
.card-topline { display: flex; align-items: center; min-height: 22px; gap: 8px; }
.card-number { color: var(--vp-c-text-3); font-size: 11px; font-variant-numeric: tabular-nums; }
.card-eyebrow { color: var(--vp-c-text-3); font-size: 9px; font-weight: 800; letter-spacing: .12em; }
.card-badge { margin-left: auto; padding: 5px 8px; border-radius: 5px; background: rgba(126, 159, 97, .12); color: #648449; font-size: 10px; font-weight: 700; white-space: nowrap; }
.tone-blue .card-badge { background: rgba(91, 135, 168, .12); color: #6185a1; }
.tone-coral .card-badge { background: rgba(204, 125, 101, .12); color: #b97964; }
.card-content { margin-top: 28px; }
.card-content h4 { margin: 0; color: var(--vp-c-text-1); font-size: 18px; font-weight: 760; letter-spacing: -.04em; }
.card-content p { margin: 9px 0 0; color: var(--vp-c-text-2); font-size: 12px; line-height: 1.8; }
.card-link { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 20px; color: var(--vp-c-text-1); font-size: 12px; font-weight: 740; text-decoration: none; }
.card-link span { color: #789b61; font-size: 17px; transition: transform .2s ease; }
.card-link:hover span { transform: translate(3px, -3px); }
.search-panel { padding: 22px; border: 1px solid var(--vp-c-divider); border-radius: 18px; background: var(--vp-c-bg); }
.search-box { display: flex; align-items: center; gap: 12px; min-height: 58px; padding: 0 16px; border: 1px solid var(--vp-c-divider); border-radius: 11px; background: var(--vp-c-bg-alt); }
.search-icon { color: #76955e; font-size: 28px; line-height: 1; }
.search-box input { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: var(--vp-c-text-1); font: inherit; font-size: 13px; }
.search-box input::placeholder { color: var(--vp-c-text-3); }
.search-box kbd { flex: none; padding: 4px 7px; border: 1px solid var(--vp-c-divider); border-radius: 5px; color: var(--vp-c-text-3); font-size: 10px; }
.clear-search { flex: none; border: 0; background: transparent; color: var(--vp-c-brand-1); cursor: pointer; font: inherit; font-size: 11px; }
.search-meta { display: flex; justify-content: space-between; padding: 15px 2px 10px; color: var(--vp-c-text-3); font-size: 11px; }
.search-results { display: grid; grid-template-columns: repeat(2, 1fr); column-gap: 18px; }
.search-result { display: flex; align-items: center; gap: 12px; min-width: 0; padding: 14px 4px; border-top: 1px solid var(--vp-c-divider); color: inherit; text-decoration: none; transition: color .2s ease; }
.search-result:hover { color: var(--vp-c-brand-1); }
.result-arrow { display: grid; flex: none; place-items: center; width: 28px; height: 28px; border-radius: 8px; background: var(--vp-c-bg-alt); color: #789b61; font-size: 14px; }
.result-main { display: flex; min-width: 0; flex: 1; flex-direction: column; gap: 4px; }
.result-main strong { overflow: hidden; font-size: 12px; font-weight: 730; text-overflow: ellipsis; white-space: nowrap; }
.result-main small { overflow: hidden; color: var(--vp-c-text-3); font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
.result-status { flex: none; color: var(--vp-c-text-3); font-size: 10px; }
.empty-search { padding: 28px 5px; border-top: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); font-size: 13px; text-align: center; }
.workspace-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.checklist-panel, .terminal-panel { overflow: hidden; border: 1px solid var(--vp-c-divider); border-radius: 18px; background: var(--vp-c-bg); }
.checklist-panel { padding: 23px; }
.checklist-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 14px; border-bottom: 1px solid var(--vp-c-divider); }
.panel-overline { margin-bottom: 5px; color: #789b61; }
.checklist-header h3 { margin: 0; font-size: 20px; letter-spacing: -.04em; }
.progress-ring { position: relative; display: grid; width: 58px; height: 58px; place-items: center; border-radius: 50%; background: conic-gradient(#8eaf6d var(--progress), var(--vp-c-bg-alt) 0); }
.progress-ring::before { position: absolute; width: 46px; height: 46px; border-radius: 50%; background: var(--vp-c-bg); content: ''; }
.progress-ring span { z-index: 1; font-size: 11px; font-weight: 800; font-variant-numeric: tabular-nums; }
.checklist-items { display: grid; gap: 0; padding-top: 8px; }
.check-item { display: flex; align-items: center; gap: 11px; padding: 12px 0; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); cursor: pointer; font-size: 12px; transition: color .2s ease; }
.check-item:last-child { border-bottom: 0; }
.check-item input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.check-custom { display: grid; flex: none; width: 23px; height: 23px; place-items: center; border: 1px solid var(--vp-c-divider); border-radius: 7px; color: var(--vp-c-text-3); font-size: 9px; font-weight: 800; }
.check-item.checked { color: var(--vp-c-text-3); text-decoration: line-through; }
.check-item.checked .check-custom { border-color: #8eaf6d; background: #8eaf6d; color: #20362c; }
.check-item input:focus-visible + .check-custom { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.checklist-footer { display: flex; justify-content: space-between; padding-top: 12px; color: var(--vp-c-text-3); font-size: 10px; }
.reset-progress { border: 0; background: transparent; color: var(--vp-c-brand-1); cursor: pointer; font: inherit; }
.terminal-panel { border-color: #253b31; background: #17251f; color: #ecf2e7; }
.terminal-top { display: flex; align-items: center; gap: 10px; min-height: 45px; padding: 0 16px; border-bottom: 1px solid rgba(255, 255, 255, .09); color: #a9b9a9; font-size: 9px; font-weight: 800; letter-spacing: .12em; }
.terminal-dots { display: flex; gap: 5px; }
.terminal-dots i { width: 7px; height: 7px; border-radius: 50%; background: #d77f6c; }
.terminal-dots i:nth-child(2) { background: #d4b76b; }
.terminal-dots i:nth-child(3) { background: #8caf72; }
.terminal-live { display: flex; align-items: center; gap: 7px; margin-left: auto; color: #a7c798; font-size: 8px; }
.terminal-live b { width: 5px; height: 5px; box-shadow: none; }
.terminal-body { padding: 30px 23px 25px; }
.terminal-comment { margin: 0 0 13px; color: #8da092; font-size: 11px; }
.terminal-command { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 16px 14px; border: 1px solid rgba(219, 236, 208, .15); border-radius: 9px; background: rgba(8, 16, 12, .45); color: #e5f1db; font-family: var(--vp-font-family-mono); font-size: 12px; }
.terminal-command em { color: #a8cf79; font-style: normal; }
.terminal-command button { padding: 6px 10px; border: 1px solid rgba(195, 220, 175, .25); border-radius: 6px; background: rgba(160, 194, 126, .1); color: #c7e4ae; cursor: pointer; font: inherit; font-family: var(--vp-font-family-base); font-size: 10px; }
.terminal-command button:hover { background: rgba(160, 194, 126, .2); }
.terminal-hint { min-height: 32px; margin: 14px 0 8px; color: #a9b9a9; font-size: 11px; line-height: 1.7; }
.terminal-doc-link { display: inline-flex; align-items: center; gap: 7px; color: #c2dda8; font-size: 11px; font-weight: 700; text-decoration: none; }
.principles-strip { display: flex; align-items: center; gap: 17px; margin-top: 64px; padding: 22px 25px; border: 1px solid rgba(120, 153, 94, .23); border-radius: 14px; background: var(--vp-c-bg-alt); }
.principle-mark { display: grid; flex: none; width: 40px; height: 40px; place-items: center; border-radius: 12px; background: #dbe9d1; color: #567849; font-size: 21px; }
.principle-title { margin: 0; color: var(--vp-c-text-1); font-size: 13px; font-weight: 780; }
.principle-desc { max-width: 660px; margin: 5px 0 0; color: var(--vp-c-text-2); font-size: 11px; line-height: 1.7; }
.principles-strip > a { display: flex; flex: none; align-items: center; gap: 7px; margin-left: auto; color: var(--vp-c-brand-1); font-size: 11px; font-weight: 750; text-decoration: none; }
.home-footer { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px 20px; padding: 28px 0 0; color: var(--vp-c-text-3); font-size: 9px; letter-spacing: .07em; }
.home-footer a { color: var(--vp-c-text-2); text-decoration: none; }
.home-footer a:hover { color: var(--vp-c-brand-1); }
@keyframes reveal { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 760px) {
  .home-experience { padding: 0 18px 50px; }
  .home-proof { flex-wrap: wrap; gap: 14px 18px; padding: 22px 0 26px; }
  .proof-divider { height: 19px; }
  .proof-note { width: 100%; margin-left: 0; }
  .journey-section, .explore-section, .workspace-section { padding-top: 52px; }
  .section-heading { align-items: flex-start; }
  .section-index { padding-top: 4px; }
  .path-tabs { gap: 7px; }
  .path-tab { justify-content: center; gap: 7px; padding: 12px 8px; font-size: 11px; }
  .tab-number { display: none; }
  .journey-intro { min-height: auto; padding: 22px; }
  .journey-stamp { width: 51px; height: 51px; font-size: 16px; }
  .journey-cards { grid-template-columns: 1fr; }
  .journey-card { min-height: 190px; }
  .card-content { margin-top: 20px; }
  .search-results { grid-template-columns: 1fr; }
  .workspace-grid { grid-template-columns: 1fr; }
  .principles-strip { align-items: flex-start; flex-wrap: wrap; padding: 18px; }
  .principles-strip > a { margin-left: 57px; }
}
@media (max-width: 420px) {
  .section-heading h2 { font-size: 24px; }
  .proof-item { gap: 6px; }
  .proof-value { font-size: 22px; }
  .proof-label { font-size: 11px; }
  .search-panel { padding: 13px; }
  .search-box { gap: 7px; padding: 0 10px; }
  .search-box kbd { display: none; }
  .result-status { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
</style>
