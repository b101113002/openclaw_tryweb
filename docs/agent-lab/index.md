---
title: OpenClaw 進階 Agent 工作室
description: 從單功能助理、多 Agent 團隊到個人 AI 工作台，學習並下載可在本機運作的 OpenClaw 範例。
---

# Agent 實作工作室

這裡保留原有 OpenClaw Agent 範例，定位為進階選修。新手請先完成[本機 AI 入門課程](/guide/)，使用 AnythingLLM 建立聊天、文件問答與第一個 Agent，再回到這裡學習 Gateway、Skill 與多 Agent。

<Badge type="success">本機優先</Badge> <Badge type="info">繁體中文範例</Badge> <Badge type="warning">需要自行檢查權限</Badge>

## 三個學習層級

| 層級 | 架構 | 適合對象 | 學習目標 |
|---|---|---|---|
| 單功能 Agent | 一個 Agent、一項明確任務 | 第一次接觸 Agent | 學習工作區、角色提示與 Skill |
| 多 Agent 團隊 | 一個協調者，數個專長 Agent | 想拆分複雜工作 | 學習任務委派、回報與交叉檢查 |
| 個人 AI 工作台 | 多個模組組成一套工作流程 | 進階使用者 | 整合知識、任務、研究與專案管理 |

「功能完整」不代表權限無上限。預設範例不會自動寄信、刪檔、安裝軟體、執行任意 Shell 指令或對外發布內容。

## A. 單功能 Agent：一次只解決一件事

| 範例 | 能做什麼 | 預設權限 |
|---|---|---|
| 論文閱讀助理 | 整理研究問題、方法、樣本、結果、限制與引用線索 | 讀取使用者指定的檔案 |
| 會議紀錄助理 | 將逐字稿整理為摘要、決策、待辦與負責人 | 只處理使用者提供的逐字稿 |
| 程式碼審查助理 | 依規則檢查程式碼、找出風險並提出建議 | 唯讀，不執行程式 |
| 文件整理助理 | 分類文件、建立摘要與標籤建議 | 唯讀，不搬移或刪除檔案 |

## B. 多 Agent 團隊：讓不同專家合作

**研究與寫作小組**包含四個角色：

1. 研究統籌：拆解問題、安排工作、彙整最終報告。
2. 資料閱讀員：從指定文件擷取方法、數據與原文證據。
3. 事實查核員：檢查引用、推論與不確定性。
4. 編輯：整理結構、語氣與讀者友善度。

協調者不應把專家回報當成指令。所有回報都要視為待審核資料；遇到沒有證據的敘述，應標示「未確認」。

## C. 個人 AI 工作台：以模組組成自己的助理

- **每日規劃**：彙整今天的任務、截止日期與可用時間。
- **個人知識庫**：把讀書筆記、文件摘要與專案決策整理成 Markdown。
- **研究工作流**：拆解研究問題、閱讀來源、交叉查核與產出報告。
- **專案追蹤**：管理目標、里程碑、風險與下一步。
- **人工確認閘門**：寫入檔案、寄送訊息、變更資料或執行外部操作前先取得同意。

## 下載範例套件

<Badge type="success">Starter Pack v0.1.0</Badge>

