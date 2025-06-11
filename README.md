# 簡易網頁爬蟲工具（純前端 + PHP）

本專案是一個簡潔的網頁爬蟲工具，採用 HTML、CSS、JavaScript 與 PHP 實作，無需框架、套件或編譯流程，適合入門爬蟲與 DOM 分析練習。

---

## 📌 功能特色

- 使用者可輸入任意網址與自訂 CSS 選擇器（例如：`td`、`.title`、`#main > div`）
- 自動擷取對應元素的文字內容，顯示於頁面上
- 支援常見 HTML 標籤與結構分析
- 可部署於任意支援 PHP 的主機（例如 XAMPP、Synology NAS、cPanel）

---

## 🧱 專案結構

```bash
 crawler-app/
 ├── index.html # 主畫面介面
 ├── style.css # 頁面樣式
 ├── script.js # 前端邏輯（含爬蟲與渲染）
 └── proxy.php # 後端 Proxy，代為抓取外部 HTML
```

---

## 🚀 使用方式

1. 將整個資料夾部署至支援 PHP 的伺服器
2. 進入 `index.html` 頁面
3. 在畫面中：
   - 輸入欲分析的目標網址（例如：https://example.com）
   - 輸入 CSS 選擇器（例如：`td`、`.post-title`、`#content > p`）
4. 點擊「開始爬蟲」，系統會自動擷取並顯示結果（最多 20 筆）

---

## ⚠️ 注意事項

- 此工具僅支援 **靜態網站** 或 **SSR（伺服器端渲染）網站**
- 無法擷取由 JavaScript 動態生成的內容（如 Vue / React SPA）
- 受到同源政策限制，PHP 需作為 proxy 代為請求目標網站
- 若目標網站啟用 Cloudflare / Bot 保護，可能無法成功抓取

---
