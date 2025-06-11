// 監聽「爬蟲按鈕」的點擊事件
document.getElementById("crawlBtn").addEventListener("click", () => {
  // 取得使用者輸入的網址與標籤選擇器
  const url = document.getElementById("urlInput").value;
  const customTag = document.getElementById("customTag").value.trim();
  const resultArea = document.getElementById("resultArea");

  // 顯示爬蟲進行中的訊息
  resultArea.innerHTML = "爬蟲進行中...";

  // 檢查是否有輸入必要的資料
  if (!url || !customTag) {
    resultArea.innerHTML = `<p style="color:red;">請輸入網址與標籤選擇器。</p>`;
    return;
  }

  // 使用 fetch API 向伺服器請求代理爬取的網頁內容
  fetch(`proxy.php?url=${encodeURIComponent(url)}`)
    .then((response) => {
      // 檢查回應是否成功
      if (!response.ok) throw new Error("取得網頁失敗");
      return response.text();
    })
    .then((html) => {
      // 將取得的 HTML 內容解析為 DOM
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      let resultHTML = "";

      try {
        // 使用 querySelectorAll 根據使用者提供的選擇器抓取元素
        const nodes = [...doc.querySelectorAll(customTag)];
        if (nodes.length > 0) {
          // 如果有符合的元素，顯示結果
          resultHTML += `<h2>符合「<code>${customTag}</code>」的結果（共 ${nodes.length} 項）：</h2>`;
          resultHTML += `<ul>${nodes
            .slice(0, 20) // 限制最多顯示 20 項
            .map((el) => `<li>${el.textContent.trim()}</li>`) // 顯示元素的文字內容
            .join("")}</ul>`;
        } else {
          // 如果找不到符合的元素，顯示警告訊息
          resultHTML += `<p style="color: orange;">找不到符合「${customTag}」的元素。</p>`;
        }
      } catch (e) {
        // 如果選擇器語法錯誤，顯示錯誤訊息
        resultHTML += `<p style="color: red;">選擇器語法錯誤：${e.message}</p>`;
      }

      // 顯示結果到頁面
      resultArea.innerHTML = resultHTML;
    })
    .catch((err) => {
      // 如果發生其他錯誤，顯示錯誤訊息
      resultArea.innerHTML = `<p style="color: red;">錯誤：${err.message}</p>`;
    });
});
