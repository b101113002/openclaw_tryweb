# OpenClaw 繁體中文教學網站

這個 Repository 用來維護 OpenClaw 的繁體中文學習指南。

## 網站內容

- 領養 OpenClaw：安裝、設定、聊天平台、模型、智能體、維運與安全。
- 龍蝦大學：Skills 與真實情境實作。
- 構建 OpenClaw：Agent 架構、ReAct、工具、Gateway、沙箱與 Skill 開發。
- 參考附錄、台灣繁中術語表、翻譯進度及更新紀錄。

目前已整理第一批繁中教材：第 1、3、4 章為繁中改寫完成，第 2 章為精簡安裝導讀。其他章節頁面會明確標示翻譯進度，不會以摘要或佔位文字冒充完整教材。

## 本機啟動

需要 Node.js 22 或更新版本：

npm install
npm run docs:dev

正式建置：

npm run docs:build
npm run docs:preview

## GitHub Pages 部署

- 正式網站：https://b101113002.github.io/openclaw_tryweb/
- 原始碼及教材維護分支：main。
- 每次推送到 main，.github/workflows/deploy.yml 就會自動執行 VitePress 建置與 GitHub Pages 部署。
- VitePress 會在建置時產生真正的 index.html 與靜態網站檔案，輸出位置為 docs/.vitepress/dist/；不需要在 Repository 根目錄手動放一份 index.html。

**首次設定（只需一次）：**

1. 開啟 Repository 的 Settings → Pages。
2. 在 Build and deployment → Source 選擇 GitHub Actions。
3. 確認 Actions 中的 Deploy OpenClaw Traditional Chinese Guide 工作流程成功完成。

請不要選擇 Deploy from a branch → main / (root)。這個專案使用 VitePress，必須先將 Markdown 編譯成靜態網站；GitHub Actions 會把編譯後的 index.html 發佈至 Pages。

## 技術原則

- 靜態網站：VitePress；不需要資料庫、常駐後端或付費搜尋服務。
- 翻譯模型：以本機 Ollama + IBM Granite 為預設；不使用中國開發的模型。
- 原始教材同步：計畫採 Git commit 差異比對，只抓變動 Markdown，不下載整包 ZIP。
- 授權：保留 Datawhale China／Hello Claw 的來源、作者署名及 CC BY-NC-SA 4.0 改作條件。第三方圖片與嵌入素材須另行確認授權。

## 原始來源

- 上游教材：https://github.com/datawhalechina/hello-claw
- 原始網站：https://datawhalechina.github.io/hello-claw/
- OpenClaw 官方文件：https://docs.openclaw.ai/
