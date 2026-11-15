# 教材狀態與來源追蹤

本站主要學習路線為「本機開源 AI 對話室、文件知識庫、開源網路搜尋、AI Agent、Agent Skills 與 Prompt 工程」。OpenClaw 是進階 Agent 選修路線之一。

## 本機 AI 入門課程

| 單元 | 狀態 | 說明 |
|---|---|---|
| 課程地圖 | <Badge type="success">已完成</Badge> | 重新設計成本機優先、免註冊與免 API Key 的學習順序。 |
| 01｜認識本機 AI 工作站 | <Badge type="success">已完成初版</Badge> | 解釋 AnythingLLM、模型引擎、RAG、開源搜尋與 Agent 分工。 |
| 02｜安裝 AnythingLLM Desktop | <Badge type="success">已完成初版</Badge> | 以單一桌面程式起步，固定模型來源為 Hugging Face。 |
| 03｜完成第一次本機對話 | <Badge type="success">已完成初版</Badge> | 建立工作區、聊天與文件問答。 |
| 04｜網路搜尋與資料查核 | <Badge type="success">已完成開源整合初版</Badge> | 以 SearXNG + mcp-searxng 接入 AnythingLLM MCP，附官方 Compose 與 JSON 設定。 |
| 05｜選擇非中國開發模型 | <Badge type="success">已更新選型指南</Badge> | 更新 Gemma 4 與 Granite 4.2，補上硬體估算、模型來源及實測方法。 |
| 06｜建立 AI Agent 工作流程 | <Badge type="success">已完成初版</Badge> | 介紹 AnythingLLM Agent、MCP 工具與 OpenClaw 進階路線。 |
| 07｜安全與資料邊界 | <Badge type="success">已完成初版</Badge> | 區分本機／外部資料流與人工確認。 |
| 08｜AI Agent 應用選擇 | <Badge type="success">已完成初版</Badge> | 比較 AnythingLLM、Agent Zero、OpenHands、Flowise、Dify 與 OpenClaw。 |
| 09｜Agent Skills 與技能庫 | <Badge type="success">已完成初版</Badge> | 介紹 Agent Skills 開放格式、skills.sh、Vercel CLI 與安全審核。 |
| 10｜Markdown 與 System Prompt | <Badge type="success">已完成初版</Badge> | 提供 README、AGENTS.md、SKILL.md 與 System Prompt 模板。 |
| 11｜Colibrì 與大型 MoE 推論 | <Badge type="success">已完成初版</Badge> | 解釋 GPU／RAM／NVMe 分層推論，明確排除中國模型白名單。 |

「已完成初版」表示已有可閱讀的教學步驟與官方來源；尚未代表已在所有作業系統、硬體型號與模型組合上完成實測。模型硬體表中的數字是官方估算，使用者仍需在自己的電腦上測試。SearXNG + MCP 教學已有初步安裝與設定步驟，仍需在不同系統上實際驗證。

## Agent 實作工作室

原有 OpenClaw 單功能 Agent、多 Agent 研究團隊與個人工作台範例保留，定位改為進階路線。後續將補上更多 AnythingLLM Agent 工作流程與 MCP 工具範例。

## 模型白名單原則

- 優先使用非中國開發團隊發布、來源可查、授權明確的公開權重模型。
- 目前優先候選：Google Gemma 4、IBM Granite 4.2。
- AnythingLLM 內建模型來源指定 Hugging Face，不使用會回退至 ModelScope 的 Automatic 設定。
- 不將 Meta Llama、其他自訂授權模型或僅公開權重的模型直接標示為「完整開源」；需逐一說明授權差異。
- 不把中國開發的模型或 API Provider 列為教學預設。

## 搜尋與資料來源原則

- 開源軟體路線：SearXNG（AGPL-3.0）+ mcp-searxng（MIT）+ AnythingLLM Desktop MCP。
- AnythingLLM 內建 DuckDuckGo 僅作為免設定備用，不稱為開源搜尋服務。
- SearXNG 上游引擎仍可能 CAPTCHA、限流或封鎖；不宣稱無限流量。
- 重要資料必須回到原始網站查核。

## 早期上游教材整理區

Datawhale China／Hello Claw 早期參考內容保留在「OpenClaw 舊版教材整理」區，不作為新課程的章節骨架。相應改作內容仍遵守原始授權及來源標示。

## 主要技術來源

- [AnythingLLM 官方文件](https://docs.anythingllm.com/)
- [AnythingLLM GitHub（MIT）](https://github.com/Mintplex-Labs/anything-llm)
- [Gemma 4 Model Card（Apache 2.0）](https://ai.google.dev/gemma/docs/core/model_card_4)
- [IBM Granite 4.2 官方文件（Apache 2.0）](https://www.ibm.com/granite/docs/)
- [SearXNG 官方文件](https://docs.searxng.org/)
- [mcp-searxng 原始碼與 MIT License](https://github.com/ihor-sokoliuk/mcp-searxng)
- [OpenClaw 官方文件](https://docs.openclaw.ai/)
- [Datawhale China／Hello Claw](https://github.com/datawhalechina/hello-claw)（早期參考教材）

最後查核日期：2026-11-15。


## 新技術觀測

新技術觀測頁會定期追蹤 Agent 應用、技能庫、MCP、生態系及本機推論引擎。只有授權、來源、維護狀態與實用性經核對後，才會納入推薦。

[查看新技術觀測](/reference/tech-watch)

最後查核日期：2026-11-15。
