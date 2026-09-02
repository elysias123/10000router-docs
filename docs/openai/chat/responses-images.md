# Responses 图像输入

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/responses</code>
</div>

Responses 图像输入使用 `POST /v1/responses`，在 `input` 消息的 `content` 数组中传入 `input_text` 和 `input_image` 内容块。下面的格式需要所选上游模型支持；NewAPI 的 Responses OpenAPI 定义将 `input` 声明为字符串或数组。本文是图像输入的最小示例，不是完整 Responses 参数表；其他通用字段请参阅 [Responses 格式](responses-text.md)。内容块的具体可用性由模型和上游渠道决定，参考 schema 不会替所有渠道校验这些内容块。

## 请求参数

### 请求头

<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

请求体必须使用 <code>Content-Type: application/json</code>。

### 请求体

<details class="request-field-details" open>
<summary>图像输入字段（2 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>是</td><td>支持视觉输入的模型 ID。</td></tr>
    <tr><td><code>input</code></td><td>array</td><td>是</td><td>包含 <code>role</code> 和 <code>content</code> 的消息数组；文本块使用 <code>input_text</code>，图像块使用 <code>input_image</code>。</td></tr>
  </tbody>
</table>
</div>
</details>

### JSON 请求体

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  "model": "gpt-4o-mini",
  "input": [
    {
      "role": "user",
      "content": [
        { "type": "input_text", "text": "描述这张图片" },
        { "type": "input_image", "image_url": "https://example.com/image.png" }
      ]
    }
  ]
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="Responses 图像输入请求示例">
  <input class="request-example-input" type="radio" name="responses-images-example-language" id="responses-images-example-curl" checked>
  <input class="request-example-input" type="radio" name="responses-images-example-language" id="responses-images-example-javascript">
  <input class="request-example-input" type="radio" name="responses-images-example-language" id="responses-images-example-go">
  <input class="request-example-input" type="radio" name="responses-images-example-language" id="responses-images-example-python">
  <input class="request-example-input" type="radio" name="responses-images-example-language" id="responses-images-example-java">
  <input class="request-example-input" type="radio" name="responses-images-example-language" id="responses-images-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="responses-images-example-curl">cURL</label>
    <label for="responses-images-example-javascript">JavaScript</label>
    <label for="responses-images-example-go">Go</label>
    <label for="responses-images-example-python">Python</label>
    <label for="responses-images-example-java">Java</label>
    <label for="responses-images-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "input": [{
      "role": "user",
      "content": [
        { "type": "input_text", "text": "Describe this image." },
        { "type": "input_image", "image_url": "https://example.com/image.png" }
      ]
    }]
  }'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const payload = {
  model: "gpt-4o-mini",
  input: [{
    role: "user",
    content: [
      { type: "input_text", text: "Describe this image." },
      { type: "input_image", image_url: "https://example.com/image.png" }
    ]
  }]
};

const response = await fetch("https://10000router.com/v1/responses", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});
console.log(await response.json());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-go">
      <pre><code class="language-go">payload := strings.NewReader(`{
  "model": "gpt-4o-mini",
  "input": [{
    "role": "user",
    "content": [
      { "type": "input_text", "text": "Describe this image." },
      { "type": "input_image", "image_url": "https://example.com/image.png" }
    ]
  }]
}`)
req, err := http.NewRequest("POST", "https://10000router.com/v1/responses", payload)
if err != nil {
  log.Fatal(err)
}
req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req)
if err != nil {
  log.Fatal(err)
}
defer res.Body.Close()</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-python">
      <pre><code class="language-python">import os
import requests

payload = {
    "model": "gpt-4o-mini",
    "input": [{
        "role": "user",
        "content": [
            {"type": "input_text", "text": "Describe this image."},
            {"type": "input_image", "image_url": "https://example.com/image.png"},
        ],
    }],
}

response = requests.post(
    "https://10000router.com/v1/responses",
    headers={
        "Authorization": "Bearer " + os.environ["OPENAI_API_KEY"],
        "Content-Type": "application/json",
    },
    json=payload,
)
response.raise_for_status()
print(response.json())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-java">
      <pre><code class="language-java">var client = java.net.http.HttpClient.newHttpClient();
var payload = "{"
    + "\"model\":\"gpt-4o-mini\","
    + "\"input\":[{\"role\":\"user\",\"content\":["
    + "{\"type\":\"input_text\",\"text\":\"Describe this image.\"},"
    + "{\"type\":\"input_image\",\"image_url\":\"https://example.com/image.png\"}]}]}";
var request = java.net.http.HttpRequest.newBuilder()
    .uri(java.net.URI.create("https://10000router.com/v1/responses"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload))
    .build();
var response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-csharp">
      <pre><code class="language-csharp">using System.Net.Http.Json;

using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new(
    "Bearer",
    Environment.GetEnvironmentVariable("OPENAI_API_KEY")
);
var payload = new
{
    model = "gpt-4o-mini",
    input = new[]
    {
        new
        {
            role = "user",
            content = new object[]
            {
                new { type = "input_text", text = "Describe this image." },
                new { type = "input_image", image_url = "https://example.com/image.png" }
            }
        }
    }
};
var response = await client.PostAsJsonAsync(
    "https://10000router.com/v1/responses",
    payload
);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>

如果上游要求图片 URL 使用对象形式，可将 `image_url` 写成 `{ "url": "https://example.com/image.png" }`；具体格式以渠道的模型说明为准。

## 返回响应

响应格式与普通 Responses 请求一致，文本通常位于 `output[].content[]` 的 `output_text` 内容块中。请参阅 [Responses 格式](responses-text.md) 中的成功响应、流式事件和错误响应说明。
