# OpenClaw 本機 AI Agent 範例套件

版本：0.1.0

本套件提供可編輯的繁體中文 Agent 工作區範例，目標是讓你理解 OpenClaw 的工作區檔案、Skills、單 Agent、多 Agent 與人工確認流程。

## 套件內容

- single/paper-reader：論文閱讀助理
- single/meeting-scribe：會議紀錄助理
- single/code-reviewer：唯讀程式碼審查助理
- single/document-organizer：文件分類與摘要助理
- multi/research-team：研究統籌、資料閱讀、事實查核、編輯四種角色
- full/personal-hq：個人 AI 工作台的總管角色與模組 Skills
- config：多 Agent 路由與權限設定參考

## 重要：這不是一鍵安裝器

本套件只有提示檔、Markdown Skills 與設定範例，不會安裝程式、下載模型、連接外部帳號或執行 Shell 命令。使用者應先閱讀並自行選擇要複製的檔案。

## 建議安裝方式

1. 安裝 OpenClaw，並完成第一次 Onboarding。
2. 安裝 Ollama，下載一個支援工具呼叫的模型。
3. 使用 Local only 模式連接 Ollama。
4. 先建立一個新的 Agent，例如：

   ```bash
   openclaw agents add paper-reader --workspace ~/.openclaw/workspace-paper-reader
   ```

5. 將對應範例目錄中的 AGENTS.md、SOUL.md 與 skills 資料夾複製到這個 Agent 的 workspace。
6. 檢查 OpenClaw 工具權限，唯讀範例只開啟 read，並拒絕 exec、process、write、edit、apply_patch。
7. 執行：

   ```bash
   openclaw agents list
   openclaw skills list
   ```

8. 使用各範例提供的測試問題，確認結果符合預期。

不同平台的 home 目錄與路徑寫法不同。Windows 使用者請依 OpenClaw 的實際工作區位置調整，不要把 Linux 路徑直接貼到 PowerShell。

## Workspace 檔案說明

- AGENTS.md：行為規則、工作流程、記憶與工具使用約定。
- SOUL.md：角色個性、語氣、界線。
- IDENTITY.md：名稱與外觀識別（可選）。
- skills/<name>/SKILL.md：可重用的任務流程。

## 權限參考：唯讀 Agent

以下片段是「單一 Agent 工具設定」的參考，不要直接覆蓋整份 openclaw.json。先備份，確認目前 OpenClaw 版本接受的欄位，再把片段合併到該 Agent 的設定：

```json5
{
  tools: {
    allow: ["read"],
    deny: ["exec", "process", "write", "edit", "apply_patch"]
  }
}
```

提醒：工具政策是工具層級的限制，不等於完整作業系統沙箱。若需要更強隔離，請另外設定 OpenClaw sandbox，並確認 Docker／沙箱後端已正確運作。拒絕 exec 與 process 可以降低風險，但仍要檢查已啟用的 Plugins、MCP Servers 及外部整合。

## 多 Agent 範例

多 Agent 設定位於 config/multi-agent-research-team.json5。範例使用獨立 workspace 與 agentDir，並限制 agentToAgent 互通名單。請先理解 Agent ID、工作區與認證儲存區的關係，再手動合併。

## 使用限制

- 範例不會取代人工判斷，不可直接用於醫療診斷、法律意見、投資交易或其他高風險決策。
- 不要把病歷、身分證號、密碼、金鑰或未授權資料放入測試集。
- 使用本機模型仍可能有錯誤、提示詞注入與工具濫用風險。
- 第三方 Skills 安裝前需先審查程式碼與來源；本套件不依賴 ClawHub。

## 官方文件

- https://docs.openclaw.ai/concepts/agent-workspace
- https://docs.openclaw.ai/tools/creating-skills
- https://docs.openclaw.ai/concepts/multi-agent
- https://docs.openclaw.ai/gateway/config-tools/tool-policy
- https://docs.openclaw.ai/gateway/local-models
- https://docs.openclaw.ai/providers/ollama/setup
