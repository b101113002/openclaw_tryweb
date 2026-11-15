# 本機開源 AI 入門｜從零建立自己的 AI 工作站

本課程的目標不是讓你註冊更多 AI 網站，而是把必要的 AI 能力盡量放在自己的裝置上：本機模型、本機對話室、文件知識庫、網路搜尋與 AI Agent。

## 我們的預設工具組合

| 層級 | 預設選擇 | 用途 | 是否需要外部帳號 |
|---|---|---|---|
| 對話介面與工作區 | AnythingLLM Desktop（MIT） | 聊天、文件問答、Agent 操作 | 不需要建立雲端帳號 |
| 本機推論 | AnythingLLM 內建引擎（Lemonade／llama.cpp） | 在自己的電腦載入模型 | 不需要模型 API Key |
| 本機模型 | Google Gemma 4、IBM Granite 4.2 | 文字、圖片理解、工具任務 | 公開權重可下載；依個別模型授權使用 |
| 開源網路搜尋 | SearXNG（AGPL-3.0）+ mcp-searxng（MIT） | 自架搜尋聚合服務，透過 MCP 接到 AnythingLLM Agent | 不需商業搜尋 API Key；需 Docker／Podman 與 Node.js |
| 便利備用搜尋 | AnythingLLM 內建 DuckDuckGo | 快速測試網頁搜尋 | 不需 API Key，但屬於第三方非開源服務 |
| Agent Skills | Agent Skills 格式 + Vercel Skills CLI（MIT） | 可攜式任務流程與技能管理 | 公開技能可直接下載；CLI 遙測可關閉 |
| 進階 Agent | Agent Zero、OpenHands、OpenClaw | 通用任務、程式開發、多渠道自動化 | 可連接本機模型；依工具設定而定 |

只做本機聊天與文件問答，不需要先安裝 Docker、資料庫、向量資料庫或多個雲端 SaaS。若你要求網路搜尋軟體也採開源路線，再依第 04 課安裝 SearXNG 與 MCP Server。

## 課程地圖

| 單元 | 主題 | 完成成果 |
|---|---|---|
| 01 | [認識本機 AI 工作站](/guide/what-is-openclaw/) | 理解對話室、模型執行引擎、文件知識庫與搜尋服務 |
| 02 | [安裝 AnythingLLM Desktop](/guide/install/) | 在電腦啟動開源 AI 對話介面 |
| 03 | [完成第一次本機對話](/guide/first-assistant/) | 成功載入模型、聊天及詢問自己的文件 |
| 04 | [網路搜尋與資料查核](/guide/web-research/) | 用 SearXNG + MCP 接上開源搜尋工具，查詢並核對來源 |
| 05 | [選擇非中國開發模型](/guide/models/) | 依授權、模型來源與硬體挑選模型 |
| 06 | [建立 AI Agent 工作流程](/guide/agent-workflows/) | 使用 MCP 工具、搜尋、擷取與整理資料 |
| 07 | [安全與資料邊界](/guide/safety/) | 確認檔案權限、網路流向與人工確認機制 |
| 08 | [AI Agent 應用選擇](/guide/agent-apps/) | 依研究、程式開發、工作流與自動化挑選工具 |
| 09 | [Agent Skills 與技能庫](/guide/skills/) | 找到、審查、安裝與維護 SKILL.md |
| 10 | [Markdown 與 System Prompt](/guide/prompts/) | 撰寫 AGENTS.md、System Prompt 與專用 Skill |
| 11 | [Colibrì 與大型 MoE 推論](/guide/colibri/) | 理解 GPU／RAM／NVMe 分層推論與模型白名單 |

## 我們的篩選原則

- **軟體授權明確**：主教學優先採 MIT、Apache-2.0、AGPL-3.0 等開源授權。
- **模型來源透明**：優先 Google、IBM 等非中國開發團隊發布、授權清楚的公開權重模型。
- **不把開放權重誤稱為完整開源**：模型權重可下載，不代表訓練資料與完整訓練流程也都公開；每個模型都會個別說明授權範圍。
- **減少外部註冊**：不以 OpenAI、Anthropic、Google Cloud、搜尋 API 或其他需要註冊與申請額度的雲端服務作為必修。
- **不把免費額度當成零成本**：免費雲端服務可能改變規則或限流；優先使用本機推論及自架搜尋工具。
- **維持來源查核**：AI 搜尋到的內容是線索，不是證據。重要資訊要回到原始網站核對。

## 網路搜尋的現實限制

SearXNG 與 MCP Server 可以在自己的電腦執行，不代表搜尋資料本身也全部開源。SearXNG 會向你啟用的上游搜尋引擎發出查詢，再把結果整理給 Agent；上游引擎及原始網站仍是第三方服務，可能限流、要求 CAPTCHA 或改變政策。

因此本站的目標是「使用開源的本機軟體、不必註冊多個搜尋 API 服務」，而不是宣稱網路搜尋可以永久無限制，或所有網頁資料都屬開源。

## 新技術觀測

Colibrì、Agent Skills、skills.sh、Agent Zero、OpenHands 與視覺化 Agent 工作流已加入教材；未來會依官方 Release、授權與相容性定期檢查。

[查看新技術觀測與更新紀錄](/reference/tech-watch)

## 下一步

先閱讀[認識本機 AI 工作站](/guide/what-is-openclaw/)，再依照自己的硬體完成[AnythingLLM Desktop 安裝](/guide/install/)，接著查看[模型與硬體選型表](/guide/models/)。
