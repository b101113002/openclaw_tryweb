# OpenClaw 實作教學｜繁體中文

這個 Repository 維護一套以台灣繁體中文撰寫、操作導向的 OpenClaw 教學網站。目標不是逐章翻譯其他教材，而是重新設計課程、建立可驗收的操作流程，並用官方文件與實際測試持續查核。

## 網站內容

- **OpenClaw 入門**：核心架構、環境準備、安裝、第一次對話與安全使用。
- **實戰專題**：郵件、行事曆、知識庫、研究、自動化與多 Agent 情境。
- **Agent 工作室**：可自行修改的本機 Agent、Skills 與多 Agent 範例。
- **進階開發**：Agent 架構、工具、Gateway 與 Skill 開發。
- **參考資源**：繁中術語、教材狀態、來源與授權說明。

早期依 Datawhale China／Hello Claw 整理的參考教材仍保留在「舊版教材整理」區，並保留來源與授權註記；新課程不再沿用上游章節作為主要教學架構。

## 本機啟動

需要 Node.js 22 或更新版本（建置網站用）：

```bash
npm install
npm run docs:dev
```

正式建置：

```bash
npm run docs:build
npm run docs:preview
```

## GitHub Pages 部署

- 正式網站：https://b101113002.github.io/openclaw_tryweb/
- 原始碼與教材維護分支：main。
- 每次推送到 main，.github/workflows/deploy.yml 會自動執行 VitePress 建置與 GitHub Pages 部署。
- VitePress 建置輸出位置為 docs/.vitepress/dist/。

首次設定請至 Repository 的 Settings → Pages，將 Build and deployment → Source 設為 GitHub Actions。不要選擇 Deploy from a branch → main / (root)。

## 教材原則

- 以自行編寫的繁體中文教學、實作範例與驗收清單為主。
- 安裝步驟、CLI 參數與設定鍵優先查閱 OpenClaw 官方文件，不以舊截圖或舊版教學推測目前行為。
- 技術內容標示查核日期與版本差異；未實測的環境不宣稱已通過。
- 本機優先，優先研究開源與非中國開發的模型；同時清楚標示雲端 API 費用與資料傳輸風險。
- 預設採最小權限與人工確認，不把 AI 提示詞當成安全邊界。
- 原創教學、上游改作、官方文件與第三方素材分別標示來源及權利。

## 來源

- OpenClaw 官方文件：https://docs.openclaw.ai/
- OpenClaw 官方 Repository：https://github.com/openclaw/openclaw
- 早期參考教材 Datawhale China／Hello Claw：https://github.com/datawhalechina/hello-claw

授權與來源細節請見網站的[來源、署名與授權說明](https://b101113002.github.io/openclaw_tryweb/about/source-license)。