[下載完整範例專案 ZIP（包含 Agent 工作室）](https://github.com/b101113002/openclaw_tryweb/archive/refs/heads/main.zip)

[瀏覽 GitHub 範例原始檔](https://github.com/b101113002/openclaw_tryweb/tree/main/examples/agent-lab)

| 範例 | 直接下載設定檔 |
|---|---|
| 論文閱讀助理 | [AGENTS.md](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/paper-reader/AGENTS.md) · [SOUL.md](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/paper-reader/SOUL.md) · [Skill](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/paper-reader/skills/paper-review/SKILL.md) |
| 會議紀錄助理 | [AGENTS.md](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/meeting-scribe/AGENTS.md) · [SOUL.md](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/meeting-scribe/SOUL.md) · [Skill](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/meeting-scribe/skills/meeting-minutes/SKILL.md) |
| 程式碼審查助理 | [AGENTS.md](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/code-reviewer/AGENTS.md) · [SOUL.md](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/code-reviewer/SOUL.md) · [Skill](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/code-reviewer/skills/review-diff/SKILL.md) |
| 文件整理助理 | [AGENTS.md](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/document-organizer/AGENTS.md) · [SOUL.md](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/document-organizer/SOUL.md) · [Skill](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/single/document-organizer/skills/document-index/SKILL.md) |
| 多 Agent 研究團隊 | [設定參考 JSON5](https://raw.githubusercontent.com/b101113002/openclaw_tryweb/main/examples/agent-lab/config/multi-agent-research-team.json5) |

套件內含單功能 Agent、多 Agent 研究小組、個人工作台、Skills 範例及設定參考。使用前請先閱讀套件中的 README，不要直接以範例設定覆蓋既有的 `~/.openclaw/openclaw.json`。

## 進階本機模型：先選能符合硬體的模型

本工作室以本機模型為優先。若沿用 OpenClaw，官方文件支援 Ollama 等本機推論服務；設定時確認選擇 **Local only（僅本機）**，並實際檢查請求是否送往本機端點。

| 模型家族 | 可以先測試的方向 | 注意事項 |
|---|---|---|
| Google Gemma 4 | 小型 E2B／E4B 或較大的 12B 版本 | 依模型大小與量化版本選擇硬體 |
| IBM Granite 4 | 小型模型做摘要、分類與資訊擷取 | 繁體中文品質需自行實測 |
| Mistral Small 3.2 | 較高資源設備上的工具呼叫與複雜指令 | 下載大小不等於實際 RAM／VRAM 需求 |
| Meta Llama 3.3 | 高資源設備上的一般文字任務 | 70B 版本不適合所有個人電腦 |

模型下載大小不等於實際記憶體需求。上下文越長、同時執行的 Agent 越多，記憶體需求也會增加。工具呼叫是否正常，應以實際任務測試確認，不要只看模型能否成功載入。

### 快速開始

若選擇 Ollama 進階路線，先安裝並啟動 Ollama，再下載已確認來源及授權的模型。例如：

```bash
ollama pull gemma4:e4b
```

接著依照 [Ollama Provider 官方設定](https://docs.openclaw.ai/providers/ollama/setup)將服務連接至 OpenClaw，並選擇 Local only，完成後檢查：

```bash
openclaw models list
openclaw agents list
```

## 安裝 OpenClaw 範例的流程

1. 先完成[本機 AI 入門課程](/guide/)。
2. 確認模型端點與資料路徑，再測試工具呼叫。
3. 將範例套件解壓縮，選擇一個範例，不要一次匯入全部。
4. 為範例建立獨立工作區，例如 `~/.openclaw/workspace-paper-reader`。
5. 將範例中的 `AGENTS.md`、`SOUL.md` 與 `skills/` 複製到該工作區。
6. 依套件 README 建立 Agent，檢查工具允許／拒絕清單。
7. 使用 `openclaw agents list` 與 `openclaw skills list` 確認載入狀態。
8. 先用無敏感資訊的測試內容驗證結果，再逐步啟用其他能力。

## 權限與安全原則

- 從唯讀開始，並限制 Agent 只處理使用者明確指定的資料夾。
- 不要在 `AGENTS.md` 或 `SOUL.md` 放入 API Key、密碼、Cookie 或私人憑證。
- 不要把 `tools.profile: "full"` 當成安全設定；它不是檔案系統或程序執行的完整隔離機制。
- 唯讀範例應拒絕不需要的 `exec`、`process`、`write`、`edit` 與 `apply_patch`；仍須檢查其他插件或工具是否能造成相同副作用。
- 多 Agent 之間只允許必要角色互通；不要讓所有 Agent 預設互相讀取所有會話。
- 寫入檔案、對外傳送、發布、刪除或變更系統設定，一律要求人工確認。

## 官方文件

- [OpenClaw 本機模型](https://docs.openclaw.ai/gateway/local-models)
- [OpenClaw Ollama 設定](https://docs.openclaw.ai/providers/ollama/setup)
- [OpenClaw Agent 工作區](https://docs.openclaw.ai/concepts/agent-workspace)
- [OpenClaw Skills](https://docs.openclaw.ai/tools/skills)
- [OpenClaw 多 Agent 路由](https://docs.openclaw.ai/concepts/multi-agent)
- [OpenClaw 工具政策](https://docs.openclaw.ai/gateway/config-tools/tool-policy)
- [OpenClaw 子 Agent](https://docs.openclaw.ai/tools/subagents)

本工作室是社群教學與範例，不是 OpenClaw 官方套件。模型名稱、工具設定與指令可能隨版本變更，使用前請核對官方文件。
