---
title: 02｜安裝前準備與環境檢查
description: 確認 Node.js、作業系統、模型來源與費用，再依官方流程安裝 OpenClaw。
---

# 02｜安裝前準備與環境檢查

安裝前先把三件事弄清楚：**你要在哪裡運行 Gateway、模型要從哪裡來、助理預計要處理什麼資料。** 這會影響你該選哪種安裝方式、模型供應商，以及後續的安全設定。

> 本頁依 OpenClaw 官方文件於 2026-11-10 查核。安裝腳本、系統需求與支援平台會變動，操作前請再查看官方安裝頁。

## 1. 選擇部署位置

| 部署位置 | 優點 | 需要留意 |
|---|---|---|
| 自己的桌上型電腦／筆電 | 容易測試，資料與服務都在自己管理的環境 | 關機或休眠時，背景服務可能無法持續提供服務 |
| 家中常駐主機 | 可長時間運作，適合個人自動化 | 需要處理系統更新、備份、網路與電力 |
| VPS／雲端主機 | 可持續連線，適合遠端使用 | 需額外管理 SSH、Firewall、Gateway 認證及費用 |

剛開始學習，建議先在自己控制的電腦完成安裝與本機測試，不要一開始就公開 Gateway 到網際網路。

## 2. 確認作業系統與 Node.js

依目前 OpenClaw 官方安裝文件：

- Node.js 22.22.3 以上、24.15 以上，或 25.9 以上版本皆列於官方支援需求。
- 官方目前以 Node.js 26 作為推薦的預設版本；安裝程式在找不到 Node.js 時可自動協助安裝。
- 若你自行管理 Node.js，請確認所選版本仍在 OpenClaw 官方支援範圍。
- macOS、Linux 與 Windows 均有支援的安裝路徑。Windows 可考慮原生 Hub 應用程式、PowerShell CLI 安裝或 WSL2 Gateway。

先開啟終端機檢查：

```bash
node --version
npm --version
```

若 Node.js 版本太舊，請先從 [Node.js 官方網站](https://nodejs.org/)安裝支援版本；不要使用來路不明的安裝包或第三方鏡像。

## 3. 選擇模型連線方式

OpenClaw 本身不等於某一個模型。你需要選擇一個可用的模型路徑：

| 方式 | 適合情況 | 成本與資料考量 |
|---|---|---|
| 雲端模型 API | 電腦硬體不足、希望快速體驗 | 通常依使用量計費；輸入內容會送到供應商 |
| 本機模型 | 重視本機推論、想降低 API 用量 | 需要足夠 RAM／VRAM、磁碟空間與可接受的推論速度 |
| 混合使用 | 一般任務用本機模型，較難任務才使用雲端 | 設定較複雜，必須清楚知道哪些內容會送到雲端 |

選模型時不只比較參數量，也要確認工具呼叫、繁體中文品質、上下文長度、硬體需求與授權條件。本站範例以非中國開發的模型為優先候選；實際表現仍要用自己的任務測試。

本機模型可先參考 [OpenClaw 本機模型說明](https://docs.openclaw.ai/gateway/local-models)與 [Ollama Provider 設定](https://docs.openclaw.ai/providers/ollama/setup)。

## 4. 執行官方安裝流程

### macOS、Linux 與 WSL2

OpenClaw 官方提供安裝腳本：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

這個命令會下載並執行官方網域提供的腳本。若你希望先檢查腳本內容，可先下載到檔案、閱讀後再執行；不要把來源不明的 Shell 指令貼進終端機。

### Windows PowerShell

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

同樣地，這個命令會執行從官方網域取得的安裝腳本。若不熟悉 PowerShell，可先閱讀 [Windows 官方安裝說明](https://docs.openclaw.ai/platforms/windows)。

### 其他安裝方式

官方也提供 npm、Docker、Nix 與從原始碼安裝等方法。初學者先使用官方建議的安裝路徑即可；有明確的版本管理或部署需求，再選擇其他方式。

## 5. 安裝完成後先驗證

安裝程式可能會直接啟動初始設定精靈。完成後，重新開啟終端機並執行：

```bash
openclaw --version
openclaw gateway status
```

第一個命令確認 CLI 可被系統找到；第二個命令查看 Gateway 服務狀態。若系統顯示找不到 `openclaw`，先檢查終端機是否重新開啟、PATH 是否包含安裝路徑，以及安裝過程是否有錯誤。

## 6. 安裝前的安全檢查

- 不要把 API Key、Bot Token、密碼或私密設定貼進公開聊天或提交到 Git Repository。
- 不要在第一次測試時就開放公開私訊、群組或外部網路存取。
- 不要一次安裝大量 Skills 或 Plugins；先檢查來源、權限與程式內容。
- 若使用雲端模型，避免先投入病歷、身分資料、未公開研究或其他機密內容。
- 安裝和初次設定請使用自己有管理權限的帳號，不要以不必要的系統管理員權限執行。

## 下一步

環境確認完成後，前往[完成第一次對話](/guide/first-assistant/)。我們會啟動 onboarding、檢查 Gateway，再透過控制介面測試模型是否真的能回覆。

## 官方文件

- [OpenClaw 安裝總覽](https://docs.openclaw.ai/install)
- [Getting started](https://docs.openclaw.ai/getting-started)
- [Windows 安裝](https://docs.openclaw.ai/platforms/windows)
- [Node.js 官方網站](https://nodejs.org/)

> 本頁為本站原創教學。系統需求與指令查核日期：2026-11-10。
