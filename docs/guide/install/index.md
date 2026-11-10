---
title: 02｜安裝 AnythingLLM Desktop
description: 只用一套桌面程式建立本機 AI 對話室，不需要雲端帳號或模型 API Key。
---

# 02｜安裝 AnythingLLM Desktop

本課先選擇最少安裝步驟的路線：使用 AnythingLLM Desktop，透過內建模型引擎在自己的電腦執行模型。完成本課不需要註冊 OpenAI、Google、Anthropic、OpenRouter 或其他雲端 AI 帳號。

## 1. 下載官方桌面程式

前往 [AnythingLLM 官方下載頁](https://anythingllm.com/download)，依照作業系統選擇安裝檔：

| 系統 | 下載選項 |
|---|---|
| Windows | x64 或 ARM64 |
| macOS | Apple Silicon 或 Intel |
| Linux | 官方提供的桌面版安裝方式 |

請只從 AnythingLLM 官方下載頁或 [GitHub 官方 Repository](https://github.com/Mintplex-Labs/anything-llm)取得程式。不要從論壇、網路硬碟或不明整合包下載。

## 2. 第一次啟動

1. 安裝並開啟 AnythingLLM Desktop。
2. 依畫面完成初次設定。
3. 選擇桌面版內建模型引擎（Built-in）。
4. 選擇一個非中國開發團隊發布、授權清楚的模型。
5. 等待模型下載完成，再開啟新工作區。

AnythingLLM 官方表示，桌面版提供本機模型引擎，透過 Lemonade 與 llama.cpp 在 CPU／GPU 上執行；一般使用不需要先安裝 Docker 或資料庫。

## 3. 把模型下載來源固定為 Hugging Face

AnythingLLM 內建模型引擎的模型來源可在進階設定中選擇：

- Automatic：使用 Hugging Face；無法連線時可能改用 ModelScope。
- Hugging Face：只使用 Hugging Face。
- ModelScope：使用 ModelScope。

本網站的教學請選擇 **Hugging Face**，不要使用 Automatic，避免連線失敗時自動切換到中國的模型分發平台。下載模型時再確認發布者是 Google、IBM 等官方帳號或經查核的可信任轉換版本。

## 4. 先不要安裝額外的雲端 Provider

入門階段不需要填入以下資料：

- OpenAI API Key
- Anthropic API Key
- Gemini API Key
- OpenRouter API Key
- Perplexity、Tavily、Brave 等搜尋服務 API Key
- 任何需要信用卡或綁定付款方式的雲端服務

AnythingLLM 介面可能會顯示許多雲端 Provider，這不代表你必須使用。本站主線只教本機推論與免 API Key 搜尋。

## 5. 何時需要 Ollama？

若你只想在 AnythingLLM 中聊天、整理文件與使用內建 Agent，可以先不安裝 Ollama。

以下情況才建議加裝 Ollama：

- 想用終端機管理或切換多個模型。
- 希望其他本機程式也共用同一個模型服務。
- 想使用 Ollama 模型庫提供的量化版本。
- 需要更細緻地控制模型執行參數。

Ollama 本身採 MIT 授權，但它是另一個獨立程式，不是 AnythingLLM Desktop 的必要依賴。

## 6. 安裝完成檢查

- [ ] 我從官方下載頁取得 AnythingLLM Desktop。
- [ ] 桌面程式已成功啟動。
- [ ] 我選擇內建本機模型引擎。
- [ ] 模型來源設定為 Hugging Face，而非 Automatic／ModelScope。
- [ ] 我沒有輸入雲端模型 API Key。
- [ ] 我知道模型權重會占用磁碟空間與 RAM／VRAM。

## 官方來源

- [AnythingLLM Desktop 下載](https://anythingllm.com/download)
- [Desktop 安裝說明](https://docs.anythingllm.com/installation-desktop/overview)
- [內建模型引擎與模型來源設定](https://docs.anythingllm.com/setup/llm-configuration/local/built-in)
- [AnythingLLM GitHub／MIT License](https://github.com/Mintplex-Labs/anything-llm)

> 本頁查核日期：2026-11-10。不同桌面版版本的 UI 名稱可能改變，請依官方說明核對。
