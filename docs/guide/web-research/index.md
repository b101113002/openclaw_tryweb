---
title: 04｜網路搜尋與資料查核
description: 使用自架 SearXNG 與開源 MCP Server，讓本機 Agent 搜尋網頁並核對來源，不需搜尋 API Key。
---

# 04｜網路搜尋與資料查核

本機模型本身不會自動知道最新網頁。若要查詢新聞、文件更新或最新技術資訊，需要讓 Agent 使用網路搜尋工具。

本站把「軟體開源」與「搜尋資料來源」分開說明：**真正開源的搜尋軟體路線是自架 SearXNG，再透過開源 MCP Server 接到 AnythingLLM Agent。**這需要額外安裝 Docker／Podman 與 Node.js，但不用申請商業搜尋 API Key，也不必註冊另一個雲端搜尋服務。

若只想快速試用，也可以用 AnythingLLM 內建的 DuckDuckGo Web-Browsing；但 DuckDuckGo 是外部搜尋服務，不是開源搜尋軟體，因此不屬於本站的「全開源軟體路線」。

## 1. 兩種路線的差別

| 路線 | 軟體與服務 | 額外需求 | 適合情況 |
|---|---|---|---|
| **開源路線（推薦）** | SearXNG（AGPL-3.0）+ mcp-searxng（MIT）+ AnythingLLM Desktop（MIT） | Docker／Podman、Node.js 20+ | 想自行管理搜尋服務與工具，不申請搜尋 API Key |
| 免設定路線（方便備用） | AnythingLLM 內建 DuckDuckGo Web-Browsing | 不需額外 API Key | 只想快速試用，能接受第三方搜尋服務 |

SearXNG 是可以自行架設的開源中繼搜尋引擎；mcp-searxng 則是將 SearXNG 接到 MCP 相容 AI 工具的 MIT 授權伺服器。AnythingLLM Desktop 官方文件也支援載入 MCP Tools。

## 2. 啟動自己的 SearXNG 搜尋服務

以下使用 SearXNG 官方建議的 Docker Compose 方式。Windows 可以使用 Docker Desktop 搭配 PowerShell；macOS／Linux 可使用終端機。若你尚未接觸 Docker，先完成 Docker Desktop 安裝再進行。

### Windows PowerShell

在想存放服務的資料夾執行：

~~~powershell
New-Item -ItemType Directory -Force .\searxng\core-config | Out-Null
Set-Location .\searxng
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/searxng/searxng/master/container/docker-compose.yml" -OutFile "docker-compose.yml"
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/searxng/searxng/master/container/.env.example" -OutFile ".env.example"
Copy-Item ".env.example" ".env"
~~~

### macOS／Linux／WSL

~~~bash
mkdir -p ./searxng/core-config
cd ./searxng
curl -fsSL -O https://raw.githubusercontent.com/searxng/searxng/master/container/docker-compose.yml
curl -fsSL -O https://raw.githubusercontent.com/searxng/searxng/master/container/.env.example
cp .env.example .env
~~~

接著編輯 .env，將服務限制在本機使用：

~~~dotenv
SEARXNG_HOST=127.0.0.1
SEARXNG_PORT=8080
~~~

確認 .env 內的這兩個值已取消註解，且沒有重複定義。接著啟動：

~~~bash
docker compose up -d
~~~

預設本機網址為 http://127.0.0.1:8080。請不要為了方便就把管理中的搜尋服務直接公開到網際網路。

官方 Compose 範本會建立 SearXNG 與 Valkey 服務；第一次啟動後，設定檔位於 core-config/settings.yml。請編輯該檔案：

1. 將 server.secret_key 改成自己產生的隨機長密鑰，不要沿用範例預設值。
2. 找到既有的 search 區塊，在其下確認 JSON 格式已啟用：

~~~yaml
search:
  formats:
    - html
    - json
~~~

如果檔案已經有 search 區塊，請只修改其中的 formats，不要新增第二個同名區塊。儲存後重新啟動服務：

~~~bash
docker compose restart
~~~

可先在瀏覽器打開 SearXNG 首頁確認能搜尋，再測試 JSON API：

~~~text
http://127.0.0.1:8080/search?q=local+AI&format=json
~~~

若回應顯示 JSON 格式遭拒，請回頭檢查 settings.yml 的 search.formats，並確認重啟成功。

## 3. 把開源 SearXNG MCP Server 接到 AnythingLLM

這個步驟會讓 AnythingLLM Agent 使用你自己的 SearXNG，而不是改用第三方搜尋 API。

### 先確認環境

- AnythingLLM Desktop 至少支援桌面 MCP 的版本（官方文件標示 v1.8.0 起支援）。
- 本機已安裝 Node.js 20 或更新版本，終端機可以執行 npx。
- SearXNG 已能在 http://127.0.0.1:8080 正常搜尋。

