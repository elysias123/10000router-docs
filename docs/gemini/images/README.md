# Gemini 图像

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1beta/models/{model}:generateContent/</code>
</div>

Gemini 图片生成。

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
<summary>x-goog-api-key</summary>
<div class="parameter-details__content"><p>使用 Gemini API Key 认证。格式: <code>x-goog-api-key: sk-xxxxxx</code></p></div>
</details>
<details class="parameter-details" open>
<summary>Content-Type</summary>
<div class="parameter-details__content"><p>请求体使用 <code>Content-Type: application/json</code>。</p></div>
</details>
</div>

### 原生 Gemini 格式

请求体至少包含 `contents` 和 `generationConfig`。`contents[].parts[].text` 描述要生成的图片，`generationConfig.responseModalities` 必须包含 `IMAGE`。

<details class="request-field-details" open>
<summary>请求体字段</summary>
<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>contents</code></td><td>array</td><td>包含图片生成提示词的内容数组。</td><td>是</td></tr>
    <tr><td><code>contents[].parts[].text</code></td><td>string</td><td>描述要生成图片的文本提示词。</td><td>条件</td></tr>
    <tr><td><code>generationConfig</code></td><td>object</td><td>生成配置，必须包含 <code>responseModalities</code> 和 <code>imageConfig</code>。</td><td>是</td></tr>
    <tr><td><code>generationConfig.responseModalities</code></td><td>array&lt;string&gt;</td><td>输出模态；图像生成请求必须包含 <code>IMAGE</code>。</td><td>是</td></tr>
    <tr><td><code>generationConfig.imageConfig.aspectRatio</code></td><td>string</td><td>图像宽高比，例如 <code>16:9</code>；可用值由模型决定。</td><td>是</td></tr>
    <tr><td><code>generationConfig.imageConfig.imageSize</code></td><td>string</td><td>图像尺寸，例如 <code>2K</code>；可用值由模型决定。</td><td>是</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>
