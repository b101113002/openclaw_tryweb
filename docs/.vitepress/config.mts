import { defineConfig } from 'vitepress'
const base = process.env.BASE_PATH || '/'
const adoption = [
  { text: '學習導覽', link: '/adopt/intro' },
  { text: '第 1 章｜AutoClaw 一鍵安裝', link: '/adopt/chapter1' },
  { text: '第 2 章｜手動安裝 OpenClaw', link: '/adopt/chapter2' },
  ...Array.from({ length: 9 }, (_, i) => ({ text: `第 ${i + 3} 章｜使用與維運教學`, link: `/adopt/chapter${i + 3}` }))
]
const build = [
  { text: '開發篇導覽', link: '/build/intro' },
  ...Array.from({ length: 10 }, (_, i) => ({ text: `第 ${i + 1} 章｜架構與開發`, link: `/build/chapter${i + 1}` })),
  { text: 'Skill 開發實作', link: '/build/skill-practice' }
]
const university = [
  { text: '課程導覽', link: '/university/intro' },
  ...[['email-assistant','郵件助理實戰'],['daily-briefing','早晨摘要自動化'],['calendar-ops','智慧行事曆管理'],['local-health-assistant','本機健康管理助理'],['vibe-coding','Vibe Coding 實作'],['ci-cd-assistant','CI/CD 助理'],['docs-automation','文件自動產生'],['vibe-research','自動化研究'],['content-studio','內容創作工作室'],['revops-assistant','客戶支援與 CRM'],['meeting-ops','會議與紀錄自動化'],['multi-claw-hiclaw','多智能體協作'],['knowledge-base','知識庫共享與檢索'],['one-person-company','一人公司工作流'],['paper-assistant','論文推送助理'],['smart-home-control','智慧家庭控制'],['finance-research','金融資料研究'],['training-assistant','教育訓練助理'],['security','安全檢查清單'],['group-debate','多智能體群組討論']].map(([id,text])=>({text,link:`/university/${id}`}))
]
const appendices = 'abcdefg'.split('').map(letter => ({ text: `附錄 ${letter.toUpperCase()}`, link: `/appendix/appendix-${letter}` }))
export default defineConfig({
  lang:'zh-TW', title:'OpenClaw 繁體中文學習指南',
  description:'從安裝、設定、情境實戰到系統架構，循序學習 OpenClaw。',
  base, cleanUrls:true,
  themeConfig:{
    logo:'/logo.svg', siteTitle:'OpenClaw 繁中指南',
    nav:[{text:'領養 OpenClaw',link:'/adopt/intro'},{text:'龍蝦大學',link:'/university/intro'},{text:'構建 OpenClaw',link:'/build/intro'},{text:'參考資料',link:'/reference/glossary'},{text:'GitHub',link:'https://github.com/b101113002/openclaw_tryweb'}],
    sidebar:{
      '/adopt/':[{text:'領養 OpenClaw｜使用篇',items:adoption}],
      '/build/':[{text:'構建 OpenClaw｜開發篇',items:build}],
      '/university/':[{text:'龍蝦大學｜情境實戰',items:university}],
      '/appendix/':[{text:'參考附錄',items:appendices}],
      '/reference/':[{text:'參考資料',items:[{text:'繁中術語表',link:'/reference/glossary'},{text:'翻譯進度',link:'/reference/translation-status'},{text:'更新紀錄',link:'/reference/changelog'}]}]
    },
    search:{provider:'local'}, outline:{level:[2,3],label:'本頁目錄'},
    docFooter:{prev:'上一篇',next:'下一篇'},
    footer:{message:'本網站為社群繁體中文翻譯改作，非 OpenClaw 或 Datawhale 官方網站。',copyright:'原始教材依 CC BY-NC-SA 4.0 授權；詳見來源與授權說明。'},
    socialLinks:[{icon:'github',link:'https://github.com/b101113002/openclaw_tryweb'}]
  }
})