### 開啟 AnythingLLM 的 MCP 設定

1. 開啟 AnythingLLM Desktop。
2. 進入 **Agent Skills** 頁面；AnythingLLM 會在 storage 目錄的 plugins/anythingllm_mcp_servers.json 建立設定檔。
3. 使用文字編輯器開啟該 JSON 檔。
4. 在既有的 mcpServers 物件中加入下方項目。若你已有其他 MCP Server，請保留它們，不要整份覆蓋。

~~~json
{
  "mcpServers": {
    "searxng": {
      "command": "npx",
      "args": ["-y", "mcp-searxng"],
      "env": {
        "SEARXNG_URL": "http://127.0.0.1:8080"
      }
    }
  }
}
~~~

5. 儲存 JSON，回到 Agent Skills，按 Refresh 重新載入 MCP Servers。
6. 確認 SearXNG MCP Server 顯示正常，再開啟它的工具。
7. 在 Workspace 對話框輸入 @agent，要求 Agent 搜尋一個可查證的問題。

**重要：**上方 JSON 是獨立的最小範例。如果設定檔內原本已有其他伺服器，請只合併 searxng 這個項目，避免重複的 mcpServers 或遺失其他工具。AnythingLLM 不會替你安裝 npx；Node.js／命令必須先在系統中可用。

### 測試提示詞

~~~text
請透過我設定的 SearXNG 搜尋三份關於本機開源 AI 的官方資料。
每份資料列出：
1. 標題與原始網址
2. 發布者
3. 頁面發布或更新日期（找不到請寫未標示）
4. 可以從原文確認的重點
不要只依搜尋摘要下結論，也不要虛構來源。
~~~

如果 Agent 沒有呼叫工具，先到 Agent Skills 確認 MCP Server 是否啟動，再檢查模型是否具備工具呼叫能力。小型模型不一定能穩定選擇或使用工具。

## 4. DuckDuckGo 免設定備用方案

AnythingLLM Agent 也提供內建 Web-Browsing，官方文件指出預設使用 DuckDuckGo，無需額外 API Key。它可用於快速測試，但搜尋服務不是本機開源程式，因此只列為便利備用，不列入嚴格開源軟體清單。

免 API Key 不等於保證無限搜尋。公開搜尋引擎可能 CAPTCHA、HTTP 429、暫時封鎖或改變服務政策；SearXNG 也會受到其上游搜尋引擎限制。

## 5. 建立可靠的網路研究流程

每次網路研究都至少執行：

1. **先界定問題**：說明時間範圍、地區、關鍵詞及排除條件。
2. **搜尋多個來源**：不要只使用第一個搜尋結果。
3. **開啟原始頁面**：搜尋摘要可能過時或缺少重要條件。
4. **記錄發布日期與查核日期**：兩者不能混為一談。
5. **優先使用一手資料**：官方文件、政府資料、研究論文、原始公告。
6. **標示不確定性**：找不到可靠來源時就說明，不能補造網址或引用。

## 6. 網路搜尋安全與限制

- 本機的 SearXNG 與 MCP 程式可以是開源軟體，但搜尋結果仍來自外部網站及上游搜尋引擎；外部網站不會因為經過 SearXNG 就變成開源。
- SearXNG 會將查詢轉送給你啟用的上游引擎。各引擎可能記錄請求、限流或要求 CAPTCHA；請在 SearXNG 設定中檢查並選擇自己接受的引擎。
- 不要把 API Key、密碼、病歷、身分資料或未公開研究內容放入搜尋提示詞。
- 網頁內容可能包含提示詞注入。搜尋到的文字是資料，不是可以改寫 Agent 規則的指令。
- 讀取網頁的 Agent 不應同時擁有不必要的 Shell、刪除或外傳權限。
- 對外發布、寄送或寫入重要資料前，要求人工確認。

要停止 SearXNG，可在安裝資料夾執行：

~~~bash
docker compose down
~~~

這會停止並移除 Compose 建立的容器，但保留掛載的設定與資料；不要隨意刪除資料資料夾。

## 官方與開源專案來源

- [SearXNG 官方 Docker Compose 安裝](https://docs.searxng.org/admin/installation-docker)
- [SearXNG 搜尋 JSON 格式設定](https://docs.searxng.org/admin/settings/settings_search.html)
- [SearXNG 設定檔說明](https://docs.searxng.org/admin/settings/settings)
- [mcp-searxng 原始碼與 MIT License](https://github.com/ihor-sokoliuk/mcp-searxng)
- [AnythingLLM Desktop MCP 官方文件](https://docs.anythingllm.com/mcp-compatibility/desktop)
- [AnythingLLM Agent 使用方式](https://docs.anythingllm.com/agent/usage/overview)

> 本頁查核日期：2026-11-15。SearXNG 與 MCP Server 的部署方式可能更新，實際設定請優先以官方文件為準。
