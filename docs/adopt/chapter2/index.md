---
title: 第 2 章｜手動安裝 OpenClaw
description: 在自己的電腦安裝 OpenClaw CLI，並啟動初始設定精靈。
---

# 第 2 章｜手動安裝 OpenClaw

> 本章帶你在自己的電腦安裝 OpenClaw CLI，並啟動初始設定精靈。實際安裝步驟可能隨 OpenClaw 版本調整；執行前請核對[官方安裝文件](https://docs.openclaw.ai/install)及安裝程式來源。

## 1. 選擇執行環境

| 作業系統 | 建議方式 | 補充 |
|---|---|---|
| macOS | 原生終端機 | 使用 Terminal 或 iTerm2。 |
| Linux | 原生終端機 | 建議使用仍在維護中的發行版。 |
| Windows | PowerShell 或 WSL2 | 若遇到相容性問題，可優先考慮 WSL2。 |

## 2. 安裝前檢查

1. 確認你有目前作業系統的管理員或必要安裝權限。
2. 僅從 OpenClaw 官方網域或官方 Repository 取得指令。
3. 閱讀安裝腳本內容及其要求的權限。不要把來路不明的 `curl | bash` 或 PowerShell 管線命令貼進終端機。
4. 確認網路可連線至安裝所需來源。

## 3. 執行官方安裝程式

以下指令沿用上游教材所列的官方安裝入口。由於這類指令會下載並執行遠端腳本，請先確認網址及腳本內容，再決定是否執行。

### macOS、Linux 與 WSL2

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### Windows PowerShell

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
iwr -useb https://openclaw.ai/install.ps1 | iex
```

執行前請確認下載來源為 `openclaw.ai`。若不熟悉 PowerShell 執行原則，請先閱讀 Microsoft 官方說明。

## 4. 驗證安裝

```bash
openclaw --version
```

若系統顯示版本號，代表 CLI 已可被找到。若出現「找不到指令」，重新開啟終端機，再檢查 Node.js、npm 全域安裝路徑及 PATH 設定。

## 5. 啟動初始設定精靈

```bash
openclaw onboard --install-daemon
```

設定精靈會依版本引導你完成 Gateway、模型供應商、聊天平台及背景服務等項目。初次使用建議先完成最小可用設定，不必一次啟用所有聊天平台與 Skills；先在本機測試，再考慮遠端存取或群組使用。

API 金鑰應放在官方支援的安全設定位置，不要提交到 Git Repository、截圖或公開訊息。尚未確認工具權限與沙箱行為前，不要授予不必要的檔案、Shell 或網路權限。

## 6. 關於模型費用與本機模型

OpenClaw 的安裝與模型推論是兩件事：安裝 CLI 本身不代表已經有可用模型。某些模型供應商按 Token 計費；若希望降低外部 API 依賴，可研究在自己的電腦執行 Ollama 等本機推論服務，再依 OpenClaw 目前支援的 Provider 設定連線。

本網站的翻譯流程與 OpenClaw 實際使用的模型設定分開。本站翻譯工具優先採 IBM 開發的 Granite 模型，不使用中國開發的模型；這不代表 OpenClaw 必須使用同一個模型。

## 7. 安裝完成檢查清單

- [ ] `openclaw --version` 能正確顯示版本。
- [ ] 已完成初始設定精靈，並確認 Gateway 狀態。
- [ ] 已使用低權限方式進行第一次本機測試。
- [ ] 尚未把 API 金鑰或敏感設定提交到版本控制。
- [ ] 已閱讀[安全防護章節](/adopt/chapter10)及官方安全文件。

## 來源與版本提醒

本章以 Datawhale China／Hello Claw 上游教材第二章為基礎，調整為台灣繁體中文並補充安全提醒。上游基準提交：[`724fc3e`](https://github.com/datawhalechina/hello-claw/commit/724fc3e251c58a16f92fb961c33bc207fa54ecb8)（2026-11-05）。本頁指令可能隨官方安裝流程變動，正式執行前請以[OpenClaw 官方文件](https://docs.openclaw.ai/)為準。

原始教材授權及改作說明請見[來源與授權](/about/source-license)。
