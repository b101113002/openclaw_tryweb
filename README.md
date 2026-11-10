# 本機開源 AI 助理教學｜繁體中文

這個 Repository 維護一套以台灣繁體中文撰寫、實作導向的本機 AI 教學網站。主線是本機 AI 對話室、文件知識庫、免 API Key 網路搜尋與 AI Agent 工作流程。

## 網站內容

- **本機 AI 入門**：以 AnythingLLM Desktop 建立 AI 對話室，使用本機模型，完成文件問答與基本操作。
- **網路搜尋與資料查核**：使用不需搜尋 API Key 的路線，認識 DuckDuckGo、SearXNG 及搜尋引擎限流。
- **模型選擇**：優先採 Google Gemma 4、IBM Granite 4.0 等非中國開發、授權透明的公開權重模型。
- **Agent 實戰**：先學 AnythingLLM 內建 Agent，再進階使用 MCP、SearXNG 與 OpenClaw。
- **參考資源**：繁中術語、教材狀態、來源與授權說明。

早期依 Datawhale China／Hello Claw 整理的參考教材仍保留在「舊版教材整理」區。OpenClaw 由主線必修改為進階選修，不再要求新手先安裝一整套 Agent Gateway。

## 預設工具與原則

- AnythingLLM Desktop：MIT 授權；桌面版可免帳號使用，負責聊天、文件與 Agent 介面。
- AnythingLLM 內建模型引擎：使用 Lemonade／llama.cpp 在本機執行模型。
- 模型來源：明確選 Hugging Face，不使用 Automatic → ModelScope fallback。
- 模型候選：Google Gemma 4、IBM Granite 4.0；逐一標示授權，不把開放權重誤稱為訓練資料完全開放。
- 網路搜尋：入門先用 AnythingLLM 內建 DuckDuckGo，進階再自架 SearXNG；不要求申請搜尋 API Key。
- 高階 Agent：OpenClaw（MIT）作為選修，優先連接本機模型。

搜尋服務仍需連網，外部搜尋引擎可能限流或要求 CAPTCHA；網站不承諾永久無限搜尋。使用者需核對 AI 回答的原始來源及日期。

## 本機啟動

需要 Node.js 22 或更新版本（建置教學網站用）：

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

## 教材原則

- 本機優先；雲端 API、額度制搜尋與信用卡綁定不是入門必需。
- 模型優先選用非中國開發團隊，且來源與授權可追溯。
- 每個軟體與模型均分開說明授權；公開權重不自動等於完整開源。
- 不把網路搜尋的免 API Key 說成無限流量；清楚說明上游引擎限制。
- Agent 預設最小權限；寫入、刪除、傳送與其他高影響操作要求人工確認。
- 原創教學、上游改作、官方文件與第三方素材分別標示來源及權利。

## 主要來源

- AnythingLLM：https://github.com/Mintplex-Labs/anything-llm
- Google Gemma：https://ai.google.dev/gemma/
- IBM Granite：https://www.ibm.com/granite/
- SearXNG：https://docs.searxng.org/
- OpenClaw：https://docs.openclaw.ai/
- 早期參考教材 Datawhale China／Hello Claw：https://github.com/datawhalechina/hello-claw

授權與來源細節請見網站的「來源與授權」頁面。
