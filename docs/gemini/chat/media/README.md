# Gemini 分析媒体

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1beta/models/{model}:generateContent</code>
</div>

Gemini 图像、PDF、音频和视频识别请求。

>⚠️ 注意：原生 Gemini 格式请求支持通过 `inlineData`（Base64）或 `fileData.fileUri`（可公开访问的 URL，支持 YouTube 链接）传递媒体。通过 Gemini File API 上传的文件 URI 能否访问，取决于上游渠道 Key 的权限，建议优先使用可公开访问的 URL。OpenAI 格式（`chat/completions`）请求转换为 Gemini 时，媒体将统一下载并转换为 `inlineData`（Base64）传递。

## 请求参数

### 路径参数

<details class="request-field-details" open>
<summary>模型路径参数</summary>
<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody><tr><td><code>model</code></td><td>string</td><td>模型名称，位于 <code>/v1beta/models/{model}</code> 路径中。</td><td>是</td></tr></tbody>
</table>
</div>
</details>

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
<summary><code>contents[].parts[]</code> 字段</summary>
<div class="request-field-details__content">
<table><thead><tr><th>字段</th><th>类型</th><th>说明</th><th>是否必填</th></tr></thead><tbody>
<tr><td><code>contents[].role</code></td><td>string</td><td><code>user</code> 或 <code>model</code>。</td><td>否</td></tr>
<tr><td><code>contents[].parts[].text</code></td><td>string</td><td>对媒体的提问或补充文本。</td><td>条件</td></tr>
<tr><td><code>contents[].parts[].inlineData.mimeType</code></td><td>string</td><td>媒体 MIME 类型，例如 <code>image/jpeg</code>、<code>application/pdf</code> 或 <code>audio/mpeg</code>。</td><td>条件</td></tr>
<tr><td><code>contents[].parts[].inlineData.data</code></td><td>string</td><td>不含 <code>data:</code> 前缀的 Base64 数据。</td><td>条件</td></tr>
<tr><td><code>contents[].parts[].fileData.fileUri</code></td><td>string</td><td>公开可访问的媒体 URL，或上游允许访问的 Gemini File API URI。</td><td>条件</td></tr>
<tr><td><code>contents[].parts[].fileData.mimeType</code></td><td>string</td><td>使用 <code>fileData</code> 时可提供媒体 MIME 类型。</td><td>否</td></tr>
</tbody></table>
</div>
</details>

### 其他请求字段

`generationConfig` 支持 `temperature`、`topP`、`topK`、`maxOutputTokens` 和 `stopSequences`；`safetySettings`、`tools`、`systemInstruction` 的含义与[文本聊天](../text/README.md)相同。

### 请求体示例

<details class="request-field-details request-example-details" open>
<summary>Base64 图片识别</summary>
<div class="request-field-details__content"><pre><code class="language-json">{
  "contents": [{
    "role": "user",
    "parts": [
      { "text": "这张图片中有什么？" },
      { "inlineData": { "mimeType": "image/jpeg", "data": "<BASE64_DATA>" } }
    ]
  }],
  "generationConfig": { "maxOutputTokens": 256 }
}</code></pre></div>
</details>

<details class="request-field-details request-example-details" open>
<summary>公开 URL 示例</summary>
<div class="request-field-details__content">
<p>将 <code>inlineData</code> 替换为 <code>fileData</code>：</p>
<pre><code class="language-json">{
  "contents": [{
    "role": "user",
    "parts": [
      { "text": "总结这份 PDF。" },
      { "fileData": { "mimeType": "application/pdf", "fileUri": "https://example.com/report.pdf" } }
    ]
  }]
}
</code></pre>
</div>
</details>

### 请求示例代码

以下示例读取本地图片并编码后发送。生产环境请限制文件大小，并校验 MIME 类型。

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="gemini-media-example-language" id="gemini-media-example-curl" checked>
  <input class="request-example-input" type="radio" name="gemini-media-example-language" id="gemini-media-example-javascript">
  <input class="request-example-input" type="radio" name="gemini-media-example-language" id="gemini-media-example-go">
  <input class="request-example-input" type="radio" name="gemini-media-example-language" id="gemini-media-example-python">
  <input class="request-example-input" type="radio" name="gemini-media-example-language" id="gemini-media-example-java">
  <input class="request-example-input" type="radio" name="gemini-media-example-language" id="gemini-media-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言"><label for="gemini-media-example-curl">cURL</label><label for="gemini-media-example-javascript">JavaScript</label><label for="gemini-media-example-go">Go</label><label for="gemini-media-example-python">Python</label><label for="gemini-media-example-java">Java</label><label for="gemini-media-example-csharp">C#</label></div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl"><pre><code class="language-bash">curl -X POST "https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent" \
  -H "Authorization: Bearer $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d @request.json</code></pre></div>
    <div class="request-example-panel request-example-panel-javascript"><pre><code class="language-javascript">import { readFile } from "node:fs/promises";