<div class="request-field-details__content">
<pre><code class="language-json">
{
  "contents": [{
    "role": "user",
    "parts": [{ "text": "生成一张日落海边的插画" }]
  }],
  "generationConfig": {
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "16:9",
      "imageSize": "2K"
    }
  }
}
</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="gemini-image-example-language" id="gemini-image-example-curl" checked>
  <input class="request-example-input" type="radio" name="gemini-image-example-language" id="gemini-image-example-javascript">
  <input class="request-example-input" type="radio" name="gemini-image-example-language" id="gemini-image-example-go">
  <input class="request-example-input" type="radio" name="gemini-image-example-language" id="gemini-image-example-python">
  <input class="request-example-input" type="radio" name="gemini-image-example-language" id="gemini-image-example-java">
  <input class="request-example-input" type="radio" name="gemini-image-example-language" id="gemini-image-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言"><label for="gemini-image-example-curl">cURL</label><label for="gemini-image-example-javascript">JavaScript</label><label for="gemini-image-example-go">Go</label><label for="gemini-image-example-python">Python</label><label for="gemini-image-example-java">Java</label><label for="gemini-image-example-csharp">C#</label></div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl"><pre><code class="language-bash">curl -X POST "https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent/" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d @image-request.json</code></pre></div>
    <div class="request-example-panel request-example-panel-javascript"><pre><code class="language-javascript">const payload = {
  contents: [{ role: "user", parts: [{ text: "生成一张日落海边的插画" }] }],
  generationConfig: {
    responseModalities: ["IMAGE"],
    imageConfig: { aspectRatio: "16:9", imageSize: "2K" }
  }
};
const response = await fetch("https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent/", {
  method: "POST",
  headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
console.log(await response.json());</code></pre></div>
    <div class="request-example-panel request-example-panel-go"><pre><code class="language-go">payload := `{
  "contents": [{"role": "user", "parts": [{"text": "生成一张日落海边的插画"}]}],
  "generationConfig": {
    "responseModalities": ["IMAGE"],
    "imageConfig": {"aspectRatio": "16:9", "imageSize": "2K"}
  }
}`
req, _ := http.NewRequest("POST", "https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent/", strings.NewReader(payload))
req.Header.Set("x-goog-api-key", os.Getenv("GEMINI_API_KEY"))
req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req)
if err != nil { log.Fatal(err) }
defer res.Body.Close()</code></pre></div>
    <div class="request-example-panel request-example-panel-python"><pre><code class="language-python">import os
import requests

payload = {
    "contents": [{"role": "user", "parts": [{"text": "生成一张日落海边的插画"}]}],
    "generationConfig": {
        "responseModalities": ["IMAGE"],
        "imageConfig": {"aspectRatio": "16:9", "imageSize": "2K"},
    },
}
response = requests.post(
    "https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent/",
    headers={"x-goog-api-key": os.environ["GEMINI_API_KEY"], "Content-Type": "application/json"},
    json=payload,
)
print(response.json())</code></pre></div>
    <div class="request-example-panel request-example-panel-java"><pre><code class="language-java">var payload = "{\"contents\":[{\"role\":\"user\",\"parts\":[{\"text\":\"生成一张日落海边的插画\"}]}],"
    + "\"generationConfig\":{\"responseModalities\":[\"IMAGE\"],"
    + "\"imageConfig\":{\"aspectRatio\":\"16:9\",\"imageSize\":\"2K\"}}}";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent/"))
    .header("x-goog-api-key", System.getenv("GEMINI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload))
    .build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre></div>
    <div class="request-example-panel request-example-panel-csharp"><pre><code class="language-csharp">using System.Net.Http.Json;
using var client = new HttpClient(); client.DefaultRequestHeaders.Add("x-goog-api-key", Environment.GetEnvironmentVariable("GEMINI_API_KEY"));
var payload = new {
    contents = new[] { new { role = "user", parts = new[] { new { text = "生成一张日落海边的插画" } } } },
    generationConfig = new {
        responseModalities = new[] { "IMAGE" },
        imageConfig = new { aspectRatio = "16:9", imageSize = "2K" }
    }
};
var response = await client.PostAsJsonAsync("https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent/", payload);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre></div>
  </div>
</div>

`imageConfig.aspectRatio` 和 `imageConfig.imageSize` 的可选值由模型决定。响应中的 `candidates[].content.parts[]` 可能包含 `inlineData.mimeType` 与 Base64 编码的 `inlineData.data`；请将其解码后保存为图片文件。

## 返回响应

### 成功响应

```json
{
  "candidates": [{
    "content": {
      "role": "model",
      "parts": [{
        "inlineData": {
          "mimeType": "image/png",
          "data": "<BASE64_IMAGE>"
        }
      }]
    },
    "finishReason": "STOP",
    "safetyRatings": []
  }],
  "usageMetadata": {
    "promptTokenCount": 12,
    "candidatesTokenCount": 0,
    "totalTokenCount": 12
  }
}
```

<details class="response-field-details" open>
<summary>响应字段</summary>
<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>candidates</code></td><td>array</td><td>模型生成的候选结果。</td></tr>
    <tr><td><code>candidates[].content.parts[].inlineData.mimeType</code></td><td>string</td><td>图片 MIME 类型，例如 <code>image/png</code>。</td></tr>
    <tr><td><code>candidates[].content.parts[].inlineData.data</code></td><td>string</td><td>图片的 Base64 数据，解码后写入文件。</td></tr>
    <tr><td><code>candidates[].finishReason</code></td><td>string</td><td>生成结束原因，例如 <code>STOP</code> 或 <code>SAFETY</code>。</td></tr>
    <tr><td><code>usageMetadata</code></td><td>object</td><td>输入、输出及总 token 统计。</td></tr>
  </tbody>
</table>
</div>
</details>

### 错误响应

参数不支持、模型不可用或触发限流时，网关返回 `4xx` 错误对象；请根据 `error.message` 修正请求后再重试。

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看 Gemini 图像响应">
  <input class="response-status-input" type="radio" name="gemini-image-response-status" id="gemini-image-response-status-200" checked>
  <input class="response-status-input" type="radio" name="gemini-image-response-status" id="gemini-image-response-status-400">
  <input class="response-status-input" type="radio" name="gemini-image-response-status" id="gemini-image-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="gemini-image-response-status-200">200 成功</label>
    <label for="gemini-image-response-status-400">400 请求错误</label>
    <label for="gemini-image-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <p>成功响应请参阅上方的 Gemini 原生图像响应示例。</p>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  "error": {
    "code": 400,
    "message": "Invalid value for responseModalities",
    "status": "INVALID_ARGUMENT"
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-429">
      <pre><code class="language-json">{
  "error": {
    "code": 429,
    "message": "Rate limit exceeded",
    "status": "RESOURCE_EXHAUSTED"
  }
}</code></pre>
    </div>
  </div>
</div>

## OpenAI 兼容格式

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/chat/completions</code>
</div>

该兼容接口使用 OpenAI Chat Completions 路径调用 Gemini 图像模型。网关负责将 `messages` 转换为 Gemini 内容；请求体使用 `model`、`messages`、`stream` 和 `extra_body.google.image_config`，响应为 `chat.completion` 对象。图像生成请求也可在 `messages` 中同时提供文本和媒体输入，具体支持情况取决于模型。

## 请求参数

### 请求头

<div class="parameter-details-group">
<details class="parameter-details" open>
<summary>Authorization</summary>
<div class="parameter-details__content"><p>使用 Bearer Token 认证。格式: <code>Authorization: Bearer sk-xxxxxx</code></p></div>
</details>

<details class="parameter-details" open>
<summary>Content-Type</summary>
<div class="parameter-details__content"><p>请求体使用 <code>Content-Type: application/json</code>。</p></div>
</details>
</div>

### 请求体字段

<details class="request-field-details" open>
<summary>OpenAI 兼容请求字段</summary>
<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>Gemini 图像模型 ID，例如 <code>gemini-2.5-flash-image</code>。</td><td>是</td></tr>
    <tr><td><code>messages</code></td><td>array</td><td>OpenAI Chat Completions 消息数组，包含图片生成提示词。</td><td>是</td></tr>
    <tr><td><code>stream</code></td><td>boolean</td><td>是否使用流式响应；非流式图像生成示例设置为 <code>false</code>。</td><td>是</td></tr>
    <tr><td><code>extra_body.google.image_config</code></td><td>object</td><td>Gemini 图像配置扩展，包含 <code>aspect_ratio</code> 和 <code>image_size</code>。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求体示例

<div class="request-examples" role="group" aria-label="OpenAI 兼容图像请求示例">
  <input class="request-example-input" type="radio" name="gemini-openai-image-example-language" id="gemini-openai-image-example-curl" checked>
  <input class="request-example-input" type="radio" name="gemini-openai-image-example-language" id="gemini-openai-image-example-javascript">
  <input class="request-example-input" type="radio" name="gemini-openai-image-example-language" id="gemini-openai-image-example-go">
  <input class="request-example-input" type="radio" name="gemini-openai-image-example-language" id="gemini-openai-image-example-python">
  <input class="request-example-input" type="radio" name="gemini-openai-image-example-language" id="gemini-openai-image-example-java">
  <input class="request-example-input" type="radio" name="gemini-openai-image-example-language" id="gemini-openai-image-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言"><label for="gemini-openai-image-example-curl">cURL</label><label for="gemini-openai-image-example-javascript">JavaScript</label><label for="gemini-openai-image-example-go">Go</label><label for="gemini-openai-image-example-python">Python</label><label for="gemini-openai-image-example-java">Java</label><label for="gemini-openai-image-example-csharp">C#</label></div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl"><pre><code class="language-bash">curl -X POST "https://10000router.com/v1/chat/completions" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-2.5-flash-image",
    "messages": [{"role": "user", "content": "生成一张日落海边的插画"}],
    "stream": false,
    "extra_body": {"google": {"image_config": {"aspect_ratio": "16:9", "image_size": "2K"}}}
  }'</code></pre></div>
    <div class="request-example-panel request-example-panel-javascript"><pre><code class="language-javascript">const payload = {
  model: "gemini-2.5-flash-image",
  messages: [{ role: "user", content: "生成一张日落海边的插画" }],
  stream: false,
  extra_body: { google: { image_config: { aspect_ratio: "16:9", image_size: "2K" } } }
};
const response = await fetch("https://10000router.com/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
console.log(await response.json());</code></pre></div>
    <div class="request-example-panel request-example-panel-go"><pre><code class="language-go">payload := `{
  "model": "gemini-2.5-flash-image",
  "messages": [{"role": "user", "content": "生成一张日落海边的插画"}],
  "stream": false,
  "extra_body": {"google": {"image_config": {"aspect_ratio": "16:9", "image_size": "2K"}}}
}`
req, _ := http.NewRequest("POST", "https://10000router.com/v1/chat/completions", strings.NewReader(payload))
req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req)
if err != nil { log.Fatal(err) }
defer res.Body.Close()</code></pre></div>
    <div class="request-example-panel request-example-panel-python"><pre><code class="language-python">import os
import requests

payload = {
    "model": "gemini-2.5-flash-image",
    "messages": [{"role": "user", "content": "生成一张日落海边的插画"}],
    "stream": False,
    "extra_body": {"google": {"image_config": {"aspect_ratio": "16:9", "image_size": "2K"}}},
}
response = requests.post(
    "https://10000router.com/v1/chat/completions",
    headers={"Authorization": "Bearer " + os.environ["OPENAI_API_KEY"], "Content-Type": "application/json"},
    json=payload,
)
print(response.json())</code></pre></div>
    <div class="request-example-panel request-example-panel-java"><pre><code class="language-java">var payload = "{\"model\":\"gemini-2.5-flash-image\","
    + "\"messages\":[{\"role\":\"user\",\"content\":\"生成一张日落海边的插画\"}],"
    + "\"stream\":false,\"extra_body\":{\"google\":{\"image_config\":{"
    + "\"aspect_ratio\":\"16:9\",\"image_size\":\"2K\"}}}}";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1/chat/completions"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload))
    .build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre></div>
    <div class="request-example-panel request-example-panel-csharp"><pre><code class="language-csharp">using System.Net.Http.Json;
using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
var payload = new {
    model = "gemini-2.5-flash-image",
    messages = new[] { new { role = "user", content = "生成一张日落海边的插画" } },
    stream = false,
    extra_body = new { google = new { image_config = new { aspect_ratio = "16:9", image_size = "2K" } } }
};
var response = await client.PostAsJsonAsync("https://10000router.com/v1/chat/completions", payload);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre></div>
  </div>
</div>

## 返回响应

```json
{
  "id": "chatcmpl-image-abc123",
  "object": "chat.completion",
  "model": "gemini-2.5-flash-image",
  "choices": [{
    "index": 0,
    "message": {"role": "assistant", "content": "![image](data:image/png;base64,<BASE64_IMAGE>)"},
    "finish_reason": "stop"
  }]
}
```

<details class="response-field-details" open>
<summary>OpenAI 兼容响应字段</summary>
<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>id</code></td><td>string</td><td>聊天响应 ID。</td></tr>
    <tr><td><code>object</code></td><td>string</td><td>固定为 <code>chat.completion</code>。</td></tr>
    <tr><td><code>choices[].message.content</code></td><td>string</td><td>图像 Markdown、Base64 或数据 URL，具体取决于渠道适配器。</td></tr>
    <tr><td><code>choices[].finish_reason</code></td><td>string</td><td>生成结束原因。</td></tr>
  </tbody>
</table>
</div>
</details>
