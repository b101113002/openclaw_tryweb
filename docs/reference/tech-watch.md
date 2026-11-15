# 新技術觀測與定期更新

本頁追蹤本機 AI、Agent、MCP、Agent Skills、模型推論引擎與提示詞工程的新工具。目的是從快速變動的生態系中，挑出有官方文件、授權可查、能在本機運作且符合本站模型來源原則的技術。

## 收錄原則

每項新技術都會分開檢查：
1. 專案維護者與主要開發團隊來源。
2. 軟體授權是否為標準開源授權，是否有額外商業限制。
3. 是否可自行架設或本機執行，是否必須註冊帳號、使用雲端 API Key 或付費額度。
4. 可連接哪些本機模型、工具與 Agent Skills 格式。
5. 是否有安全審計、權限隔離、提示詞注入與秘密管理的說明。
6. 官方最新 Release、文件變更、維護活動與已知限制。

模型來源與軟體開發者來源分開審查。即使推論引擎是開源、由非中國開發者維護，也不代表它支援的所有模型都符合本站白名單。

## 2026-11-15｜本次技術觀測

| 技術 | 類型 | 本次觀察 | 採用定位 |
|---|---|---|---|
| Colibrì | 大型 MoE 本機推論引擎 | Apache-2.0；分層使用 GPU、RAM、NVMe；提供相容 API。官方支援清單混有中國與非中國模型 | 進階研究；逐一核對模型來源與授權 |
| Agent Skills | 可攜式技能格式 | SKILL.md + YAML frontmatter + Markdown 指令，可選擇附加 scripts／references／assets | 推薦作為跨工具技能文件的優先格式 |
| Vercel Skills CLI／skills.sh | 技能安裝工具與技能目錄 | MIT CLI；可搜尋、安裝、列出、檢查及更新技能；預設遙測可選擇關閉 | 技能發現工具；安裝前仍要自行審核 |
| Agent Zero | 通用 Agent 工作環境 | MIT；可在隔離環境操作瀏覽器、終端與文件，支援本機 Ollama 模型連線 | 通用 Agent 進階選修 |
| OpenHands | AI 程式開發 Agent | MIT；可連接本機模型伺服器；支援 Agent Server 與自動化架構 | 程式開發專題 |
| Flowise | 視覺化 Agent 工作流 | 核心多數 Apache-2.0；Enterprise 部分目錄採商業授權 | 視覺化工作流選修 |
| Dify | LLM 應用與 Agent 平台 | Dify Open Source License 基於 Apache-2.0 並附加條件 | 先審授權，再評估自架需求 |

## 目前重點連結

- [Colibrì 官方 Repository](https://github.com/JustVugg/colibri)
- [Agent Skills 官方規格](https://agentskills.io/specification)
- [Vercel Skills CLI](https://github.com/vercel-labs/skills)
- [skills.sh 技能目錄](https://skills.sh/)
- [Agent Zero](https://github.com/agent0ai/agent-zero)
- [OpenHands](https://github.com/OpenHands/OpenHands)
- [Flowise](https://github.com/FlowiseAI/Flowise)
- [Dify](https://github.com/langgenius/dify)

## 定期更新紀錄

| 日期 | 更新摘要 |
|---|---|
| 2026-11-15 | 初版：新增 Colibrì、Agent Skills、skills.sh、Agent Zero、OpenHands、Flowise 與 Dify 觀測。 |

此頁預計每月檢查一次。只有在官方 Release、授權、相容性或實際採用價值有重大變化時，才新增或修改推薦；單純下載量、星數或社群宣傳不會直接成為推薦依據。

## 怎麼解讀狀態？

- **推薦：**官方來源清楚、授權可接受、主要功能與本站本機優先原則相容。
- **進階選修：**技術有價值，但需要較多硬體、安裝步驟或安全管理。
- **觀察中：**專案仍快速變化，授權、效能或相容性尚待進一步驗證。
- **不納入白名單：**開發來源不符合要求、授權不符、或需要不符合原則的模型／雲端服務作為必要條件。

> 最後查核日期：2026-11-15。此頁是經來源驗證的技術觀測，不是所有列出專案的安全保證或品質排名。
