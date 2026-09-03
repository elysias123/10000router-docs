# 获取模型列表

## OpenAI 格式

<div class="api-endpoint" role="group" aria-label="OpenAI 模型列表 API endpoint">
  <span class="api-endpoint__method">GET</span>
  <code class="api-endpoint__path">/v1/models</code>
</div>

获取当前可用的模型列表。网关默认返回 OpenAI 格式；发送 Anthropic 或 Gemini 专用认证头时，会根据请求头切换响应格式。

## 请求参数

### 请求头

<div class="parameter-details-group">
<details class="parameter-details" open>
<summary>Authorization</summary>
<div class="parameter-details__content">
<p>使用 Bearer Token 认证。格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>
<details class="parameter-details" open>
<summary>x-api-key [可选]</summary>
<div class="parameter-details__content">
<p>Anthropic API 密钥；与 <code>anthropic-version</code> 一起发送时请求 Anthropic 格式。</p>
</div>
</details>
<details class="parameter-details" open>
<summary>anthropic-version [可选]</summary>
<div class="parameter-details__content">
<p>Anthropic API 版本，例如 <code>2023-06-01</code>。</p>
</div>
</details>
<details class="parameter-details" open>
<summary>x-goog-api-key [可选]</summary>
<div class="parameter-details__content">
<p>Google/Gemini API 密钥；发送此请求头时请求 Gemini 格式。</p>
</div>
</details>
</div>

## 返回响应

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看 OpenAI 模型列表响应">
  <input class="response-status-input" type="radio" name="models-openai-response-status" id="models-openai-response-status-200" checked>
  <input class="response-status-input" type="radio" name="models-openai-response-status" id="models-openai-response-status-401">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="models-openai-response-status-200">200 成功</label>
    <label for="models-openai-response-status-401">401 未授权</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  "object": "list",
  "data": [
    {
      "id": "gpt-5.6-sol",
      "object": "model",
      "owned_by": "10000router"
    }
  ]
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-401">
      <pre><code class="language-json">{
  "error": {
    "message": "Invalid authentication credentials",
    "type": "invalid_request_error",
    "param": null,
    "code": null
  }
}</code></pre>
    </div>
  </div>
</div>

<details class="response-field-details" open>
<summary>响应字段</summary>
<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>object</code></td><td>string</td><td>固定为 <code>list</code>。</td></tr>
    <tr><td><code>data</code></td><td>array</td><td>可用模型对象数组。</td></tr>
    <tr><td><code>data[].id</code></td><td>string</td><td>模型 ID。</td></tr>
    <tr><td><code>data[].object</code></td><td>string</td><td>通常为 <code>model</code>。</td></tr>
    <tr><td><code>data[].owned_by</code></td><td>string</td><td>模型所属提供方或网关标识。</td></tr>
  </tbody>
</table>
</div>
</details>

## Gemini 格式

<div class="api-endpoint" role="group" aria-label="Gemini 模型列表 API endpoint">
  <span class="api-endpoint__method">GET</span>
  <code class="api-endpoint__path">/v1beta/models</code>
</div>

以 Gemini API 格式返回可用模型列表。使用 `x-goog-api-key` 请求头或 `key` 查询参数进行认证，并按 Gemini 字段结构读取响应。

## 请求参数

### 请求头与查询参数

<div class="parameter-details-group">
<details class="parameter-details" open>
<summary>x-goog-api-key [可选]</summary>
<div class="parameter-details__content">
<p>Google/Gemini API 密钥。格式: <code>x-goog-api-key: your_api_key</code></p>
</div>
</details>
<details class="parameter-details" open>
<summary>key [可选]</summary>
<div class="parameter-details__content">
<p>Google Cloud API 密钥查询参数。格式: <code>key=your_api_key</code></p>
</div>
</details>
</div>

## 返回响应

```json
{
  "models": [
    {
      "name": "models/gemini-2.5-pro",
      "displayName": "Gemini 2.5 Pro",
      "supportedGenerationMethods": ["generateContent"]
    }
  ]
}
```

<details class="response-field-details" open>
<summary>响应字段</summary>
<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>models</code></td><td>array</td><td>Gemini 模型对象数组。</td></tr>
    <tr><td><code>models[].name</code></td><td>string</td><td>模型资源名称。</td></tr>
    <tr><td><code>models[].displayName</code></td><td>string</td><td>模型显示名称。</td></tr>
    <tr><td><code>models[].supportedGenerationMethods</code></td><td>array&lt;string&gt;</td><td>模型支持的调用动作。</td></tr>
  </tbody>
</table>
</div>
</details>
