---
layout: home
hero:
  name: "Local AI"
  text: "把 AI 留在自己的電腦，也讓它能幫你查資料。"
  tagline: "從本機 AI 對話室、文件知識庫到開源網路搜尋與 Agent 自動化。以開源軟體、非中國開發模型與免註冊的實作路線為主。"
  image:
    src: /hero-mark.svg
    alt: "以環形節點與龍蝦意象構成的本機 AI 學習主視覺"
    width: 420
    height: 420
  actions:
    - theme: brand
      text: 開始本機 AI 入門
      link: /guide/
    - theme: alt
      text: 先建立 AI 對話室
      link: /guide/install/
    - theme: alt
      text: 學習 AI Agent
      link: /guide/agent-workflows/
---

## 不必先申請一堆 API Key，也能建立自己的 AI 助理

我們把課程主線改成本機優先：先用一套桌面程式完成聊天、模型與文件問答，再透過自架 SearXNG + 開源 MCP Server 加入網路搜尋。雲端模型、付費額度與信用卡不是入門必需；SearXNG 搜尋進階設定需要 Docker／Podman。

## 本機 AI 對話室

使用 AnythingLLM Desktop 作為第一個實作平台。官方桌面版支援 Windows、macOS 與 Linux，無須註冊帳號；可連接內建本機模型引擎，或進階改接 Ollama。

[開始安裝 AnythingLLM Desktop →](/guide/install/)

## 使用開源軟體搜尋網路資料

以 SearXNG 作為自架的開源搜尋聚合引擎，再透過 mcp-searxng 接到 AnythingLLM Agent，不需要商業搜尋 API Key。搜尋結果仍來自外部網站與上游搜尋引擎，可能限流或要求 CAPTCHA；每堂課都會教你查看來源與查核日期。

[開始網路研究教學 →](/guide/web-research/)

## 進一步建立 Agent

等本機模型與對話室穩定後，再學習工具呼叫、MCP、排程與 OpenClaw 多 Agent。所有高影響操作預設都要有人確認。

[進入 Agent 實作課程 →](/guide/agent-workflows/)
