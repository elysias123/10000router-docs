# 列出模型

原生OpenAI格式:
<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">GET</span>
  <code class="api-endpoint__path">/v1/models</code>
</div>

原生Gemini格式:
<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">GET</span>
  <code class="api-endpoint__path">/v1beta/models</code>
</div>

> 获取当前可用的模型列表
>
>根据请求头自动识别返回格式：
>* 包含 `x-api-key` 和 `anthropic-version` 头时返回 Anthropic 格式
>* 包含 `x-goog-api-key` 头或 `key` 查询参数时返回 Gemini 格式
>* 其他情况返回 OpenAI 格式

## 请求参数

### 请求头

<div class="parameter-details-group">

<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

<details class="parameter-details" open>
<summary>x-api-key [可选]</summary>

<div class="parameter-details__content">
<p>Anthropic API 密钥。与 <code>anthropic-version</code> 一起发送时，响应使用 Anthropic 格式。<br>
格式: <code>x-api-key: your_api_key</code></p>
</div>
</details>

<details class="parameter-details" open>
<summary>anthropic-version [可选]</summary>

<div class="parameter-details__content">
<p>Anthropic API 版本。与 <code>x-api-key</code> 一起发送以请求 Anthropic 格式响应。<br>
格式: <code>anthropic-version: 2023-06-01</code></p>
</div>
</details>

<details class="parameter-details" open>
<summary>x-goog-api-key [可选]</summary>

<div class="parameter-details__content">
<p>Google/Gemini API 密钥。发送此请求头时，响应使用 Gemini 格式。<br>
格式: <code>x-goog-api-key: your_api_key</code></p>
</div>
</details>

</div>

### 查询参数

<details class="parameter-details" open>
<summary>key [可选]</summary>

<div class="parameter-details__content">
<p>Google Cloud API 密钥<br>
格式: <code>key=your_api_key</code></p>
</div>
</details>
