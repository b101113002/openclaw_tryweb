import { defineConfig } from 'vitepress'
const base = process.env.BASE_PATH || '/'

const guide = [
  { text: '學習地圖', link: '/guide/' },
  { text: '01｜認識本機 AI 工作站', link: '/guide/what-is-openclaw/' },
  { text: '02｜安裝 AnythingLLM Desktop', link: '/guide/install/' },
  { text: '03｜完成第一次本機對話', link: '/guide/first-assistant/' },
  { text: '04｜網路搜尋與資料查核', link: '/guide/web-research/' },
  { text: '05｜選擇非中國開發模型', link: '/guide/models/' },
  { text: '06｜建立 AI Agent 工作流程', link: '/guide/agent-workflows/' },
  { text: '07｜安全與資料邊界', link: '/guide/safety/' }
]
const adoptionArchive = [
  { text: '舊版教材導讀', link: '/adopt/intro/' },
  { text: '第三方桌面方案（選讀）', link: '/adopt/chapter1/' },
  { text: '手動安裝參考', link: '/adopt/chapter2/' },
  ...Array.from({ length: 9 }, (_, i) => ({ text: `參考章節 ${i + 3}`, link: `/adopt/chapter${i + 3}/` }))
]
const build = [
  { text: 'OpenClaw 進階開發導覽', link: '/build/intro/' },
  ...Array.from({ length: 10 }, (_, i) => ({ text: `第 ${i + 1} 章｜架構與開發`, link: `/build/chapter${i + 1}/` })),
  { text: 'Skill 開發實作', link: '/build/skill-practice/' }
]
const projects = [
  { text: '實戰專題地圖', link: '/university/intro/' },
  ...[['email-assistant','郵件助理實戰'],['daily-briefing','早晨摘要自動化'],['calendar-ops','智慧行事曆管理'],['local-health-assistant','本機健康管理助理'],['vibe-coding','Vibe Coding 實作'],['ci-cd-assistant','CI/CD 助理'],['docs-automation','文件自動產生'],['vibe-research','自動化研究'],['content-studio','內容創作工作室'],['revops-assistant','客戶支援與 CRM'],['meeting-ops','會議與紀錄自動化'],['multi-claw-hiclaw','多智能體協作'],['knowledge-base','知識庫共享與檢索'],['one-person-company','一人公司工作流'],['paper-assistant','論文推送助理'],['smart-home-control','智慧家庭控制'],['finance-research','金融資料研究'],['training-assistant','教育訓練助理'],['security','安全檢查清單'],['group-debate','多智能體群組討論']].map(([id,text])=>({text,link:`/university/${id}/`}))
]
const appendices = 'abcdefg'.split('').map(letter => ({ text: `附錄 ${letter.toUpperCase()}`, link: `/appendix/appendix-${letter}/` }))
export default defineConfig({
  lang: 'zh-TW',
  title: '本機開源 AI 助理教學',
  description: '以繁體中文學習本機 AI 對話室、文件知識庫、網路搜尋與 AI Agent；優先使用開源軟體與非中國開發模型。',
  base,
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '本機開源 AI 教學',
    nav: [
      { text: '本機 AI 入門', link: '/guide/' },
      { text: '實戰專題', link: '/university/intro/' },
      { text: 'Agent 工作室', link: '/agent-lab/' },
      { text: 'OpenClaw 進階', link: '/build/intro/' },
      { text: '參考資源', link: '/reference/glossary' },
      { text: 'GitHub', link: 'https://github.com/b101113002/openclaw_tryweb' }
    ],
    sidebar: {
      '/guide/': [{ text: '本機 AI 助理｜原創教學', items: guide }],
      '/agent-lab/': [{ text: 'OpenClaw 進階 Agent 工作室', items: [{ text: '範例總覽', link: '/agent-lab/' }] }],
      '/adopt/': [{ text: 'OpenClaw 舊版教材整理', items: adoptionArchive }],
      '/build/': [{ text: 'OpenClaw 進階開發', items: build }],
      '/university/': [{ text: '實戰專題', items: projects }],
      '/appendix/': [{ text: '參考附錄', items: appendices }],
      '/reference/': [{ text: '參考資源', items: [{ text: '繁中術語表', link: '/reference/glossary' }, { text: '教材狀態', link: '/reference/translation-status' }, { text: '更新紀錄', link: '/reference/changelog' }] }]
    },
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '本頁目錄' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: {
      message: '獨立社群教學專案，非 AnythingLLM、OpenClaw 或模型開發商官方網站。',
      copyright: '軟體與模型授權、來源及查核日期請見各教材頁面。'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/b101113002/openclaw_tryweb' }]
  }
})
