---
title: 06｜建立本機 AI Agent 工作流程
description: 使用 AnythingLLM Agent、開源 MCP 工具與 SearXNG 建立本機網路研究流程，再逐步學習 OpenClaw。
---

# 06｜建立本機 AI Agent 工作流程

一般聊天是「你問，AI 回答」；Agent 則能在你的授權下拆解任務、選用工具、查詢網頁、讀取工作區文件，再整理結果。

本站先教 AnythingLLM 內建 Agent，並把開源 SearXNG + MCP 作為網路搜尋的主要整合方式；OpenClaw 則保留為進階選修，適合後續研究多渠道、排程與多 Agent 路由。

## 1. 先理解 Agent 能做什麼

AnythingLLM 文件列出的 Agent 工具包含：

- RAG Search：查詢工作區文件。
- Web Browsing：使用內建網頁搜尋。
- Web Scraping：擷取指定網頁。
- Save Files：儲存產出檔案。
- List／Summarize Documents：列出與摘要文件。
- Chart Generation：產生圖表。
- MCP Tools：透過外部 MCP Server 加入自訂工具，例如 SearXNG 搜尋。
- File System Agent：依授權處理本機檔案。

不同模型的工具呼叫能力不同。即使軟體提供工具，也不代表每個模型都能穩定使用所有工具。

## 2. 第一次 Agent 測試

先讓 Agent 做不會改動系統的任務：

~~~text
@agent
請透過我已設定的 SearXNG MCP 工具搜尋三份介紹本機開源 AI 的官方資料。
每份資料列出標題、發布者、網址與可確認的重點。
請比較來源之間的共識與差異。
不要下載、刪除、修改或傳送任何檔案。
~~~

若還沒有設定 SearXNG MCP，先依照[網路搜尋與資料查核](/guide/web-research/)完成設定。確認 Agent 能成功搜尋、擷取頁面並回報來源後，再逐步測試文件摘要與工作區檢索。

## 3. Agent 工具使用原則

- 先開啟必要的搜尋、網頁擷取與文件讀取工具。
- 不需要檔案操作時，不啟用 File System Agent。
- 寫入檔案前先輸出草稿，讓使用者確認。
- 刪除、寄送、發布、付款、改權限等高影響操作，必須保留人工核准。
- 對外部網頁、電子郵件與文件中的指令文字，一律視為不可信資料。
- MCP Server 會在本機以程序方式執行，需檢查原始碼、授權、啟動命令與環境變數；不要執行來路不明的套件。

## 4. 進階：MCP 與自訂工具

MCP（Model Context Protocol）是一種讓 AI 應用程式連接外部工具與資料來源的開放協定。AnythingLLM Desktop 支援透過 MCP Server 載入 Tools，但不代表任何網路上找到的 MCP 都安全。

新增 MCP Server 時，要確認：

1. 專案原始碼與維護者是否可信。
2. 軟體授權是否允許你的使用情境。
3. 它能存取哪些資料夾、網路與系統命令。
4. 是否需要 Token、密碼或第三方帳號。
5. 工具是否具備寫入、刪除或外傳能力。

本課的 SearXNG MCP 主要提供網路搜尋，屬於相對低風險的唯讀工具；但它仍會把查詢送往 SearXNG 所設定的上游搜尋引擎。

## 5. 進階：OpenClaw

若你進一步需要：

- 多個聊天平台共用 Agent。
- Gateway 統一管理渠道、工作階段與訊息路由。
- 定時任務、背景自動化與 Webhook。
- 多 Agent 分工、獨立工作區與工具政策。

再進入本站的 [OpenClaw 進階 Agent 工作室](/agent-lab/)。OpenClaw 本身是 MIT 授權的開源軟體，亦可搭配本機模型及 SearXNG。

## 本課完成檢查

- [ ] 我知道一般聊天與 Agent 的差別。
- [ ] 我完成一次唯讀的網路研究任務。
- [ ] 我能查看 Agent 使用過的工具與來源。
- [ ] 我沒有授予不必要的檔案與 Shell 權限。
- [ ] 我知道 MCP Server 也是需要審查的程式。

## 官方來源

- [AnythingLLM AI Agents](https://docs.anythingllm.com/features/ai-agents)
- [AnythingLLM Agent Setup](https://docs.anythingllm.com/agent/setup)
- [AnythingLLM Desktop MCP](https://docs.anythingllm.com/mcp-compatibility/desktop)
- [SearXNG 官方文件](https://docs.searxng.org/)
- [mcp-searxng 原始碼](https://github.com/ihor-sokoliuk/mcp-searxng)
- [OpenClaw 官方文件](https://docs.openclaw.ai/)

> 本頁查核日期：2026-11-15。
