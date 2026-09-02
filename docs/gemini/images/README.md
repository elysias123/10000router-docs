# Gemini 图像

Gemini 图像模型通过 `generateContent` 返回候选内容中的 `inlineData` 图片数据。请求时将 `generationConfig.responseModalities` 设置为 `["IMAGE"]`（也可以同时请求 `TEXT`）。

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1beta/models/{model}:generateContent</code>
</div>

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

## 请求参数

### 原生 Gemini 格式

请求体至少包含 `contents` 和 `generationConfig`。`contents[].parts[].text` 描述要生成的图片，`generationConfig.responseModalities` 必须包含 `IMAGE`：

```json
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
```

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
    <div class="request-example-panel request-example-panel-curl"><pre><code class="language-bash">curl -X POST "https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent" \
  -H "Authorization: Bearer $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d @image-request.json</code></pre></div>
    <div class="request-example-panel request-example-panel-javascript"><pre><code class="language-javascript">const payload = { contents: [{ role: "user", parts: [{ text: "生成一张日落海边的插画" }] }], generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "16:9", imageSize: "2K" } } };
const response = await fetch("https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent", { method: "POST", headers: { Authorization: "Bearer " + process.env.GEMINI_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
console.log(await response.json());</code></pre></div>
    <div class="request-example-panel request-example-panel-go"><pre><code class="language-go">payload := `{"contents":[{"role":"user","parts":[{"text":"生成一张日落海边的插画"}]}],"generationConfig":{"responseModalities":["IMAGE"],"imageConfig":{"aspectRatio":"16:9","imageSize":"2K"}}}`
req, _ := http.NewRequest("POST", "https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent", strings.NewReader(payload)); req.Header.Set("Authorization", "Bearer "+os.Getenv("GEMINI_API_KEY")); req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req); if err != nil { log.Fatal(err) }; defer res.Body.Close()</code></pre></div>
    <div class="request-example-panel request-example-panel-python"><pre><code class="language-python">import os, requests
payload = {"contents": [{"role": "user", "parts": [{"text": "生成一张日落海边的插画"}]}], "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "16:9", "imageSize": "2K"}}}
response = requests.post("https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent", headers={"Authorization": "Bearer " + os.environ["GEMINI_API_KEY"], "Content-Type": "application/json"}, json=payload)
print(response.json())</code></pre></div>
    <div class="request-example-panel request-example-panel-java"><pre><code class="language-java">var payload = "{\"contents\":[{\"role\":\"user\",\"parts\":[{\"text\":\"生成一张日落海边的插画\"}]}],\"generationConfig\":{\"responseModalities\":[\"IMAGE\"],\"imageConfig\":{\"aspectRatio\":\"16:9\",\"imageSize\":\"2K\"}}}";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent")).header("Authorization", "Bearer " + System.getenv("GEMINI_API_KEY")).header("Content-Type", "application/json").POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload)).build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre></div>
    <div class="request-example-panel request-example-panel-csharp"><pre><code class="language-csharp">using System.Net.Http.Json;
using var client = new HttpClient(); client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("GEMINI_API_KEY"));
var payload = new { contents = new[] { new { role = "user", parts = new[] { new { text = "生成一张日落海边的插画" } } } }, generationConfig = new { responseModalities = new[] { "IMAGE" }, imageConfig = new { aspectRatio = "16:9", imageSize = "2K" } } };
var response = await client.PostAsJsonAsync("https://10000router.com/v1beta/models/gemini-2.5-flash-image:generateContent", payload);
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

```json
{
  "error": {
    "code": 400,
    "message": "Invalid value for responseModalities",
    "status": "INVALID_ARGUMENT"
  }
}
```

OpenAI `chat/completions` 图片格式由网关负责转换；如果需要该格式，请使用 OpenAI 聊天接口并在 `extra_body.google.image_config` 中传入图像配置。图像生成请求也可在 `contents.parts` 中同时提供文本和媒体输入，具体支持情况取决于模型。

## OpenAI 兼容格式

网关也支持使用 OpenAI Chat Completions 路径调用 Gemini 图像模型：

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/chat/completions</code>
</div>

在 `extra_body.google.image_config` 中设置图像比例和尺寸，其余字段使用 OpenAI 的 `model`、`messages` 和 `stream`：

```json
{
  "model": "gemini-2.5-flash-image",
  "messages": [{ "role": "user", "content": "生成一张日落海边的插画" }],
  "stream": false,
  "extra_body": {
    "google": {
      "image_config": { "aspect_ratio": "16:9", "image_size": "2K" }
    }
  }
}
```

响应为 OpenAI `chat.completion` 对象；图片通常位于 `choices[].message.content` 的 Base64 或图片数据 URL 中，具体取决于渠道适配器。
