# 下载异步图像结果

<div class="api-endpoint" role="group" aria-label="下载异步图像结果">
  <span class="api-endpoint__method">GET</span>
  <code class="api-endpoint__path">/v1/images/generations/task/{task_id}/content</code>
</div>

下载已完成异步任务的图像二进制结果。这是 10000Router 的扩展端点；服务端可能通过 HTTP `302` 跳转到实际资源地址。

## 请求参数

### 请求头

<details class="parameter-details" open>
<summary>Authorization</summary>
<div class="parameter-details__content"><p>使用 Bearer Token 认证。格式：<code>Authorization: Bearer sk-xxxxxx</code></p></div>
</details>

### 路径参数

<details class="request-field-details" open>
<summary>路径参数（1 个）</summary>
<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody><tr><td><code>task_id</code></td><td>string</td><td>已完成异步任务的任务 ID。</td><td>是</td></tr></tbody>
</table>
</div>
</details>

### 请求示例

```bash
curl -L "https://10000router.com/v1/images/generations/task/task_xxx/content" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -o result.png
```

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看下载响应">
  <input class="response-status-input" type="radio" name="async-content-response-status" id="async-content-response-status-200" checked>
  <input class="response-status-input" type="radio" name="async-content-response-status" id="async-content-response-status-400">
  <input class="response-status-input" type="radio" name="async-content-response-status" id="async-content-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="async-content-response-status-200">200 成功</label>
    <label for="async-content-response-status-400">400 请求错误</label>
    <label for="async-content-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200"><p>返回图像二进制内容，具体 <code>Content-Type</code> 以任务结果为准。</p></div>
    <div class="response-status-panel response-status-panel-400"><pre><code class="language-json">{
  "error": {
    "message": "任务不存在或结果尚未准备好",
    "type": "invalid_request_error",
    "param": "task_id",
    "code": null
  }
}</code></pre></div>
    <div class="response-status-panel response-status-panel-429"><pre><code class="language-json">{
  "error": {
    "message": "Rate limit reached",
    "type": "rate_limit_exceeded",
    "param": null,
    "code": null
  }
}</code></pre></div>
  </div>
</div>
