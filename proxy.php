<?php
// 設定允許跨域
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');

// 確保有傳入 URL
if (!isset($_GET['url'])) {
  http_response_code(400);
  echo "請提供網址參數。";
  exit;
}

$url = $_GET['url'];

// 檢查是不是合法 URL
if (!filter_var($url, FILTER_VALIDATE_URL)) {
  http_response_code(400);
  echo "網址格式不正確。";
  exit;
}

// 嘗試抓取該網站內容
$opts = [
  "http" => [
    "method" => "GET",
    "header" => "User-Agent: CrawlerApp/1.0\r\n"
  ]
];

$context = stream_context_create($opts);
$html = @file_get_contents($url, false, $context);

if ($html === FALSE) {
  http_response_code(500);
  echo "無法取得網站內容。";
  exit;
}

echo $html;
