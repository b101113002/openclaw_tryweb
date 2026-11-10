---
title: 05｜選擇非中國開發模型
description: 優先使用 Google Gemma 與 IBM Granite 公開權重模型，檢查模型來源、Apache 2.0 授權與硬體需求。
---

# 05｜選擇非中國開發模型

本站不採用中國公司或中國開發團隊提供的模型作為教學預設，也不把需要雲端帳號、付費 Token 或免費額度的模型列為必修。

目前優先選擇 Google 與 IBM 發布、可自行下載的公開權重模型，並要求每個模型頁面標示發布者、授權與硬體需求。

## 優先候選

| 模型家族 | 開發團隊 | 官方列出的授權 | 適合先測試的任務 |
|---|---|---|---|
| Gemma 4 | Google DeepMind | Apache 2.0 | 一般繁中對話、摘要、圖片理解與推理 |
| Granite 4.0 | IBM | Apache 2.0 | 文件摘要、檢索增強生成、指令遵循與工具呼叫 |

IBM 官方指出 Granite 4.0 有針對工具使用、指令遵循、RAG 與 Agent 工作流程訓練的模型變體；Google Gemma 4 提供不同大小的公開權重版本。兩者都仍需要你依照繁體中文任務實際測試。

## 模型大小不是唯一指標

下載大小、參數量、量化格式、上下文長度與實際 RAM／VRAM 需求並不相同。相同模型使用不同量化版本，也可能有明顯的速度與品質差異。

選擇前先確認：

- 作業系統與 CPU 架構。
- 系統 RAM 與可用 GPU VRAM。
- 是否需要圖片輸入或長文件處理。
- 是否需要 Agent 工具呼叫。
- 你願意等待的回覆速度。

不要只看「模型可載入」就認定它適合 Agent。務必測試模型能否正確呼叫工具、遵守結構化輸出、使用繁體中文並完成實際任務。

## 模型來源白名單

1. 優先從 Google、IBM 官方模型頁或官方 GitHub/Hugging Face 組織下載。
2. 若使用第三方 GGUF 量化版本，檢查原始模型、轉換者、量化方法與授權是否清楚。
3. AnythingLLM 內建模型來源請明確選擇 Hugging Face，不使用 Automatic → ModelScope fallback。
4. 不使用中國開發的模型家族、API Provider 或中國模型平台提供的替代檔案。
5. 不因為模型名稱相同，就假設不同倉庫的檔案完全一致。

## 「開源模型」的用語說明

軟體與模型的開放程度不同。模型可公開權重並採 Apache 2.0 授權，但其訓練資料、完整訓練程式或所有資料治理資訊未必全部公開。因此本站會標示「公開權重模型」與實際授權，不會把權重公開誤稱為訓練流程完全開放。

## 官方來源

- [Google Gemma 4 Model Card](https://ai.google.dev/gemma/docs/core/model_card_4)
- [Google Gemma 4 模型總覽](https://ai.google.dev/gemma/docs/core)
- [IBM Granite 4.0 官方文件](https://www.ibm.com/granite/docs/models/granite4-0)
- [IBM Granite 4.0 GitHub](https://github.com/ibm-granite/granite-4.0-language-models)

> 本頁查核日期：2026-11-10。模型清單會依官方授權與可本機運行狀態持續更新。
