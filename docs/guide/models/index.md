---
title: 05｜模型選擇、硬體需求與實測
description: 依 RAM、VRAM 與使用情境挑選 Gemma 4、IBM Granite 4.2 等非中國開發模型。
---

# 05｜模型選擇、硬體需求與實測

本站不使用中國公司或中國開發團隊提供的模型作為教學預設。模型選擇除了看參數量，也要看量化格式、實際記憶體、繁體中文表現，以及能否穩定呼叫 Agent 工具。

截至 2026-11-15，本頁優先列出 Google Gemma 4 與 IBM Granite 4.2。它們是非中國開發團隊發布的公開權重模型，均採 Apache 2.0 授權；但「公開權重」不等於訓練資料與完整訓練流程都公開。

## 1. 先認識目前的候選模型

| 模型 | 發布者 | 授權 | 建議用途 |
|---|---|---|---|
| Gemma 4 E2B / E4B | Google DeepMind | Apache 2.0 | 一般對話、摘要、圖片理解；小型硬體優先 |
| Gemma 4 12B | Google DeepMind | Apache 2.0 | 較複雜的對話、長文件與推理；需要更多記憶體 |
| Granite 4.2 3B | IBM | Apache 2.0 | 一般對話、文件整理、工具呼叫入門 |
| Granite 4.2 8B | IBM | Apache 2.0 | 較複雜的指令、RAG 與 Agent 任務；硬體需求較高 |

IBM 已發布 Granite 4.2，因此本頁不再把 Granite 4.0 當作現行主推版本。舊版模型仍可作為歷史或相容性參考，但新手先從 4.2 3B 開始比較。

## 2. 硬體需求怎麼看？

AnythingLLM 官方對基本本機 AI 使用建議約為 **16 GB 系統 RAM、8 核心 CPU**；Windows 使用 GPU 加速時，官方指出 8–12 GB 以上 VRAM 是不錯的配置。Apple Silicon 的 M 系列也能執行本機模型。這些是平台層級的建議，不是每個模型都能在相同硬體上達到相同速度。

以下數字是模型官方提供的推論記憶體估算，不能直接當成整台電腦最低 RAM。實際使用還要預留作業系統、推論引擎、上下文快取（KV cache）與其他程式的記憶體。

| 模型／量化版本 | 官方估計推論記憶體 | 備註 |
|---|---:|---|
| Gemma 4 E2B Q4_0 | 約 2.9 GB | Google 官方估算 |
| Gemma 4 E4B Q4_0 | 約 4.5 GB | Google 官方估算 |
| Gemma 4 12B Q4_0 | 約 6.7 GB | Google 官方估算 |
| Granite 4.2 3B Q5_1 | 約 4 GB VRAM | IBM 官方型號選擇器估算 |
| Granite 4.2 8B Q5_K_M | 約 8 GB VRAM | IBM 官方型號選擇器估算 |

Google 的 Gemma 表格包含載入額外項目的估算，但仍未包含所有支援軟體與上下文視窗的額外 VRAM。IBM 的 VRAM 數字則會依量化版本而不同。不要只看模型檔案大小就判斷一定跑得動。

## 3. 依電腦規格挑選

以下是入門選型建議，不是效能保證。相同模型在不同 CPU、GPU、驅動程式、上下文長度與 AnythingLLM 版本下，速度可能差很多。

| 你的硬體 | 建議先測試 | 使用方式與限制 |
|---|---|---|
| 系統 RAM 低於 16 GB，沒有獨立 GPU | 先不要把大型模型當成穩定工作環境 | AnythingLLM 官方基本建議為 16 GB RAM；若只能使用這台電腦，從 E2B 或 3B 量化模型開始，縮短上下文並關閉其他程式 |
| 16 GB RAM，沒有獨立 GPU／只有內顯 | Gemma 4 E2B Q4_0、Granite 4.2 3B Q4_K_M | 可先走 CPU 推論；回覆速度可能較慢。內顯會與系統共用記憶體 |
| 32 GB RAM，約 8–12 GB 獨立 VRAM | Gemma 4 E4B Q4_0、Granite 4.2 3B 或 8B 量化版 | 可嘗試更完整的對話與 Agent 任務；8B 請依實際 VRAM 和上下文長度測試 |
| 32–64 GB RAM，約 12–16 GB VRAM | Gemma 4 12B Q4_0、Granite 4.2 8B | 可以進一步比較回答品質與速度；不要把 VRAM 全部分配給模型 |
| 64 GB 以上 RAM，20 GB 以上 VRAM | 較大的 Gemma 4 變體或 Granite 進階版本 | 屬於進階測試，不是本課必要條件；大型模型仍需依量化與實際上下文重新估算 |

**Mac 注意事項：**Apple Silicon 使用統一記憶體，CPU 與 GPU 會共用同一池記憶體，不能把「系統 RAM」和「顯示記憶體」當成兩份可相加的容量。16 GB 統一記憶體先從 2B–3B 級模型測試；24–32 GB 再考慮 4B–8B 級模型，並保留空間給 macOS 與其他程式。

## 4. 本站建議的第一輪選型

如果你還不知道應該下載哪個，先不要一次下載很多模型：

