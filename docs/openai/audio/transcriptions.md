# 语音转文字

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/audio/transcriptions</code>
</div>

将音频转换为文本

## 请求参数

### 请求头

<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

<p>请求体必须使用 <code>multipart/form-data</code>；使用 <code>curl -F</code> 或 SDK 时让客户端自动生成 boundary。</p>

### 表单字段

<details class="request-field-details" open>
<summary>表单字段（7 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>file</code></td><td>file</td><td>—</td><td>要转录的音频文件。</td><td>是</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>—</td><td>转录模型 ID，例如 <code>whisper-1</code>。</td><td>是</td></tr>
    <tr><td><code>language</code></td><td>string</td><td>未声明</td><td>ISO-639-1 语言代码，例如 <code>zh</code> 或 <code>en</code>；省略时通常由上游自动检测。</td><td>否</td></tr>
    <tr><td><code>prompt</code></td><td>string</td><td>—</td><td>提示词，可用于改善专有名词和上下文识别。</td><td>否</td></tr>
    <tr><td><code>response_format</code></td><td>string</td><td><code>json</code></td><td>可选 <code>json</code>、<code>text</code>、<code>srt</code>、<code>verbose_json</code> 或 <code>vtt</code>。</td><td>否</td></tr>
    <tr><td><code>temperature</code></td><td>number</td><td>未声明</td><td>采样温度，数值越高结果越随机；<code>0</code> 是常用示例值。</td><td>否</td></tr>
    <tr><td><code>timestamp_granularities</code></td><td>array&lt;string&gt;</td><td>—</td><td>时间戳粒度，可选 <code>word</code> 或 <code>segment</code>；通常与 <code>verbose_json</code> 一起使用。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="transcription-example-language" id="transcription-example-curl" checked>
  <input class="request-example-input" type="radio" name="transcription-example-language" id="transcription-example-javascript">
  <input class="request-example-input" type="radio" name="transcription-example-language" id="transcription-example-go">
  <input class="request-example-input" type="radio" name="transcription-example-language" id="transcription-example-python">
  <input class="request-example-input" type="radio" name="transcription-example-language" id="transcription-example-java">
  <input class="request-example-input" type="radio" name="transcription-example-language" id="transcription-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="transcription-example-curl">cURL</label>
    <label for="transcription-example-javascript">JavaScript</label>
    <label for="transcription-example-go">Go</label>
    <label for="transcription-example-python">Python</label>
    <label for="transcription-example-java">Java</label>
    <label for="transcription-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/audio/transcriptions" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "file=@audio.mp3" \
  -F "model=whisper-1" \
  -F "language=zh" \
  -F "response_format=verbose_json" \
  -F 'timestamp_granularities[]=segment'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const form = new FormData();
