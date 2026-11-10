---
title: 03｜完成第一次對話
description: 啟動 onboarding、檢查 Gateway、開啟控制介面，完成第一個可驗收的 OpenClaw 任務。
---

# 03｜完成第一次對話：從安裝到真正能用

安裝 CLI 只是開始。本課的完成條件是：Gateway 正常運作、控制介面可以開啟、模型完成一次真實回覆，而且你知道服務目前是以前景程序還是背景服務運行。

## 1. 啟動初次設定

如果安裝程式尚未啟動設定精靈，請執行：

```bash
openclaw onboard
```

目前的 `openclaw onboard` 會先偵測電腦上已可使用的 AI 連線，並透過實際 completion 測試候選模型，再進入 OpenClaw 的後續設定。這個引導流程會協助建立工作區、Gateway 與選用功能。

若你需要設定自訂 Provider、遠端 Gateway、聊天渠道配對、背景服務、Skills 或匯入既有設定，可明確執行傳統設定精靈：`openclaw onboard --classic`。

**重要：** 設定精靈會協助建立模型連線，但不代表你已經完成安全設定。仍要檢查 Gateway 綁定位置、認證、聊天渠道的配對規則，以及 Agent 的工具權限。若不確定某個選項的影響，先保留最小可用設定，完成第一次對話後再逐項開啟功能。

## 2. 確認 Gateway 狀態

```bash
openclaw gateway status
```

確認狀態正常後，再開啟控制介面：

```bash
openclaw dashboard
```

控制介面通常會在瀏覽器開啟。若 Gateway 尚未以背景服務運行，先確認目前精靈的選擇；需要背景執行時，依照官方 Gateway 服務文件使用對應的 install／start 流程。不要同時啟動多個不必要的 Gateway。

## 3. 送出第一則低風險測試

第一次測試請使用無個資、無機密的內容。例如：

```text
請用繁體中文介紹你目前能協助的三種任務。
接著說明：如果我請你整理一份文件，你會先確認哪些資訊？
```

這個任務只測試文字回覆，不需要讀取檔案或執行命令。若模型有正常回覆，代表基本連線已通；但還不能據此認定所有工具、聊天平台或排程功能都正常。

## 4. 檢查模型與工作階段

請確認：

- 目前使用的 Provider 與模型名稱是否正確。
- 回覆是否來自你預期的模型，而非意外切換到其他服務。
- 工作階段是否建立成功。
- 若使用雲端模型，是否能在 Provider 帳戶查看用量或計費紀錄。
- 若使用本機模型，是否確實走本機端點，而不是雲端 fallback。

你可以使用官方提供的診斷指令：

```bash
openclaw doctor
```

若服務狀態異常，依診斷結果處理；不要直接刪除整個 `~/.openclaw` 資料夾，因為其中可能有設定、憑證與工作資料。

## 5. 先不要急著連接所有聊天平台

在本機控制介面完成第一次對話後，再挑一個聊天平台測試。每接上一個平台，都應確認：

1. Bot Token 或憑證由官方管道取得，且沒有公開。
2. 私訊配對或允許清單符合預期。
3. 群組只允許必要的聊天室與使用者。
4. Bot 不會因陌生訊息就讀取私人檔案或執行工具。
5. 測試結束後知道如何撤銷憑證或解除連線。

## 6. 完成驗收清單

- [ ] `openclaw --version` 能顯示版本。
- [ ] `openclaw gateway status` 顯示服務正常。
- [ ] `openclaw dashboard` 可以開啟控制介面。
- [ ] 模型能對低風險測試問題產生回覆。
- [ ] 我知道目前使用的是雲端模型還是本機模型。
- [ ] 我沒有把 API Key、Token 或私人資料放入公開位置。
- [ ] 我知道如何停止或重新啟動 Gateway。

## 常見問題方向

| 現象 | 建議先檢查 |
|---|---|
| 找不到 `openclaw` 指令 | 重新開啟終端機、檢查 PATH 與安裝記錄 |
| Gateway 無法連線 | 執行 `openclaw gateway status`，確認服務是否啟動 |
| 模型沒有回覆 | 檢查 Provider 登入、API Key、模型名稱、用量與網路 |
| Dashboard 打不開 | 確認 Gateway 狀態與本機瀏覽器網址 |
| 回覆成功但工具失敗 | 分別檢查工具政策、權限、沙箱與工具本身的前置條件 |

## 下一步

前往[建立安全的使用邊界](/guide/safety/)，確認誰可以傳訊息給助理、助理可以接觸哪些資料，以及如何降低提示詞注入風險。

## 官方文件

- [Getting started](https://docs.openclaw.ai/getting-started)
- [Onboarding CLI](https://docs.openclaw.ai/start/wizard)
- [Gateway 管理](https://docs.openclaw.ai/gateway)
- [Doctor 診斷](https://docs.openclaw.ai/cli/doctor)

> 本頁為本站原創教學。流程查核日期：2026-11-10。
