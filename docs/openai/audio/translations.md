# 音频翻译

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/audio/translations</code>
</div>

使用 `multipart/form-data` 将音频翻译成英文文本。请求需要 `Authorization: Bearer <API_KEY>`；参数是否可用取决于所选模型和兼容网关。

## 请求参数

### 请求头

<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

### 表单字段

<details class="request-field-details" open>
<summary>必填参数（2 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>file</code></td><td>file</td><td>是</td><td>要翻译的音频文件。</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>是</td><td>翻译模型 ID，例如 <code>whisper-1</code>。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="request-field-details" open>
<summary>可选参数（3 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>prompt</code></td><td>string</td><td>—</td><td>可选的上下文提示，用于改善专有名词识别。</td></tr>
    <tr><td><code>response_format</code></td><td>string</td><td><code>json</code></td><td>可选 <code>json</code>、<code>text</code>、<code>srt</code>、<code>verbose_json</code> 或 <code>vtt</code>。</td></tr>
    <tr><td><code>temperature</code></td><td>number</td><td>0</td><td>采样温度，数值越高结果越随机。</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="translation-example-language" id="translation-example-curl" checked>
  <input class="request-example-input" type="radio" name="translation-example-language" id="translation-example-javascript">
  <input class="request-example-input" type="radio" name="translation-example-language" id="translation-example-python">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="translation-example-curl">cURL</label>
    <label for="translation-example-javascript">JavaScript</label>
    <label for="translation-example-python">Python</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/audio/translations" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "file=@audio.mp3" \
  -F "model=whisper-1" \
  -F "response_format=verbose_json"</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const form = new FormData();
form.append("file", new Blob([audioBytes]), "audio.mp3");
form.append("model", "whisper-1");
form.append("response_format", "verbose_json");
const response = await fetch("https://10000router.com/v1/audio/translations", {
  method: "POST",
  headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY },
  body: form
});
console.log(await response.json());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-python">
      <pre><code class="language-python">import os
import requests

with open("audio.mp3", "rb") as audio:
    response = requests.post(
        "https://10000router.com/v1/audio/translations",
        headers={"Authorization": "Bearer " + os.environ["OPENAI_API_KEY"]},
        files={"file": ("audio.mp3", audio, "audio/mpeg")},
        data={"model": "whisper-1", "response_format": "verbose_json"},
    )
print(response.json())</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="translation-response-status" id="translation-response-status-200" checked>
  <input class="response-status-input" type="radio" name="translation-response-status" id="translation-response-status-400">
  <input class="response-status-input" type="radio" name="translation-response-status" id="translation-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="translation-response-status-200">200 成功</label>
    <label for="translation-response-status-400">400 请求错误</label>
    <label for="translation-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  "text": "Hello, this is the translated text."
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  "error": {
    "message": "Missing required parameter: file",
    "type": "invalid_request_error",
    "param": "file",
    "code": null
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-429">
      <pre><code class="language-json">{
  "error": {
    "message": "Rate limit reached",
    "type": "rate_limit_exceeded",
    "param": null,
    "code": null
  }
}</code></pre>
    </div>
  </div>
</div>

### 返回字段参数

<details class="response-field-details" open>
<summary>标准 JSON 响应（1 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>text</code></td><td>string</td><td>翻译后的英文文本。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="response-field-details" open>
<summary><code>verbose_json</code> 响应</summary>

<div class="response-field-details__content">
<p>选择 <code>verbose_json</code> 时，响应可包含语言、时长和分段时间戳：</p>
<pre><code class="language-json">{
  "task": "translate",
  "language": "English",
  "duration": 2.4,
  "text": "Hello, this is the translated text.",
  "segments": [
    { "id": 0, "start": 0.0, "end": 2.4, "text": "Hello, this is the translated text." }
  ]
}</code></pre>
</div>
</details>
