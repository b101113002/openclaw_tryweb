# OpenClaw 繁體中文教學網站

這個 Repository 用來維護 OpenClaw 的繁體中文學習指南。

## 專案現況

目前先放入可部署的網站起始專案，包含 VitePress 網站骨架、三大課程區導覽、繁中術語與翻譯進度頁、本機翻譯腳本、上游 Markdown 差異同步腳本，以及 GitHub Pages 部署設定。

**注意：這是第一階段起始版，並非所有上游文章都已完成繁體中文翻譯。** 各頁會明確標示待翻譯；不會把摘要或佔位文字冒充完整教材。

## 專案檔案

完整網站原始碼收納在 `.site/hello-claw-zh-tw-starter.zip`。GitHub Actions 會在建置時解壓縮並部署其中的 VitePress 網站。

下載原始碼：開啟 `.site/hello-claw-zh-tw-starter.zip`，按 Download raw 後解壓縮即可。

## 本機啟動

解壓縮網站起始專案後，在專案資料夾執行：

```bash
npm install
npm run docs:dev
```

## 部署

此 Repository 已加入 GitHub Actions Pages 工作流程。每次推送到 `main` 時，會自動安裝相依套件、建置 VitePress，並部署到 GitHub Pages。

預定網站網址：

https://b101113002.github.io/openclaw_tryweb/

首次部署前，請到 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。

## 技術原則

- 靜態網站：VitePress；不需要資料庫、常駐後端或付費搜尋服務。
- 翻譯：以本機 Ollama + IBM Granite 4.2 為預設；禁止使用中國開發的模型。
- 上游同步：只抓取變動的 Markdown，不下載整包原始 Repository。
- 授權：保留 Datawhale China／Hello Claw 的來源、作者署名及 CC BY-NC-SA 4.0 改作條件。正式公開前仍須逐項確認第三方圖片及嵌入素材授權。

## 原始來源

- 上游教材：https://github.com/datawhalechina/hello-claw
- OpenClaw 官方文件：https://docs.openclaw.ai/
- 本 Repository：https://github.com/b101113002/openclaw_tryweb
