# 教材狀態與來源追蹤

本站已把主要學習路線改為「本機開源 AI 對話室、文件知識庫、網路搜尋與 AI Agent」。OpenClaw 不再是唯一主角，而是進階 Agent 選修路線。

## 本機 AI 入門課程

| 單元 | 狀態 | 說明 |
|---|---|---|
| 課程地圖 | <Badge type="success">已完成</Badge> | 重新設計成本機優先、免註冊與免 API Key 的學習順序。 |
| 01｜認識本機 AI 工作站 | <Badge type="success">已完成初版</Badge> | 解釋 AnythingLLM、模型引擎、RAG、搜尋與 Agent 分工。 |
| 02｜安裝 AnythingLLM Desktop | <Badge type="success">已完成初版</Badge> | 以單一桌面程式起步，固定模型來源為 Hugging Face。 |
| 03｜完成第一次本機對話 | <Badge type="success">已完成初版</Badge> | 建立工作區、聊天與文件問答。 |
| 04｜網路搜尋與資料查核 | <Badge type="success">已完成初版</Badge> | 介紹免 API Key 搜尋、SearXNG 選修與來源查核。 |
| 05｜選擇非中國開發模型 | <Badge type="success">已完成初版</Badge> | 優先列出 Google Gemma 4 與 IBM Granite 4.0。 |
| 06｜建立 AI Agent 工作流程 | <Badge type="success">已完成初版</Badge> | 介紹 AnythingLLM Agent、MCP 與 OpenClaw 進階路線。 |
| 07｜安全與資料邊界 | <Badge type="success">已完成初版</Badge> | 區分本機／外部資料流與人工確認。 |

「已完成初版」表示已有可閱讀的教學步驟與官方來源；尚未代表已在所有作業系統、硬體型號與模型組合上完成實測。

## Agent 實作工作室

原有 OpenClaw 單功能 Agent、多 Agent 研究團隊與個人工作台範例保留，定位改為進階路線。後續將補上 AnythingLLM Agent 工作流程與 MCP 工具範例。

## 模型白名單原則

- 優先使用非中國開發團隊發布、來源可查、授權明確的公開權重模型。
- 目前優先候選：Google Gemma 4、IBM Granite 4.0。
- AnythingLLM 內建模型來源指定 Hugging Face，不使用會回退至 ModelScope 的 Automatic 設定。
- 不將 Meta Llama、其他自訂授權模型或僅公開權重的模型直接標示為「完整開源」；需逐一說明授權差異。
- 不把中國開發的模型或 API Provider 列為教學預設。

## 搜尋與資料來源原則

- 入門先用 AnythingLLM Agent 內建 DuckDuckGo 搜尋，不需 API Key。
- 進階可自架 SearXNG，避免申請商業搜尋 API Key。
- 搜尋引擎上游仍可能 CAPTCHA、限流或封鎖；不宣稱無限流量。
- 重要資料必須回到原始網站查核。

## 早期上游教材整理區

Datawhale China／Hello Claw 早期參考內容保留在「OpenClaw 舊版教材整理」區，不作為新課程的章節骨架。相應改作內容仍遵守原始授權及來源標示。

## 主要技術來源

- [AnythingLLM 官方文件](https://docs.anythingllm.com/)
- [AnythingLLM GitHub（MIT）](https://github.com/Mintplex-Labs/anything-llm)
- [Gemma 4 Model Card（Apache 2.0）](https://ai.google.dev/gemma/docs/core/model_card_4)
- [IBM Granite 4.0（Apache 2.0）](https://www.ibm.com/granite/docs/models/granite4-0)
- [SearXNG 官方文件](https://docs.searxng.org/)
- [OpenClaw 官方文件](https://docs.openclaw.ai/)
- [Datawhale China／Hello Claw](https://github.com/datawhalechina/hello-claw)（早期參考教材）

最後查核日期：2026-11-10。