form.append("file", new Blob([audioBytes]), "audio.mp3");
form.append("model", "whisper-1");
form.append("language", "zh");
form.append("response_format", "verbose_json");
form.append("timestamp_granularities[]", "segment");
const response = await fetch("https://10000router.com/v1/audio/transcriptions", {
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
        "https://10000router.com/v1/audio/transcriptions",
        headers={"Authorization": "Bearer " + os.environ["OPENAI_API_KEY"]},
        files={"file": ("audio.mp3", audio, "audio/mpeg")},
        data={
            "model": "whisper-1",
            "language": "zh",
            "response_format": "verbose_json",
            "timestamp_granularities[]": "segment",
        },
    )
print(response.json())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-go">
      <pre><code class="language-go">file, _ := os.Open("audio.mp3")
defer file.Close()
body := &bytes.Buffer{}
writer := multipart.NewWriter(body)
part, _ := writer.CreateFormFile("file", "audio.mp3")
io.Copy(part, file)
writer.WriteField("model", "whisper-1")
writer.WriteField("language", "zh")
writer.Close()
req, _ := http.NewRequest("POST", "https://10000router.com/v1/audio/transcriptions", body)
req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
req.Header.Set("Content-Type", writer.FormDataContentType())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-java">
      <pre><code class="language-java">var boundary = "----10000routerBoundary";
var body = new java.io.ByteArrayOutputStream();
var utf8 = java.nio.charset.StandardCharsets.UTF_8;
java.util.function.BiConsumer&lt;String, String&gt; addField = (name, value) -&gt; body.writeBytes(
    ("--" + boundary + "\r\n"
        + "Content-Disposition: form-data; name=\"" + name + "\"\r\n\r\n"
        + value + "\r\n").getBytes(utf8));
addField.accept("model", "whisper-1");
addField.accept("language", "zh");
addField.accept("response_format", "verbose_json");
addField.accept("timestamp_granularities[]", "segment");
body.writeBytes(("--" + boundary + "\r\n"
    + "Content-Disposition: form-data; name=\"file\"; filename=\"audio.mp3\"\r\n"
    + "Content-Type: audio/mpeg\r\n\r\n").getBytes(utf8));
body.writeBytes(java.nio.file.Files.readAllBytes(java.nio.file.Path.of("audio.mp3")));
body.writeBytes(("\r\n--" + boundary + "--\r\n").getBytes(utf8));
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1/audio/transcriptions"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "multipart/form-data; boundary=" + boundary)
    .POST(java.net.http.HttpRequest.BodyPublishers.ofByteArray(body.toByteArray()))
    .build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-csharp">
      <pre><code class="language-csharp">using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
using var form = new MultipartFormDataContent();
form.Add(new StreamContent(File.OpenRead("audio.mp3")), "file", "audio.mp3");
form.Add(new StringContent("whisper-1"), "model");
form.Add(new StringContent("zh"), "language");
var response = await client.PostAsync("https://10000router.com/v1/audio/transcriptions", form);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="transcription-response-status" id="transcription-response-status-200" checked>
  <input class="response-status-input" type="radio" name="transcription-response-status" id="transcription-response-status-400">
  <input class="response-status-input" type="radio" name="transcription-response-status" id="transcription-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="transcription-response-status-200">200 成功</label>
    <label for="transcription-response-status-400">400 请求错误</label>
    <label for="transcription-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  "text": "你好，这是语音转文字的结果。"
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
<p>以下结构适用于 <code>response_format=json</code>。</p>
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>text</code></td><td>string</td><td>转录后的文本。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="response-field-details" open>
<summary><code>verbose_json</code> 响应</summary>

<div class="response-field-details__content">
<p>选择 <code>verbose_json</code> 时，NewAPI 会透传上游返回的任务、语言、时长和分段时间戳；具体字段由模型决定：</p>
<pre><code class="language-json">{
  "task": "transcribe",
  "language": "Chinese",
  "duration": 2.4,
  "text": "你好，这是语音转文字的结果。",
  "segments": [
    {
      "id": 0,
      "seek": 0,
      "start": 0.0,
      "end": 2.4,
      "text": "你好，这是语音转文字的结果。",
      "tokens": [ 1234, 5678 ],
      "temperature": 0.0,
      "avg_logprob": -0.12,
      "compression_ratio": 1.1,
      "no_speech_prob": 0.01
    }
  ]
}</code></pre>
<p><code>segments</code> 中的 <code>seek</code>、<code>tokens</code>、<code>temperature</code>、<code>avg_logprob</code>、<code>compression_ratio</code> 和 <code>no_speech_prob</code> 由上游转录模型决定，可能省略。</p>
</div>
</details>

<details class="response-field-details" open>
<summary>其他响应格式</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th><code>response_format</code></th><th>响应体</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>text</code></td><td>纯文本</td><td>仅返回转录文本。</td></tr>
    <tr><td><code>srt</code></td><td>字幕文本</td><td>返回 SubRip 字幕格式。</td></tr>
    <tr><td><code>vtt</code></td><td>字幕文本</td><td>返回 WebVTT 字幕格式。</td></tr>
  </tbody>
</table>
<p>非 <code>json</code> 格式的具体 <code>Content-Type</code> 由上游模型和渠道决定。</p>
</div>
</details>
