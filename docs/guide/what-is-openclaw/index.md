---
title: 01｜認識本機 AI 工作站
description: 理解本機模型、AI 對話室、文件知識庫、網路搜尋與 Agent 工具之間的分工。
---

# 01｜認識本機 AI 工作站

本機 AI 不只是下載一個模型檔案。要真正用得順手，你需要一個地方跟 AI 對話、一個負責運行模型的引擎、可選擇的文件知識庫，以及讓 Agent 搜尋網路或執行任務的工具。

本站採用「先簡單、再擴充」的方式：先用 AnythingLLM Desktop 建立一個本機 AI 工作區。需要更進一步時，再連接 Ollama、SearXNG、MCP 或 OpenClaw。

## 五個主要元件

| 元件 | 本課預設方案 | 負責什麼 |
|---|---|---|
| AI 對話介面 | AnythingLLM Desktop | 管理對話、工作區、文件及 Agent |
| 本機推論引擎 | AnythingLLM 內建引擎（Lemonade／llama.cpp） | 使用自己的 CPU／GPU 執行模型 |
| 模型權重 | Gemma 4、Granite 4.0 等 | 生成文字、理解任務、部分模型可呼叫工具 |
| 文件知識庫 | AnythingLLM Workspace／RAG | 將自己的 PDF、筆記與文件提供給模型查詢 |
| 網路搜尋與工具 | 內建 DuckDuckGo；進階可加 SearXNG、MCP 或 OpenClaw | 查詢網頁、擷取資料與執行工作流程 |

## 資料如何流動？

```text
你在本機對話室輸入問題
          │
          ▼
      AnythingLLM
          │
          ├── 本機文件／知識庫
          │
          ├── 本機模型引擎
          │      └── Gemma／Granite 等模型權重
          │
          └── Agent 工具（需要時）
                 ├── 網路搜尋
                 ├── 網頁擷取
                 └── 其他經授權工具
```

一般聊天與本機文件問答可以完全由本機模型處理。只有當你要求搜尋網頁、下載模型、更新軟體或使用其他網路工具時，才會產生外部網路連線。

## 為什麼先用 AnythingLLM？

AnythingLLM Desktop 是 MIT 授權的開源桌面應用程式，官方提供 Windows、macOS、Linux 版本；桌面版標示不需要註冊、Email 驗證或信用卡。它有本機模型、文件問答與 Agent 功能，適合當作第一個整合式工作台。

本機模型可使用內建引擎，不必一開始就另外安裝 Ollama；若日後想集中管理不同模型或讓多個應用程式共用模型服務，再選擇安裝 Ollama。

## 開源軟體與模型授權要分開看

軟體可以有 MIT 或 Apache-2.0 授權；模型則可能只公開權重，未必公開完整訓練資料、程式碼或訓練流程。本站會在每個模型旁標出授權，並使用「公開權重模型」等精確用語，不會把所有可下載模型一律宣稱為完整開源。

## 本課完成檢查

- [ ] 我知道對話介面與模型引擎不是同一件事。
- [ ] 我知道本機模型可以在沒有雲端 API Key 的情況下運作。
- [ ] 我知道文件問答與網路搜尋是不同的資料來源。
- [ ] 我知道要求搜尋網頁時，搜尋字詞仍會送到外部搜尋服務。
- [ ] 我知道公開權重不等於訓練資料完全公開。

## 官方來源

- [AnythingLLM GitHub（MIT）](https://github.com/Mintplex-Labs/anything-llm)
- [AnythingLLM Desktop 介紹](https://docs.anythingllm.com/installation-desktop/overview)
- [AnythingLLM 內建本機模型引擎](https://docs.anythingllm.com/setup/llm-configuration/local/built-in)
- [AnythingLLM Agent 功能](https://docs.anythingllm.com/features/ai-agents)

> 本頁查核日期：2026-11-10。
