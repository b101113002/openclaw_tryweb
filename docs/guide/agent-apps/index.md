---
title: 08｜AI Agent 應用選擇與架構比較
description: 比較本機對話助理、通用 Agent、程式開發 Agent 與視覺化工作流平台。
---

# 08｜AI Agent 應用選擇與架構比較

AI Agent 不是單一產品類別。有些是本機對話室，有些能操作 Linux 工作環境，有些專門寫程式，還有些是拖拉節點建立工作流程。先依工作需求選擇，再考慮模型與技能，不要一開始就安裝很多套工具。

## 1. 先看應用類型

| 需求 | 優先研究 | 授權／定位 | 適合情境 |
|---|---|---|---|
| 日常對話、文件問答、RAG | [AnythingLLM Desktop](https://github.com/Mintplex-Labs/anything-llm) | MIT | 本機聊天、知識庫、Agent 入門；本課程主線 |
| 通用型本機 Agent | [Agent Zero](https://github.com/agent0ai/agent-zero) | MIT | 有自己的 Linux 工作環境，可研究、寫程式與處理檔案；支援 Ollama 等本機模型服務 |
| AI 程式開發與專案維護 | [OpenHands](https://github.com/OpenHands/OpenHands) | MIT | 程式碼探索、修改、測試、Issue 分工與自動化；可連接 Ollama、LM Studio、vLLM、SGLang 等本機模型服務 |
| 視覺化 Agent／RAG 工作流 | [Flowise](https://github.com/FlowiseAI/Flowise) | 核心多數 Apache-2.0；Enterprise 目錄部分採商業授權 | 以節點串接模型、工具、檢索與流程 |
| 完整 LLM 應用平台 | [Dify](https://github.com/langgenius/dify) | Dify Open Source License：以 Apache-2.0 為基礎，附加條件 | 建立聊天應用、RAG、Agent 與工作流；授權條款需先核對 |
| 多渠道與長期自動化 | [OpenClaw](https://github.com/openclaw/openclaw) | MIT | 聊天平台整合、排程、Gateway、Webhook、多 Agent；進階選修 |
| 大型 MoE 本機推論引擎 | [Colibrì](https://github.com/JustVugg/colibri) | Apache-2.0 | 不是 Agent 介面，而是讓大型 MoE 模型分層使用 GPU、RAM 與 NVMe 的推論引擎 |

Flowise 的 Enterprise 相關程式碼不全都採 Apache-2.0；Dify 也不是單純原封不動的 Apache-2.0。若你要求每個元件都採標準 OSI 開源授權，請先確認實際使用的子目錄、版本與授權，而不是只看專案首頁的「open source」標籤。

## 2. 我建議的學習順序

### 第一階段：先有一個穩定的 AI 工作台

繼續使用 AnythingLLM Desktop，完成本機聊天、文件問答、基本 Agent 與 SearXNG 搜尋。這階段不要追求多 Agent，也不需要立刻安裝完整流程平台。

### 第二階段：依任務選一個 Agent

- **研究、文件與日常任務：**先測 AnythingLLM Agent；想讓 Agent 操作受控 Linux 工作區，再研究 Agent Zero。
- **程式開發：**選 OpenHands，讓它在獨立專案與隔離執行環境中讀取程式、編輯與測試。
- **視覺化工作流：**選 Flowise；若需要更多應用發布、RAG 與團隊管理功能，再研究 Dify，但先審閱其附加授權條款。
- **跨平台訊息與長期自動化：**等你熟悉權限與工具後，再進入 OpenClaw。

### 第三階段：再加入技能與工具

先確認 Agent 本身已能完成一件明確任務，再用 MCP 或 Agent Skills 擴充。不要把工具數量當成能力指標。工具越多，權限、憑證與提示詞注入的風險面也會增加。

## 3. 本機模型相容性檢查

「支援本機模型」不代表每個小模型都適合 Agent。部署前確認：

1. Agent 支援的模型連線方式：Ollama、OpenAI-compatible URL、LM Studio 或其他 Provider。
2. 模型是否具備工具呼叫能力，且輸出格式符合 Agent 的要求。
3. 上下文長度是否足以容納 system prompt、技能說明、工具定義與任務內容。
4. Embedding 模型是否也能本機執行；不要只把聊天模型設成本機，卻把文件向量化送往雲端。
5. 軟體的遙測、登入、遠端連線與更新機制是否符合你的隱私需求。

## 4. 權限與沙盒

Agent Zero、OpenHands 等工具可以操作檔案、終端機或瀏覽器。即使專案提供 Docker sandbox，也不表示可以放心授予整個家目錄、SSH 金鑰、瀏覽器登入狀態或所有磁碟權限。

建議預設：
- 為每個 Agent 建立獨立專案資料夾。
- 先開唯讀工具，確認流程後再逐步開放寫入權限。
- 任何刪除、寄信、發布、付款、變更帳號權限等操作均保留人工核准。
- 不在提示詞、Markdown 或 Skill 檔案中保存 API Key、密碼或個資。
- 記錄模型、工具、版本、資料來源與每次測試結果。

## 官方來源

- [AnythingLLM GitHub](https://github.com/Mintplex-Labs/anything-llm)
- [Agent Zero GitHub 與安裝文件](https://github.com/agent0ai/agent-zero)
- [Agent Zero 本機 Ollama 設定](https://github.com/agent0ai/agent-zero/blob/main/docs/setup/installation.md)
- [OpenHands GitHub](https://github.com/OpenHands/OpenHands)
- [OpenHands 本機模型連線指南](https://github.com/OpenHands/docs/blob/main/openhands/usage/llms/local-llms.mdx)
- [Flowise GitHub 與授權](https://github.com/FlowiseAI/Flowise)
- [Dify GitHub 與授權](https://github.com/langgenius/dify)
- [OpenClaw 官方文件](https://docs.openclaw.ai/)
- [Colibrì GitHub](https://github.com/JustVugg/colibri)

> 本頁查核日期：2026-11-15。產品功能、模型 Provider 與授權可能變動；安裝或部署前請核對官方文件及實際使用版本。
