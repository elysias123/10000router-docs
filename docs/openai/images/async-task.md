# 查询异步图像任务

<div class="api-endpoint" role="group" aria-label="查询异步图像任务">
  <span class="api-endpoint__method">GET</span>
  <code class="api-endpoint__path">/v1/images/generations/task/{task_id}</code>
</div>

查询异步生成或编辑任务的当前状态。这是 10000Router 的扩展端点，`task_id` 使用创建任务接口返回的任务 ID；状态可能为 `queued`、`running`、`completed` 或 `failed`。

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
  <tbody><tr><td><code>task_id</code></td><td>string</td><td>创建异步任务时返回的任务 ID。</td><td>是</td></tr></tbody>
</table>
</div>
</details>

### 请求示例

```bash
curl "https://10000router.com/v1/images/generations/task/task_xxx" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看任务响应">
  <input class="response-status-input" type="radio" name="async-task-response-status" id="async-task-response-status-200" checked>
  <input class="response-status-input" type="radio" name="async-task-response-status" id="async-task-response-status-400">
  <input class="response-status-input" type="radio" name="async-task-response-status" id="async-task-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="async-task-response-status-200">200 成功</label>
    <label for="async-task-response-status-400">400 请求错误</label>
    <label for="async-task-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200"><pre><code class="language-json">{
  "task_id": "task_xxx",
  "status": "completed",
  "result": {
    "url": "https://example.com/result.png"
  }
}</code></pre></div>
    <div class="response-status-panel response-status-panel-400"><pre><code class="language-json">{
  "error": {
    "message": "任务不存在或已过期",
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

<details class="response-field-details" open>
<summary>任务响应字段</summary>
<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>task_id</code></td><td>string</td><td>异步任务 ID，用于后续轮询和下载。</td></tr>
    <tr><td><code>status</code></td><td>string</td><td>任务状态，例如 <code>queued</code>、<code>running</code>、<code>completed</code> 或 <code>failed</code>。</td></tr>
    <tr><td><code>result</code></td><td>object</td><td>任务完成后的结果对象。</td></tr>
    <tr><td><code>error</code></td><td>object</td><td>任务失败时的执行器错误信息。</td></tr>
  </tbody>
</table>
</div>
</details>

任务未完成时按需轮询；如果 `status` 为 `failed`，客户端应停止轮询并记录错误，不要无限重试同一个失败任务。