const data = (await readFile("photo.jpg")).toString("base64");
const payload = {
  contents: [{
    role: "user",
    parts: [{ text: "描述图片" }, { inlineData: { mimeType: "image/jpeg", data } }]
  }]
};
const response = await fetch("https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent", {
  method: "POST",
  headers: { Authorization: "Bearer " + process.env.GEMINI_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
console.log(await response.json());</code></pre></div>
    <div class="request-example-panel request-example-panel-go"><pre><code class="language-go">data, err := os.ReadFile("photo.jpg")
if err != nil { log.Fatal(err) }
payload := fmt.Sprintf(`{"contents":[{"role":"user","parts":[{"text":"描述图片"},{"inlineData":{"mimeType":"image/jpeg","data":"%s"}}]}]}`, base64.StdEncoding.EncodeToString(data))
req, _ := http.NewRequest("POST", "https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent", strings.NewReader(payload))
req.Header.Set("Authorization", "Bearer "+os.Getenv("GEMINI_API_KEY"))
req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req)
if err != nil { log.Fatal(err) }
defer res.Body.Close()</code></pre></div>
    <div class="request-example-panel request-example-panel-python"><pre><code class="language-python">import base64
import os
import requests

with open("photo.jpg", "rb") as image:
    data = base64.b64encode(image.read()).decode()
payload = {
    "contents": [{"role": "user", "parts": [{"text": "描述图片"}, {"inlineData": {"mimeType": "image/jpeg", "data": data}}]}],
}
response = requests.post(
    "https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent",
    headers={"Authorization": "Bearer " + os.environ["GEMINI_API_KEY"], "Content-Type": "application/json"},
    json=payload,
)
print(response.json())</code></pre></div>
    <div class="request-example-panel request-example-panel-java"><pre><code class="language-java">var bytes = java.nio.file.Files.readAllBytes(java.nio.file.Path.of("photo.jpg"));
var data = java.util.Base64.getEncoder().encodeToString(bytes);
var payload = "{\"contents\":[{\"role\":\"user\",\"parts\":[{\"text\":\"描述图片\"},{\"inlineData\":{\"mimeType\":\"image/jpeg\",\"data\":\"" + data + "\"}}]}]}";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent"))
    .header("Authorization", "Bearer " + System.getenv("GEMINI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload))
    .build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre></div>
    <div class="request-example-panel request-example-panel-csharp"><pre><code class="language-csharp">using System.Net.Http.Json;
using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("GEMINI_API_KEY"));
var data = Convert.ToBase64String(await File.ReadAllBytesAsync("photo.jpg"));
var payload = new {
    contents = new[] {
        new {
            role = "user",
            parts = new object[] { new { text = "描述图片" }, new { inlineData = new { mimeType = "image/jpeg", data } } }
        }
    }
};
var response = await client.PostAsJsonAsync("https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent", payload);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre></div>
  </div>
</div>

## 返回响应

响应结构与文本聊天相同，媒体生成或识别结果位于 `candidates[].content.parts[]`。文本结果读取 `text`；图像或音频结果读取 `inlineData`。

```json
{
  "candidates": [{
    "content": {
      "role": "model",
      "parts": [{ "text": "图片中有一只猫。" }]
    },
    "finishReason": "STOP",
    "safetyRatings": []
  }],
  "usageMetadata": { "promptTokenCount": 280, "candidatesTokenCount": 12, "totalTokenCount": 292 }
}
```

<details class="response-field-details" open>
<summary>响应字段</summary>
<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>candidates</code></td><td>array</td><td>模型生成的候选结果。</td></tr>
    <tr><td><code>candidates[].content.parts[].text</code></td><td>string</td><td>媒体识别或问答的文本结果。</td></tr>
    <tr><td><code>candidates[].content.parts[].inlineData</code></td><td>object</td><td>模型返回的图片或音频数据（如果请求了对应模态）。</td></tr>
    <tr><td><code>candidates[].finishReason</code></td><td>string</td><td>生成结束原因，例如 <code>STOP</code> 或 <code>SAFETY</code>。</td></tr>
    <tr><td><code>candidates[].safetyRatings</code></td><td>array</td><td>安全分类和概率评估。</td></tr>
    <tr><td><code>usageMetadata</code></td><td>object</td><td>输入、输出及总 token 统计。</td></tr>
  </tbody>
</table>
</div>
</details>

OpenAI 格式请求（`/v1/chat/completions`）转换为 Gemini 时，网关会下载媒体并转换为 `inlineData`（Base64）后传递；请确保媒体 URL 对网关可访问。
