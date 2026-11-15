# 更新紀錄

## 2026-11-15｜將開源網路搜尋接入 AnythingLLM Agent

- 調整搜尋教學定位：以 SearXNG（AGPL-3.0）+ mcp-searxng（MIT）作為開源軟體路線，DuckDuckGo 只保留為免設定備用。
- 新增 SearXNG 官方 Docker Compose 安裝流程、限制本機監聽、JSON 格式設定與服務管理說明。
- 新增 AnythingLLM Desktop MCP 設定範例，透過 mcp-searxng 連接自架 SearXNG。
- 補充 Node.js 20+、Docker／Podman 需求，以及上游搜尋引擎仍可能限流的限制。
- 更新首頁、課程地圖、Agent 課程、README 與教材狀態，避免把第三方非開源搜尋服務稱為全開源方案。

## 2026-11-15｜更新本機模型選型與硬體實測指南

- 將現行 IBM 模型候選更新為 Granite 4.2，避免繼續把 Granite 4.0 當成最新主推版本。
- 加入 Gemma 4 E2B、E4B、12B 與 Granite 4.2 3B、8B 的官方量化記憶體估算。
- 新增依系統 RAM、GPU VRAM 與 Apple Silicon 統一記憶體的入門選型表。
- 加入繁體中文、文件摘要、資料不足判斷、網路來源與 Agent 工具呼叫的實測清單。
- 補充 AnythingLLM 新版 Lemonade／llama.cpp 內建引擎、Hugging Face GGUF 匯入及 ModelScope fallback 注意事項。
- 更新安裝課程、學習地圖與 README，讓使用者在下載模型前先核對硬體。

## 2026-11-10｜課程轉型：本機開源 AI 對話室與 Agent

- 將網站定位改為「本機開源 AI 助理教學」。
- 主要課程從 OpenClaw 單一產品教學，改為本機 AI 對話室、文件知識庫、網路搜尋與 Agent 自動化。
- 選擇 AnythingLLM Desktop 作為新手主力平台：MIT 授權、桌面版免帳號、內建本機模型引擎。
- 將 AnythingLLM 內建模型來源指定為 Hugging Face，不使用 Automatic → ModelScope fallback。
- 新增免 API Key 網路搜尋課程，說明 DuckDuckGo、SearXNG 與上游搜尋引擎限流的差異。
- 模型候選優先選用 Google Gemma 4 與 IBM Granite 4.0，並清楚區分公開權重與完整開源。
- OpenClaw 保留為進階 Agent 路線，不再是所有新手的必要安裝項目。
- 更新首頁、導覽、學習清單、README、教材狀態與授權／來源頁面的對應描述。

## 2026-11-10｜網站轉型：從翻譯整理改為原創教學

- 將主要導覽改為「OpenClaw 入門」、「實戰專題」、「Agent 工作室」、「進階開發」與「參考資源」。
- 新增原創入門課程與安全使用邊界。
- 將早期 Hello Claw 改作內容移至「舊版教材整理」區，保留既有網址。
- 區分本站原創教學、上游改作、官方文件與第三方素材。

## 2026-11-10｜Agent 實作工作室與閱讀體驗

- 新增單功能 Agent、多 Agent 研究團隊與個人工作台範例。
- 新增文章閱讀進度、已讀標記、複製連結與列印工具。
- 新增本機模型與權限安全說明。

## 2026-11-10｜網站第一階段

- 建立 VitePress 繁體中文教學網站。
- 建立情境專題、進階開發與附錄導覽。
- 加入本機全文搜尋、台灣繁中術語表與來源授權說明。
- 加入 GitHub Pages Actions 部署工作流程。
