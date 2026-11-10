# OpenClaw 繁體中文教學網站

這個 Repository 用來維護 OpenClaw 的繁體中文學習指南。

## 網站內容

- 領養 OpenClaw：安裝、設定、聊天平台、模型、智能體、維運與安全。
- 龍蝦大學：Skills 與真實情境實作。
- 構建 OpenClaw：Agent 架構、ReAct、工具、Gateway、沙箱與 Skill 開發。
- 參考附錄、台灣繁中術語表、翻譯進度及更新紀錄。

**目前是第一階段起始版，並非所有上游文章都已完成繁體中文翻譯。** 未完成的頁面會明確標示，不會以摘要或佔位文字冒充完整教材。

## 本機啟動

需要 Node.js 22 或更新版本：

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

Repository 已加入 GitHub Actions 部署流程。首次部署前，請到 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。

網站網址：https://b101113002.github.io/openclaw_tryweb/

## 技術原則

- 靜態網站：VitePress；不需要資料庫、常駐後端或付費搜尋服務。
- 翻譯模型：以本機 Ollama + IBM Granite 為預設；不使用中國開發的模型。
- 原始教材同步：計畫採 Git commit 差異比對，只抓變動 Markdown，不下載整包 ZIP。
- 授權：保留 Datawhale China／Hello Claw 的來源、作者署名及 CC BY-NC-SA 4.0 改作條件。第三方圖片與嵌入素材須另行確認授權。

## 原始來源

- 上游教材：https://github.com/datawhalechina/hello-claw
- 原始網站：https://datawhalechina.github.io/hello-claw/
- OpenClaw 官方文件：https://docs.openclaw.ai/
