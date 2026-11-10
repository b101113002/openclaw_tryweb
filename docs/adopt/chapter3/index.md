---
title: 第 3 章｜初始設定精靈
description: 使用 OpenClaw Onboarding 設定模型、工作區、Gateway、聊天渠道與背景服務。
---

# 第 3 章｜初始設定精靈

> 完成本章後，你將了解如何設定模型、工作區、Gateway 與聊天平台，並知道如何安全地重新設定 OpenClaw。

> **前置條件：** 已完成[第 2 章：手動安裝 OpenClaw](/adopt/chapter2/)。

::: warning 版本提醒
OpenClaw 的命令列選項與設定欄位可能隨版本變更。本文保留上游教材所依據的指令與設定方式；實際執行前，請以[官方文件](https://docs.openclaw.ai/)及你安裝的版本為準。
:::

## 0. 兩種設定方式，選擇一種

**Onboarding（初始設定精靈）**會協助你設定三件事：使用哪個模型、透過哪些渠道聯絡你，以及 Agent 在哪裡工作。OpenClaw 提供兩種主要方式：

~~~mermaid
flowchart TB
  subgraph CLI["CLI 設定精靈（跨平台）"]
    A1["openclaw onboard"] --> A2["終端機互動設定"] --> A3["可腳本化／非互動執行"]
  end
  subgraph MAC["macOS 應用程式引導（僅 macOS）"]
    B1["啟動 OpenClaw.app"] --> B2["圖形化逐步引導"] --> B3["申請系統權限"]
  end
  A3 --> C["啟動 Gateway<br/>完成基本設定"]
  B3 --> C
~~~

| 方式 | 適用情境 | 支援平台 |
|---|---|---|
| **CLI 設定精靈** | 想掌握完整設定、使用遠端伺服器或自動化腳本 | macOS、Linux、Windows（WSL2） |
| **macOS 應用程式引導** | 偏好圖形介面，或需要語音、攝影機等原生系統權限 | macOS |

> **已在第 2 章執行過 openclaw onboard？** 基本設定可能已完成。本章會說明每個步驟的用途，以及如何調整。

---

## 1. CLI 設定精靈（所有支援平台）

### 1.1 啟動設定精靈

~~~bash
openclaw onboard
~~~

若要同時安裝背景服務，可加入 --install-daemon：

~~~bash
openclaw onboard --install-daemon
~~~

### 1.2 QuickStart 與 Advanced

啟動後，精靈會詢問要使用 **QuickStart（快速開始）** 或 **Advanced（進階模式）**。

| 模式 | 自動設定內容 | 適合對象 |
|---|---|---|
| **QuickStart** | 本機 Gateway、預設工作區、連接埠 18789、Token 驗證及 coding 工具設定 | 第一次使用，希望先完成基本對話 |
| **Advanced** | 可逐項自訂設定 | 遠端部署、Tailscale 或有特殊安全需求的使用者 |

<details>
<summary>查看 QuickStart 預設設定</summary>

QuickStart 會套用以下預設值（實際內容請以安裝版本為準）：

| 設定項目 | 預設值 | 說明 |
|---|---|---|
| Gateway 位置 | 本機（loopback） | 預設只接受本機連線 |
| 工作區 | ~/.openclaw/workspace/ | 若已有工作區，可能沿用既有設定 |
| Gateway 連接埠 | 18789 | 預設服務連接埠 |
| 驗證方式 | Token（自動產生） | 即使僅供本機使用，也需要驗證 |
| 工具設定 | tools.profile: "coding" | 啟用檔案及執行環境相關工具 |
| 私訊隔離 | session.dmScope: "per-channel-peer" | 依渠道與對象區分私訊會話 |
| Tailscale | 關閉 | 不會自動公開到 Tailnet |
| Telegram／WhatsApp 私訊 | 白名單模式 | 依精靈提示設定允許的使用者 |

若原本已經設定 tools.profile，精靈可能保留既有值，不會直接覆蓋。

</details>

### 1.3 設定精靈的六個主要步驟

#### 步驟一：模型與驗證方式

選擇模型供應商，並依其要求設定 API Key 或其他驗證方式。模型供應商的比較與本機模型設定，請參考[第 5 章：模型管理](/adopt/chapter5/)。

<details>
<summary>安全提醒：模型選擇與工具權限</summary>

如果 Agent 會執行工具（例如執行命令、讀寫檔案、呼叫 API），或會處理 Webhook、Hooks 等外部內容，請注意：

- 優先選用能力及安全防護持續更新的模型；模型能力本身並不能取代工具權限控管。
- 維持嚴格的工具政策。除非你完全理解所有輸入來源與執行風險，否則不要使用不限制工具的 tools.profile: "full"。
- 對外部輸入採取不信任原則，避免讓網頁或文件中的惡意提示詞指示 Agent 執行未授權操作。
- 只開啟完成任務所需的工具與檔案權限。

延伸閱讀：[第 10 章：安全防護與威脅模型](/adopt/chapter10/)。

</details>

<details>
<summary>金鑰儲存：明文設定與 SecretRef</summary>

設定精靈的某些流程會將 API Key 直接寫入設定檔。若希望避免在設定檔中保存明文憑證，可使用 Secret Reference（SecretRef），讓設定指向環境變數或受支援的外部憑證來源。

**互動模式：** 若精靈提供 Secret Reference 選項，可選擇環境變數或 Provider Ref（檔案／可執行程式），並依提示驗證參照是否有效。

**非互動模式：** 上游範例使用 --secret-input-mode ref。執行前先在目前的程序環境設定好對應環境變數：

~~~bash
export OPENAI_API_KEY="YOUR_API_KEY"
openclaw onboard --secret-input-mode ref --non-interactive
~~~

不要把真實 API Key 寫入文件、貼到聊天訊息或提交到 Git Repository。若使用 Windows，請改用適合 PowerShell 的環境變數設定方式。

</details>

#### 步驟二：設定工作區

工作區（Workspace）是 Agent 存放身分、偏好、記憶與工作檔案的位置。預設路徑通常為：

~~~text
~/.openclaw/workspace/
~~~

其中可能包含 IDENTITY.md、MEMORY.md 等檔案。若目錄中已有檔案，設定精靈可能會保留既有內容。請確認工作區不是不小心指向包含大量私人資料的上層目錄。

#### 步驟三：設定 Gateway

設定 Gateway 的連接埠（上游教材列出的預設值為 18789）、綁定位址及驗證方式。

初次使用建議維持本機綁定，不要為了方便直接監聽所有網路介面。若要從其他裝置連線，請先閱讀[第 9 章：遠端存取與網路](/adopt/chapter9/)，並使用 VPN、Tailscale 或 SSH 隧道等受控方式。

<details>
<summary>Gateway Token 與 SecretRef</summary>

互動式 Token 設定可能提供以下選項：

- **明文 Token：** 將 Token 儲存在設定檔中。
- **SecretRef：** 透過環境變數或外部憑證來源管理 Token。

上游教材中的非互動設定範例如下：

~~~bash
openclaw onboard --gateway-token-ref-env GATEWAY_TOKEN --non-interactive
~~~

請先確認 GATEWAY_TOKEN 已在 Gateway 服務實際執行時可取得；只在目前終端機設定變數，不一定代表背景服務也能讀取。

若同時設定 gateway.auth.token 和 gateway.auth.password，卻沒有明確設定 gateway.auth.mode，某些版本會阻止安裝背景服務，直到你指定驗證模式。

</details>

#### 步驟四：連接聊天渠道

選擇要連接的聊天平台，例如 WhatsApp、Telegram、Discord 等。初次安裝可以先跳過，之後再使用：

~~~bash
openclaw channels add
~~~

新增渠道。各平台的權限、Bot Token 與配對方式不同，請參考[第 4 章：連接聊天平台](/adopt/chapter4/)。

#### 步驟五：安裝背景服務

安裝背景服務後，Gateway 可以在使用者登入或系統啟動時依設定自動執行。上游教材提到的服務管理方式包括：

- **macOS：** LaunchAgent。
- **Linux／WSL2：** systemd 使用者服務。

請確認服務會以你的使用者身分執行，並理解它能存取哪些目錄與環境變數。

<details>
<summary>背景服務與 SecretRef 注意事項</summary>

- 若 Token 使用 SecretRef，安裝背景服務時可能會驗證參照是否有效，但不一定會將解析後的 Token 複製到服務環境。
- 若 SecretRef 無法解析，背景服務安裝可能會中止，並要求先修正憑證來源。
- 可以使用 openclaw doctor 檢查部分設定與服務問題。

</details>

#### 步驟六：健康檢查與技能安裝

啟動 Gateway，確認服務狀態，再依需求安裝技能（Skills）。不要一次安裝大量不熟悉的技能；先檢查來源、權限和程式碼，再以低權限環境測試。

技能開發及發布的延伸內容，請參考[附錄 D：技能開發與發布指南](/appendix/appendix-d/)。

### 1.4 設定網路搜尋

若希望 Agent 使用網路搜尋，需要選擇並設定搜尋供應商。上游教材列出的選項包含：

| 供應商 | 說明 |
|---|---|
| Perplexity | AI 搜尋服務 |
| Brave | 搜尋服務，提供隱私相關功能 |
| Gemini | Google 的 AI 服務 |
| Grok | xAI 的 AI 服務 |
| Kimi | 月之暗面提供的服務 |

這些服務的 API 可用性、免費額度、地區限制與計費方式可能變動。使用前請查閱官方價格及資料政策。若目前不需要網路搜尋，可先跳過，避免多建立一組 API 憑證。

後續也可嘗試透過以下命令調整 Web 設定：

~~~bash
openclaw configure --section web
~~~

---

## 2. macOS 應用程式引導

首次啟動 OpenClaw.app（Control UI）時，應用程式可能會開啟圖形化設定流程。這個方式僅適用於 macOS。

### 2.1 引導步驟總覽

| 步驟 | 內容 | 操作 |
|---|---|---|
| ① | macOS 安全性提示 | 閱讀提示並確認來源 |
| ② | 本機網路探索 | 依實際需求允許尋找本機網路裝置 |
| ③ | 安全說明 | 閱讀信任模型與權限界線 |
| ④ | 選擇 Gateway 位置 | 本機／遠端／稍後設定 |
| ⑤ | 系統權限申請 | 逐項檢視後再授權 |
| ⑥ | 安裝 CLI（選用） | 安裝 openclaw 命令列工具 |
| ⑦ | Onboarding 對話 | 查看助理的自我介紹與後續引導 |

### 2.2 安全說明（步驟 ③）

應用程式會顯示 OpenClaw 的信任模型與操作風險。閱讀後再決定是否繼續。

<details>
<summary>什麼是信任模型？</summary>

- **預設定位：** 個人助理，假設由一位可信任的主要操作者管理。
- **多使用者情境：** 應拆分使用者信任邊界，採最小權限工具政策，不要讓互不信任的使用者共用同一組高權限 Agent。
- **本機安裝：** 上游教材指出，新的本機安裝可能使用 tools.profile: "coding"。這不代表工具只會在安全沙箱內執行，仍須檢查實際工具與執行邊界。

</details>

### 2.3 選擇 Gateway 位置（步驟 ④）

| 選項 | 說明 |
|---|---|
| **This Mac（本機）** | 在目前 Mac 上執行 Gateway，由應用程式設定本機驗證及憑證 |
| **Remote（遠端）** | 連接遠端 Gateway，例如透過 SSH 或 Tailnet；本機應用程式不應擅自重設遠端主機的認證 |
| **Configure later（稍後設定）** | 跳過設定，之後再完成連線 |

<details>
<summary>Gateway 認證提醒</summary>

- 即使是本機 loopback 連線，也可能需要 Token；請勿假設「只在本機」就代表不需要驗證。
- 停用驗證可能讓其他本機程序連入，僅應在完全可信任且隔離的環境中評估。
- 多裝置連線或非 loopback 綁定時，務必採用適當的 Token／憑證驗證，並限制網路暴露範圍。

</details>

### 2.4 macOS 系統權限（步驟 ⑤）

macOS 應用程式可能依功能需求申請以下 TCC 權限：

| 權限 | 用途 |
|---|---|
| **Automation（自動化）** | 透過 AppleScript 控制其他應用程式 |
| **Notifications（通知）** | 傳送通知提醒 |
| **Accessibility（輔助使用）** | 進行使用者介面操作 |
| **Screen Recording（螢幕錄製）** | 截圖或螢幕分享 |
| **Microphone（麥克風）** | 語音輸入 |
| **Speech Recognition（語音辨識）** | 將語音轉成文字 |
| **Camera（攝影機）** | 擷取影像 |
| **Location（位置）** | 取得位置資訊 |

> 不需要的權限可以先不授予，之後可到 macOS「系統設定 → 隱私權與安全性」調整。請採取最小權限原則。

### 2.5 安裝 CLI（步驟 ⑥）

安裝全域 openclaw CLI 後，才能在終端機使用命令及部分排程功能。若已依[第 2 章](/adopt/chapter2/)完成安裝，可略過重複步驟。

### 2.6 Onboarding 對話（步驟 ⑦）

設定完成後，助理可能會透過專用的引導會話介紹功能及下一步。這是初始引導，不應直接視為你已經完成所有安全設定。

---

## 3. 自訂模型供應商（Custom Provider）

若設定精靈沒有列出你使用的模型供應商，可以選擇 **Custom Provider（自訂供應商）**。一般需要設定以下資料：

| 步驟 | 欄位 | 說明與範例 |
|---|---|---|
| 1 | 相容類型 | OpenAI-compatible、Anthropic-compatible 或 Unknown（自動偵測） |
| 2 | Base URL | 供應商 API 端點，例如 https://api.example.com/v1 |
| 3 | API Key | 供應商要求的金鑰；若使用本機服務，依其設定決定 |
| 4 | Model ID | 模型識別字串，例如 example-model |
| 5 | Alias（選用） | 方便記憶的別名 |
| 6 | Endpoint ID | 用來區分多個自訂端點 |

<details>
<summary>同時設定多個自訂端點</summary>

上游教材示範以 Endpoint ID 區分不同端點。以下為格式示意，請換成自己的端點；金鑰請使用環境變數或 SecretRef，不要把真實憑證寫進公開設定檔。

~~~json
{
  "models": {
    "providers": {
      "custom-company-a": {
        "type": "openai",
        "baseUrl": "https://api.company-a.example/v1",
        "apiKey": "YOUR_COMPANY_A_API_KEY"
      },
      "custom-company-b": {
        "type": "anthropic",
        "baseUrl": "https://api.company-b.example",
        "apiKey": "YOUR_COMPANY_B_API_KEY"
      }
    }
  }
}
~~~

實際設定欄位及支援的 Provider 類型可能依 OpenClaw 版本不同，請查閱[官方設定文件](https://docs.openclaw.ai/)。

</details>

---

## 4. 多智能體設定

OpenClaw 可在同一個 Gateway 下管理多個 Agent。每個 Agent 可以有獨立的工作區、會話及渠道綁定，適合將不同任務或使用情境分開管理。

### 4.1 新增 Agent

~~~bash
openclaw agents add <name>
~~~

請將 `<name>` 換成你要建立的 Agent 名稱。

### 4.2 Agent 的常見設定欄位

| 設定欄位 | 說明 |
|---|---|
| agents.list[].name | Agent 名稱 |
| agents.list[].workspace | 工作區路徑；上游教材示例預設為 `~/.openclaw/workspace-<agentId>` |
| agents.list[].agentDir | Agent 自己的設定目錄 |

<details>
<summary>非互動建立與訊息路由</summary>

原始教材提供以下非互動範例。請依目前版本確認參數名稱及渠道格式：

~~~bash
openclaw agents add worker-bot \
  --model "provider/model-id" \
  --agent-dir ~/.openclaw/agents/worker \
  --bind "telegram:chat:12345" \
  --non-interactive
~~~

**訊息路由（Binding）：** 可將特定聊天渠道或對話綁定至指定 Agent，讓不同助理負責不同群組或任務。請確認綁定對象與權限，避免把私人 Agent 意外暴露到公開群組。

</details>

---

## 5. 重新設定與維護

### 5.1 重新執行設定精靈

若只需要調整既有設定，可執行：

~~~bash
openclaw configure
~~~

上游教材區分：
- configure：調整既有設定。
- onboard：執行初始設定流程。

重新設定前建議先備份設定檔，避免不小心修改已正常運作的渠道或驗證方式。

### 5.2 重設設定

上游教材列出以下重設範例：

~~~bash
# 重設設定、憑證及會話
openclaw onboard --reset

# 完整重設，包含工作區
openclaw onboard --reset --reset-scope full
~~~

::: danger 具破壞性操作
重設可能清除設定、憑證、會話或工作區資料。除非你已備份並確定要清除，否則不要執行。若只是修改單一設定，優先使用 openclaw configure。
:::

### 5.3 設定異常處理

若設定檔格式錯誤或背景服務無法啟動，可先使用：

~~~bash
openclaw doctor
~~~

此命令可檢查部分設定與服務問題，但不代表它能自動修復所有環境錯誤。執行修復前仍應閱讀提示。

<details>
<summary>非互動模式：用於腳本化部署</summary>

在 CI/CD 或大量主機部署時，可以使用非互動模式，避免等待人工逐項回答：

~~~bash
openclaw onboard \
  --non-interactive \
  --auth-choice openai-api-key \
  --install-daemon
~~~

注意：

- --json 只會影響輸出格式，不代表啟用了非互動模式。
- 非互動模式仍需要透過參數或環境變數提供必要設定。
- 若使用 --secret-input-mode ref，必須先準備好相對應的環境變數或 SecretRef。
- 不要在 CI/CD 日誌輸出秘密值，也不要把憑證寫入 Pipeline YAML。

</details>

---

## 6. 常見問題

**Q：設定檔放在哪裡？**

上游教材列出的預設狀態目錄為 ~/.openclaw/，工作區通常位於 ~/.openclaw/workspace/。實際路徑可能因 profile 或環境變數而不同。設定檔欄位請參考[附錄 G：設定檔詳解](/appendix/appendix-g/)。

**Q：設定完成後，如何立即開始對話？**

上游教材列出以下方式：

~~~bash
openclaw tui         # 在終端機對話
openclaw dashboard   # 開啟瀏覽器 Dashboard
~~~

Dashboard 可在未設定聊天渠道時提供本機操作入口；請依目前版本確認命令及介面。

**Q：模型供應商不在清單中怎麼辦？**

選擇 **Custom Provider**，填入相容類型、Base URL、模型 ID 及必要的驗證資訊。詳見本章第 3 節及[第 5 章：模型管理](/adopt/chapter5/)。

**Q：Remote 模式會修改遠端主機嗎？**

依上游教材的說明，Remote 模式主要是設定本機用戶端如何連接遠端 Gateway（例如透過 SSH 隧道或 Tailnet）。實際會否修改遠端設定，仍取決於你使用的應用程式及操作選項。請勿將遠端連線設定視為完全沒有副作用。

**Q：重新執行設定精靈會覆蓋既有設定嗎？**

不一定。上游教材指出，只有傳入 --reset 等重設參數時才會執行重設流程；不同版本的實際行為可能不同。操作前請先備份，並閱讀命令輸出。

---

## 本章檢查清單

- [ ] 已選擇 QuickStart 或 Advanced，並理解兩者差異。
- [ ] 已設定模型供應商及驗證方式，且沒有把金鑰提交到 Repository。
- [ ] 已確認工作區路徑及資料夾存取範圍。
- [ ] Gateway 僅暴露於必要的網路介面，並啟用適當驗證。
- [ ] 僅連接需要的聊天渠道。
- [ ] 背景服務使用適當的使用者身分執行。
- [ ] 已理解 --reset 及完整重設可能造成的資料遺失。
- [ ] 已閱讀[安全防護與威脅模型](/adopt/chapter10/)。

## 原始來源與改作說明

- 原始文章：[Datawhale China／Hello Claw：第三章 初始配置向導](https://github.com/datawhalechina/hello-claw/blob/main/docs/cn/adopt/chapter3/index.md)
- 本次翻譯依據的上游檔案版本：24d878fdd45ac4033ce0b70e90b8ba8479c68278
- 翻譯與編輯：台灣繁體中文；保留 CLI、設定鍵及命令，補充憑證、權限及版本風險提醒。
- 原始教材授權：CC BY-NC-SA 4.0；詳見[來源與授權](/about/source-license)。
