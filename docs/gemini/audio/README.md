# 音频生成

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1beta/models/{model}:generateContent</code>
</div>

## 请求参数

### 请求头

<div class="parameter-details-group">
<details class="parameter-details" open>
<summary>Authorization</summary>
<div class="parameter-details__content"><p>使用 Bearer Token 认证。<br>格式: <code>Authorization: Bearer sk-xxxxxx</code></p></div>
</details>

<details class="parameter-details" open>
<summary>Content-Type</summary>
<div class="parameter-details__content"><p>请求体为 JSON 时请发送 <code>Content-Type: application/json</code>。</p></div>
</details>
</div>

### 请求体

<details class="request-field-details" open>
<summary>必填字段</summary>
<div class="request-field-details__content"><table><thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody>
<tr><td><code>contents</code></td><td>array</td><td>是</td><td>包含待合成文本的内容数组；文本放在 <code>contents[].parts[].text</code>。</td></tr>
<tr><td><code>generationConfig</code></td><td>object</td><td>是</td><td>必须包含 <code>responseModalities</code> 和 <code>speechConfig</code>。</td></tr>
</tbody></table></div>
</details>

<details class="request-field-details" open>
<summary><code>generationConfig</code> 字段</summary>
<div class="request-field-details__content"><table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody>
<tr><td><code>responseModalities</code></td><td>array&lt;string&gt;</td><td>输出模态，TTS 请求设置为 <code>["AUDIO"]</code>。</td></tr>
<tr><td><code>speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName</code></td><td>string</td><td>预置声音名称，必须是上游模型支持的声音。</td></tr>
</tbody></table></div>
</details>

### 请求体示例

<details class="request-field-details request-example-details" open><summary>查看 JSON 请求体示例</summary><div class="request-field-details__content"><pre><code class="language-json">{
  "contents": [{ "parts": [{ "text": "欢迎使用 10000Router。" }] }],
  "generationConfig": {
    "responseModalities": ["AUDIO"],
    "speechConfig": {
      "voiceConfig": { "prebuiltVoiceConfig": { "voiceName": "Kore" } }
    }
  }
}</code></pre></div></details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="gemini-audio-example-language" id="gemini-audio-example-curl" checked>
  <input class="request-example-input" type="radio" name="gemini-audio-example-language" id="gemini-audio-example-javascript">
  <input class="request-example-input" type="radio" name="gemini-audio-example-language" id="gemini-audio-example-go">
  <input class="request-example-input" type="radio" name="gemini-audio-example-language" id="gemini-audio-example-python">
  <input class="request-example-input" type="radio" name="gemini-audio-example-language" id="gemini-audio-example-java">
  <input class="request-example-input" type="radio" name="gemini-audio-example-language" id="gemini-audio-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言"><label for="gemini-audio-example-curl">cURL</label><label for="gemini-audio-example-javascript">JavaScript</label><label for="gemini-audio-example-go">Go</label><label for="gemini-audio-example-python">Python</label><label for="gemini-audio-example-java">Java</label><label for="gemini-audio-example-csharp">C#</label></div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl"><pre><code class="language-bash">curl -X POST "https://10000router.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent" \
  -H "Authorization: Bearer $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d @tts-request.json</code></pre></div>
    <div class="request-example-panel request-example-panel-javascript"><pre><code class="language-javascript">const payload = { contents: [{ parts: [{ text: "欢迎使用 10000Router。" }] }], generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } } };
const response = await fetch("https://10000router.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent", { method: "POST", headers: { Authorization: "Bearer " + process.env.GEMINI_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
console.log((await response.json()).candidates?.[0]?.content?.parts);</code></pre></div>
    <div class="request-example-panel request-example-panel-go"><pre><code class="language-go">payload := `{"contents":[{"parts":[{"text":"欢迎使用 10000Router。"}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Kore"}}}}}`
req, _ := http.NewRequest("POST", "https://10000router.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent", strings.NewReader(payload)); req.Header.Set("Authorization", "Bearer "+os.Getenv("GEMINI_API_KEY")); req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req); if err != nil { log.Fatal(err) }; defer res.Body.Close()</code></pre></div>
    <div class="request-example-panel request-example-panel-python"><pre><code class="language-python">import os, requests
payload = {"contents": [{"parts": [{"text": "欢迎使用 10000Router。"}]}], "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": "Kore"}}}}}
response = requests.post("https://10000router.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent", headers={"Authorization": "Bearer " + os.environ["GEMINI_API_KEY"], "Content-Type": "application/json"}, json=payload)
print(response.json())</code></pre></div>
    <div class="request-example-panel request-example-panel-java"><pre><code class="language-java">var payload = "{\"contents\":[{\"parts\":[{\"text\":\"欢迎使用 10000Router。\"}]}],\"generationConfig\":{\"responseModalities\":[\"AUDIO\"],\"speechConfig\":{\"voiceConfig\":{\"prebuiltVoiceConfig\":{\"voiceName\":\"Kore\"}}}}}";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent")).header("Authorization", "Bearer " + System.getenv("GEMINI_API_KEY")).header("Content-Type", "application/json").POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload)).build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre></div>
    <div class="request-example-panel request-example-panel-csharp"><pre><code class="language-csharp">using System.Net.Http.Json;
using var client = new HttpClient(); client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("GEMINI_API_KEY"));
var payload = new { contents = new[] { new { parts = new[] { new { text = "欢迎使用 10000Router。" } } } }, generationConfig = new { responseModalities = new[] { "AUDIO" }, speechConfig = new { voiceConfig = new { prebuiltVoiceConfig = new { voiceName = "Kore" } } } } };
var response = await client.PostAsJsonAsync("https://10000router.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent", payload);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre></div>
  </div>
</div>

## 返回响应

### 响应示例

```json
{
  "candidates": [{
    "content": {
      "role": "model",
      "parts": [{ "inlineData": { "mimeType": "audio/wav", "data": "<BASE64_AUDIO>" } }]
    },
    "finishReason": "STOP",
    "safetyRatings": []
  }],
  "usageMetadata": { "promptTokenCount": 10, "candidatesTokenCount": 0, "totalTokenCount": 10 }
}
```

读取 `candidates[0].content.parts[].inlineData.data`，Base64 解码后按 `mimeType` 保存为音频文件。音频编码和采样率由模型决定，请以返回的 MIME 类型为准。`usageMetadata` 可能因上游渠道而省略部分字段。

<details class="response-field-details" open>
<summary>响应字段</summary>
<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>candidates</code></td><td>array</td><td>模型生成的候选音频结果。</td></tr>
    <tr><td><code>candidates[].content.parts[].inlineData.mimeType</code></td><td>string</td><td>音频 MIME 类型，例如 <code>audio/wav</code>。</td></tr>
    <tr><td><code>candidates[].content.parts[].inlineData.data</code></td><td>string</td><td>音频的 Base64 数据，解码后保存为文件。</td></tr>
    <tr><td><code>candidates[].finishReason</code></td><td>string</td><td>生成结束原因，例如 <code>STOP</code>。</td></tr>
    <tr><td><code>usageMetadata</code></td><td>object</td><td>输入、输出及总 token 统计，字段可能因渠道而省略。</td></tr>
  </tbody>
</table>
</div>
</details>

### 错误响应

模型不支持 TTS、声音名称无效或请求缺少必填配置时返回 `400`；渠道限流时返回 `429`。错误对象通常包含 `error.message`、`error.status` 和 `error.code`。
