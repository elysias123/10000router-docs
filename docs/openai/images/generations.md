# 生成图像

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/generations/</code>
</div>

根据提示词生成图像。请求格式与网关文档中的原生 OpenAI 图像接口一致，参数是否可用及默认值取决于所选模型和上游渠道。

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
<div class="parameter-details__content"><p>请求体使用 <code>Content-Type: application/json</code>。</p></div>
</details>
</div>

### 请求体

<details class="request-field-details" open>
<summary>请求体参数（10 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>未声明</td><td>用于图像生成的模型。常见值为 <code>dall-e-2</code>、<code>dall-e-3</code> 或 <code>gpt-image-1</code>；使用模型专属参数时请显式传入。</td><td>否</td></tr>
    <tr><td><code>prompt</code></td><td>string</td><td>—</td><td>所需图像的文本描述。不同模型的最大长度不同，具体限制以模型为准。</td><td>是</td></tr>
    <tr><td><code>n</code></td><td>integer</td><td>未声明</td><td>要生成的图像数量，必须介于 <code>1</code> 到 <code>10</code>；<code>dall-e-3</code> 只支持 <code>n=1</code>。</td><td>否</td></tr>
    <tr><td><code>size</code></td><td>string</td><td>未声明</td><td>生成图像的尺寸；可用取值取决于模型。</td><td>否</td></tr>
    <tr><td><code>background</code></td><td>string</td><td>未声明</td><td>仅 <code>gpt-image-1</code> 支持；可选 <code>transparent</code>、<code>opaque</code> 或 <code>auto</code>。</td><td>否</td></tr>
    <tr><td><code>moderation</code></td><td>string</td><td>未声明</td><td>控制 <code>gpt-image-1</code> 的内容审核级别，可选 <code>low</code> 或 <code>auto</code>。</td><td>否</td></tr>
    <tr><td><code>quality</code></td><td>string</td><td>未声明</td><td>生成图像的质量，具体取值由模型决定。</td><td>否</td></tr>
    <tr><td><code>stream</code></td><td>string</td><td>未声明</td><td>流式输出选项，只有支持图像流式输出的模型或渠道才可使用。</td><td>否</td></tr>
    <tr><td><code>style</code></td><td>string</td><td>未声明</td><td>图像风格，具体取值由模型决定。</td><td>否</td></tr>
    <tr><td><code>user</code></td><td>string</td><td>未声明</td><td>最终用户的唯一标识符。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### JSON 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  "model": "gpt-image-1",
  "prompt": "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格",
  "n": 1,
  "size": "1024x1024",
  "background": "opaque",
  "moderation": "auto",
  "quality": "high",
  "stream": false,
  "user": "user_123"
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="image-generation-example-language" id="image-generation-example-curl" checked>
  <input class="request-example-input" type="radio" name="image-generation-example-language" id="image-generation-example-javascript">
  <input class="request-example-input" type="radio" name="image-generation-example-language" id="image-generation-example-go">
  <input class="request-example-input" type="radio" name="image-generation-example-language" id="image-generation-example-python">
  <input class="request-example-input" type="radio" name="image-generation-example-language" id="image-generation-example-java">
  <input class="request-example-input" type="radio" name="image-generation-example-language" id="image-generation-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="image-generation-example-curl">cURL</label>
    <label for="image-generation-example-javascript">JavaScript</label>
    <label for="image-generation-example-go">Go</label>
    <label for="image-generation-example-python">Python</label>
    <label for="image-generation-example-java">Java</label>
    <label for="image-generation-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/images/generations/" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格",
    "size": "1024x1024",
    "quality": "high",
    "background": "opaque"
  }'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const response = await fetch("https://10000router.com/v1/images/generations/", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-image-1",
    prompt: "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格",
    size: "1024x1024",
    quality: "high",
    background: "opaque"
  })
});
const imageResponse = await response.json();</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-python">
      <pre><code class="language-python">import os
import requests

response = requests.post(
    "https://10000router.com/v1/images/generations/",
    headers={
        "Authorization": "Bearer " + os.environ["OPENAI_API_KEY"],
        "Content-Type": "application/json",
    },
    json={
        "model": "gpt-image-1",
        "prompt": "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格",
        "size": "1024x1024",
        "quality": "high",
        "background": "opaque",
    },
)
response.raise_for_status()
print(response.json())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-go">
      <pre><code class="language-go">payload := `{"model":"gpt-image-1","prompt":"一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格","size":"1024x1024","quality":"high","background":"opaque"}`
req, _ := http.NewRequest("POST", "https://10000router.com/v1/images/generations/", strings.NewReader(payload))
req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req)
if err != nil { log.Fatal(err) }
defer res.Body.Close()</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-java">
      <pre><code class="language-java">var payload = "{\"model\":\"gpt-image-1\",\"prompt\":\"一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格\",\"size\":\"1024x1024\",\"quality\":\"high\",\"background\":\"opaque\"}";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1/images/generations/"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload)).build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-csharp">
      <pre><code class="language-csharp">using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
var payload = new { model = "gpt-image-1", prompt = "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格", size = "1024x1024", quality = "high", background = "opaque" };
var response = await client.PostAsJsonAsync("https://10000router.com/v1/images/generations/", payload);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="image-generation-response-status" id="image-generation-response-status-200" checked>
  <input class="response-status-input" type="radio" name="image-generation-response-status" id="image-generation-response-status-400">
  <input class="response-status-input" type="radio" name="image-generation-response-status" id="image-generation-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="image-generation-response-status-200">200 成功</label>
    <label for="image-generation-response-status-400">400 请求错误</label>
    <label for="image-generation-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  "created": 1710000000,
  "data": [
    {
      "url": "https://example.com/generated-image.png",
      "revised_prompt": "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格"
    }
  ],
  "usage": {
    "total_tokens": 1024,
    "input_tokens": 128,
    "output_tokens": 896,
    "input_tokens_details": {
      "text_tokens": 128,
      "image_tokens": 0
    }
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  "error": {
    "message": "Invalid value for parameter: quality",
    "type": "invalid_request_error",
    "param": "quality",
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
<summary>顶层字段（3 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>created</code></td><td>integer</td><td>响应创建时间，Unix 时间戳（秒）。</td></tr>
    <tr><td><code>data</code></td><td>array&lt;object&gt;</td><td>生成的图像数组，数量由请求参数 <code>n</code> 决定。</td></tr>
    <tr><td><code>usage</code></td><td>object</td><td><code>gpt-image-1</code> 等模型可能返回的 token 用量；部分模型或渠道不返回。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="response-field-details" open>
<summary><code>data[]</code> 字段（3 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>url</code></td><td>string</td><td>生成图像的临时 URL。URL 的有效期由上游决定。</td></tr>
    <tr><td><code>b64_json</code></td><td>string</td><td>Base64 编码的图像数据；仅在模型/渠道返回该格式时出现。</td></tr>
    <tr><td><code>revised_prompt</code></td><td>string</td><td>上游改写后的提示词；部分模型不返回。</td></tr>
  </tbody>
</table>
</div>
</details>

### 流式响应

请求设置 <code>stream: true</code> 且模型/渠道支持时，响应为 Server-Sent Events。网关会转发图像事件，常见事件类型为 <code>image_generation.completed</code>，最后以 <code>data: [DONE]</code> 结束；不支持流式输出时请使用 <code>stream: false</code>。
