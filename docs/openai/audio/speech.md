# 文字转语音

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/audio/speech</code>
</div>

将文本转换为音频

## 请求参数

### 请求头

<div class="parameter-details-group">
<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

<details class="parameter-details" open>
<summary>Content-Type</summary>
<div class="parameter-details__content"><p>请求体必须使用 <code>Content-Type: application/json</code>。</p></div>
</details>
</div>

### 请求体

<details class="request-field-details" open>
<summary>请求体参数（5 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>—</td><td>TTS 模型 ID，例如 <code>tts-1</code>。</td><td>是</td></tr>
    <tr><td><code>input</code></td><td>string</td><td>—</td><td>要合成的文本，最大长度为 4096 个字符。</td><td>是</td></tr>
    <tr><td><code>voice</code></td><td>string</td><td>—</td><td>声音 ID：<code>alloy</code>、<code>echo</code>、<code>fable</code>、<code>onyx</code>、<code>nova</code> 或 <code>shimmer</code>。</td><td>是</td></tr>
    <tr><td><code>response_format</code></td><td>string</td><td><code>mp3</code></td><td>音频格式：<code>mp3</code>、<code>opus</code>、<code>aac</code>、<code>flac</code>、<code>wav</code> 或 <code>pcm</code>。</td><td>否</td></tr>
    <tr><td><code>speed</code></td><td>number</td><td>1</td><td>播放速度，范围 <code>0.25</code> 到 <code>4</code>。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  "model": "tts-1",
  "input": "你好，这是一个语音示例。",
  "voice": "alloy",
  "response_format": "mp3",
  "speed": 1
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="speech-example-language" id="speech-example-curl" checked>
  <input class="request-example-input" type="radio" name="speech-example-language" id="speech-example-javascript">
  <input class="request-example-input" type="radio" name="speech-example-language" id="speech-example-go">
  <input class="request-example-input" type="radio" name="speech-example-language" id="speech-example-python">
  <input class="request-example-input" type="radio" name="speech-example-language" id="speech-example-java">
  <input class="request-example-input" type="radio" name="speech-example-language" id="speech-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="speech-example-curl">cURL</label>
    <label for="speech-example-javascript">JavaScript</label>
    <label for="speech-example-go">Go</label>
    <label for="speech-example-python">Python</label>
    <label for="speech-example-java">Java</label>
    <label for="speech-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/audio/speech" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"tts-1","input":"你好，这是一个语音示例。","voice":"alloy","response_format":"mp3","speed":1}' \
  --output speech.mp3</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const response = await fetch("https://10000router.com/v1/audio/speech", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ model: "tts-1", input: "你好，这是一个语音示例。", voice: "alloy", response_format: "mp3", speed: 1 })
});
const audioBytes = await response.arrayBuffer();</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-python">
      <pre><code class="language-python">import os
import requests

response = requests.post(
    "https://10000router.com/v1/audio/speech",
    headers={
        "Authorization": "Bearer " + os.environ["OPENAI_API_KEY"],
        "Content-Type": "application/json",
    },
    json={"model": "tts-1", "input": "你好，这是一个语音示例。", "voice": "alloy", "response_format": "mp3", "speed": 1},
)
response.raise_for_status()
with open("speech.mp3", "wb") as audio:
    audio.write(response.content)</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-go">
      <pre><code class="language-go">payload := `{"model":"tts-1","input":"你好，这是一个语音示例。","voice":"alloy","response_format":"mp3","speed":1}`
req, _ := http.NewRequest("POST", "https://10000router.com/v1/audio/speech", strings.NewReader(payload))
req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req)
if err != nil { log.Fatal(err) }
defer res.Body.Close()</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-java">
      <pre><code class="language-java">var payload = "{\"model\":\"tts-1\",\"input\":\"你好，这是一个语音示例。\",\"voice\":\"alloy\",\"response_format\":\"mp3\",\"speed\":1}";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1/audio/speech"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload)).build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofByteArray());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-csharp">
      <pre><code class="language-csharp">using System.Net.Http.Json;
using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
var payload = new { model = "tts-1", input = "你好，这是一个语音示例。", voice = "alloy", response_format = "mp3", speed = 1 };
var response = await client.PostAsJsonAsync("https://10000router.com/v1/audio/speech", payload);
await File.WriteAllBytesAsync("speech.mp3", await response.Content.ReadAsByteArrayAsync());</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="speech-response-status" id="speech-response-status-200" checked>
  <input class="response-status-input" type="radio" name="speech-response-status" id="speech-response-status-400">
  <input class="response-status-input" type="radio" name="speech-response-status" id="speech-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="speech-response-status-200">200 成功</label>
    <label for="speech-response-status-400">400 请求错误</label>
    <label for="speech-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <p>响应体是所选格式的二进制音频数据，不是 JSON。常见映射包括 <code>mp3 → audio/mpeg</code>、<code>wav → audio/wav</code>、<code>flac → audio/flac</code> 和 <code>pcm → audio/pcm</code>；<code>opus</code>、<code>aac</code> 的 Content-Type 可能因渠道而异，应以实际响应头为准。客户端应将响应体保存为对应扩展名的音频文件。</p>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  "error": {
    "message": "Missing required parameter: input",
    "type": "invalid_request_error",
    "param": "input",
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
<summary>成功响应</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>内容</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td>响应体</td><td>binary</td><td>所选 <code>response_format</code> 对应的音频字节；响应头中的 <code>Content-Type</code> 以网关实际返回为准。</td></tr>
  </tbody>
</table>
</div>
</details>