1. **一般聊天優先：**先測 Gemma 4 E2B Q4_0。它是小型版本，適合作為基本對話與摘要的起點。
2. **Agent／工具呼叫優先：**再測 IBM Granite 4.2 3B Q4_K_M。IBM 將 Granite 4.2 定位於助理、RAG、工具呼叫與 Agent 工作流程，也列出中文在其多語言測試範圍內。
3. **硬體較充裕：**才比較 Gemma 4 E4B、Granite 4.2 8B 或 Gemma 4 12B。
4. **不要只看一次回答：**至少完成下方實測清單，再決定要長期使用哪一個模型。

## 5. 從哪裡下載才符合本站原則？

下載前先核對「模型原始發布者」與「GGUF 轉換者」，不要只看檔名或搜尋排名。

| 模型 | 建議來源 | 說明 |
|---|---|---|
| Gemma 4 E2B Instruct GGUF | [ggml-org 官方轉換倉庫](https://huggingface.co/ggml-org/gemma-4-E2B-it-GGUF) | 轉換來源標示為 Google 的 Gemma 4；ggml-org 是 llama.cpp 專案相關發布者 |
| Granite 4.2 3B GGUF | [IBM 官方 Hugging Face 倉庫](https://huggingface.co/ibm-granite/granite-4.2-3b-GGUF) | IBM 發布者，Apache 2.0，提供 GGUF 與 llama.cpp 使用說明 |
| Gemma 4 原始模型 | [Google Gemma 4 官方文件](https://ai.google.dev/gemma/docs/core) | 查看模型資訊卡、版本、功能與授權 |

在 AnythingLLM Desktop 的內建模型 Provider 設定中，模型來源請明確選 **Hugging Face**。不要使用 Automatic，因為 Automatic 在 Hugging Face 無法連線時可能回退到 ModelScope；本站不使用 ModelScope 作為模型來源。

AnythingLLM Desktop 新版內建引擎使用 Lemonade／llama.cpp，支援從 Hugging Face 匯入 GGUF 模型或載入本機 GGUF 檔案。若某個模型無法在你的版本正常載入，先確認模型格式、推論引擎版本與硬體後端，不要為了勉強載入而下載來源不明的重新封裝檔。

## 6. 實際測試：建立自己的模型比較表

模型跑得動，不代表適合你的任務。請使用相同提示詞、相同文件與相同上下文設定比較候選模型。

| 測試項目 | 測試方式 | 記錄重點 |
|---|---|---|
| 繁體中文 | 要求用台灣繁體中文解釋一個專業概念 | 用詞自然、是否混入簡體慣用語 |
| 摘要能力 | 提供一段約 1,000 字的公開文章 | 是否保留關鍵事實、日期與限制 |
| 不確定性 | 問文件中沒有提供答案的問題 | 是否承認資料不足，而不是編造 |
| 工具呼叫 | 要 Agent 搜尋官方網站並回報網址 | 是否真的呼叫工具、來源是否可開啟 |
| 指令遵循 | 提供格式規則並要求輸出表格 | 是否遵守欄位、順序與字數限制 |

每次至少記錄：模型名稱、量化版本、下載檔案大小、啟動時間、回答速度、最高 RAM／VRAM 使用量、繁體中文品質與工具呼叫結果。建議每項用 0–2 分評分：0 = 失敗、1 = 部分成功、2 = 符合需求。

### 可直接複製的測試提示詞

```text
請全程使用台灣繁體中文。

任務一：用 150 字解釋「檢索增強生成（RAG）」。
任務二：只根據我提供的文章整理三個重點；若文章沒有提到，請明確說明。
任務三：請搜尋一份官方文件，回報標題、網址、發布或更新日期。
任務四：若你無法使用網路搜尋工具，請直接說明，不可假裝已經搜尋。
任務五：遇到資料不足時，請列出還需要哪些資訊，不要自行補造。

請勿虛構來源、網址、研究或數據。
```

## 7. 模型與工具呼叫不是同一件事

模型能生成文字，不代表它能穩定使用 Agent。Agent 是否成功，還取決於模型的工具呼叫能力、推論引擎、AnythingLLM 的提示格式與所啟用的工具。

建議先完成一般聊天，再單獨測試 Web Browsing、RAG Search 等唯讀工具。不要一開始就授予 Agent 檔案刪除、Shell、寄信或對外發布權限。

## 8. 官方來源與查核日期

- [Google Gemma 4 模型總覽與記憶體估算](https://ai.google.dev/gemma/docs/core)
- [Gemma 4 GGUF（來源與量化資訊）](https://huggingface.co/ggml-org/gemma-4-E2B-it-GGUF)
- [IBM Granite 4.2 官方文件](https://www.ibm.com/granite/docs/)
- [IBM Granite 4.2 官方模型選擇器](https://www.ibm.com/granite/playground/model-selector)
- [IBM Granite 4.2 3B GGUF](https://huggingface.co/ibm-granite/granite-4.2-3b-GGUF)
- [AnythingLLM Desktop 系統需求](https://docs.anythingllm.com/installation-desktop/system-requirements)
- [AnythingLLM 內建模型引擎、GGUF 匯入與模型來源設定](https://docs.anythingllm.com/setup/llm-configuration/local/built-in)

> 本頁查核日期：2026-11-15。硬體估算與模型相容性可能隨軟體、驅動程式及模型版本更新；下載前請再查看官方模型頁。
