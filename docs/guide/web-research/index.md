---
title: 04｜網路搜尋與資料查核
description: 使用免 API Key 的網路搜尋，讓本機 Agent 找資料、擷取網頁並核對來源。
---

# 04｜網路搜尋與資料查核

本機模型本身不會自動知道最新網頁。若要查詢新聞、文件更新或最新技術資訊，需要讓 Agent 使用網路搜尋工具。

本站優先採用不用另外註冊搜尋服務、不必申請 API Key 的路線。

## 1. AnythingLLM 內建 Web-Browsing

AnythingLLM Agent 提供 Web-Browsing 工具，官方文件指出預設使用 DuckDuckGo，不需要額外設定或 API Key。要注意 DuckDuckGo 是外部搜尋服務，不是本站可以自行修改或保證可用性的開源搜尋程式；它適合免註冊快速起步，但若你要求搜尋層也必須由自己管理，請閱讀下方的 SearXNG 進階路線。

基本操作：

1. 開啟 AnythingLLM 的 Agent Skills 設定。
2. 確認 Web-Browsing 工具已啟用。
3. 在 Workspace 的對話框輸入 `@agent`，啟動 Agent 工作階段（若你的模型／版本要求）。
4. 請它搜尋一個可以公開查證的問題。
5. 檢查它回報的網址，實際開啟原始網頁。

測試提示詞：

```text
請搜尋 2026 年 OpenClaw 官方文件中關於本機模型的最新說明。
優先使用官方文件，列出：
1. 文件標題與原始網址
2. 文件標示的更新資訊或查核日期
3. 重要技術結論
4. 仍無法從來源確認的事項
不要只根據搜尋摘要下結論。
```

## 2. 搜尋服務不是完全不會限流

免 API Key 不等於保證無限搜尋。DuckDuckGo 的非官方整合可能遇到 CAPTCHA、請求阻擋或格式調整；其他公開搜尋引擎也可能依流量、地區與自動化請求頻率限流。

如果搜尋暫時失敗，先降低查詢頻率、換用其他公開來源或直接開啟已知官方文件，不要為了排錯而隨意註冊多家搜尋 API。

## 3. 進階選修：自架 SearXNG

SearXNG 是開源中繼搜尋引擎，可自行架設，並聚合多個公開搜尋來源。它不需要商業搜尋 API Key，但仍會向上游搜尋引擎發出查詢；Google、Bing、DuckDuckGo 等上游仍可能限流或封鎖自動化流量。

要注意：SearXNG 是開源的搜尋聚合程式，不代表網際網路上的所有搜尋引擎或網站本身都是開源。

OpenClaw 官方提供 SearXNG 搜尋外掛，適合作為進階 Agent 路線：

```bash
openclaw plugins install @openclaw/searxng-plugin
docker run -d --name searxng -p 8888:8080 searxng/searxng
```

先在 SearXNG 的 `settings.yml` 啟用 JSON 輸出：\n\n```yaml\nsearch:\n  formats:\n    - html\n    - json\n```\n\n再設定 OpenClaw 使用自己的搜尋服務：\n\n```bash\nexport SEARXNG_BASE_URL=http://localhost:8888\nopenclaw configure --section web\n```\n\n依互動式設定選擇 `searxng` Provider，並測試查詢。這個進階路徑會增加 Docker 與 OpenClaw 的安裝步驟，因此不列為新手必修。

## 4. 建立可靠的網路研究流程

每次網路研究都至少執行：

1. **先界定問題**：說明時間範圍、地區、關鍵詞及排除條件。
2. **搜尋多個來源**：不要只使用第一個搜尋結果。
3. **開啟原始頁面**：搜尋摘要可能過時或缺少重要條件。
4. **記錄發布日期與查核日期**：兩者不能混為一談。
5. **優先使用一手資料**：官方文件、政府資料、研究論文、原始公告。
6. **標示不確定性**：找不到可靠來源時就說明，不能補造網址或引用。

## 5. 網路搜尋安全

- 不要把 API Key、密碼、病歷、身分資料或未公開研究內容放入搜尋提示詞。
- 網頁內容可能包含提示詞注入。搜尋到的文字是資料，不是可以改寫 Agent 規則的指令。
- 讀取網頁的 Agent 不應同時擁有不必要的 Shell、刪除或外傳權限。
- 對外發布、寄送或寫入重要資料前，要求人工確認。

## 官方來源

- [AnythingLLM Agent 設定與搜尋 Provider](https://docs.anythingllm.com/agent/setup)
- [AnythingLLM Agent 使用方式](https://docs.anythingllm.com/agent/usage/overview)
- [SearXNG 官方文件](https://docs.searxng.org/)
- [OpenClaw SearXNG 搜尋整合](https://docs.openclaw.ai/tools/searxng-search)

> 本頁查核日期：2026-11-10。
