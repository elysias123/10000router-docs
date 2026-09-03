# 创建异步生成任务

<div class="api-endpoint" role="group" aria-label="创建异步生成任务">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/generations/async</code>
</div>

提交异步图像生成任务并立即返回 `task_id`。这是 10000Router 的扩展端点，请求体使用 JSON，生成参数与 `/v1/images/generations/` 兼容；具体字段是否生效取决于模型和上游渠道。

> **10000Router 扩展**：异步路径、任务状态和结果下载协议不属于 OpenAI 官方 Images API，不能假设被标准 OpenAI SDK 直接支持。

## 请求参数

### 请求头

<div class="parameter-details-group">
<details class="parameter-details" open>
<summary>Authorization</summary>
<div class="parameter-details__content"><p>使用 Bearer Token 认证。格式：<code>Authorization: Bearer sk-xxxxxx</code></p></div>
</details>
<details class="parameter-details" open>
<summary>Content-Type</summary>
<div class="parameter-details__content"><p>请求体使用 JSON 编码：<code>Content-Type: application/json</code>。</p></div>
</details>
</div>

### 请求体

<details class="request-field-details" open>
<summary>请求体参数（10 个）</summary>
<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>未声明</td><td>图像模型 ID；建议显式传入。</td><td>否</td></tr>
    <tr><td><code>prompt</code></td><td>string</td><td>—</td><td>图像描述。</td><td>是</td></tr>
    <tr><td><code>n</code></td><td>integer</td><td>未声明</td><td>生成数量，受网关和上游模型上限限制。</td><td>否</td></tr>
    <tr><td><code>size</code></td><td>string</td><td>未声明</td><td>输出尺寸，如 <code>1024x1024</code>；可用值以模型为准。</td><td>否</td></tr>
    <tr><td><code>background</code></td><td>string</td><td>未声明</td><td><code>transparent</code>、<code>opaque</code> 或 <code>auto</code>；通常仅 <code>gpt-image-1</code> 支持。</td><td>否</td></tr>
    <tr><td><code>moderation</code></td><td>string</td><td>未声明</td><td><code>low</code> 或 <code>auto</code>；通常仅 <code>gpt-image-1</code> 支持。</td><td>否</td></tr>
    <tr><td><code>quality</code></td><td>string</td><td>未声明</td><td>图像质量，具体取值以模型为准。</td><td>否</td></tr>
    <tr><td><code>stream</code></td><td>string</td><td>未声明</td><td>流式选项；异步任务通常不需要，只有渠道明确支持时才使用。</td><td>否</td></tr>
    <tr><td><code>style</code></td><td>string</td><td>未声明</td><td>图像风格，具体取值以模型为准。</td><td>否</td></tr>
    <tr><td><code>user</code></td><td>string</td><td>未声明</td><td>最终用户的唯一标识符。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="async-generation-example-language" id="async-generation-example-curl" checked>
  <input class="request-example-input" type="radio" name="async-generation-example-language" id="async-generation-example-javascript">
  <input class="request-example-input" type="radio" name="async-generation-example-language" id="async-generation-example-go">
  <input class="request-example-input" type="radio" name="async-generation-example-language" id="async-generation-example-python">
  <input class="request-example-input" type="radio" name="async-generation-example-language" id="async-generation-example-java">
  <input class="request-example-input" type="radio" name="async-generation-example-language" id="async-generation-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="async-generation-example-curl">cURL</label>
    <label for="async-generation-example-javascript">JavaScript</label>
    <label for="async-generation-example-go">Go</label>
    <label for="async-generation-example-python">Python</label>
    <label for="async-generation-example-java">Java</label>
    <label for="async-generation-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl"><pre><code class="language-bash">curl -X POST "https://10000router.com/v1/images/generations/async" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "日落时分的锦鲤池，写实风格",
    "size": "1024x1024",
    "quality": "high"
  }'</code></pre></div>
    <div class="request-example-panel request-example-panel-javascript"><pre><code class="language-javascript">const payload = {
  model: "gpt-image-1",
  prompt: "日落时分的锦鲤池，写实风格",
  size: "1024x1024",
  quality: "high"
};
const response = await fetch("https://10000router.com/v1/images/generations/async", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});
const data = await response.json();
console.log(data);</code></pre></div>
    <div class="request-example-panel request-example-panel-go"><pre><code class="language-go">payload := `{"model":"gpt-image-1","prompt":"日落时分的锦鲤池，写实风格","size":"1024x1024","quality":"high"}`
req, err := http.NewRequest("POST", "https://10000router.com/v1/images/generations/async", strings.NewReader(payload))
if err != nil { log.Fatal(err) }
req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req)
if err != nil { log.Fatal(err) }
defer res.Body.Close()</code></pre></div>
    <div class="request-example-panel request-example-panel-python"><pre><code class="language-python">import os
import requests

payload = {
    "model": "gpt-image-1",
    "prompt": "日落时分的锦鲤池，写实风格",
    "size": "1024x1024",
    "quality": "high",
}
response = requests.post(
    "https://10000router.com/v1/images/generations/async",
    headers={"Authorization": "Bearer " + os.environ["OPENAI_API_KEY"]},
    json=payload,
)
response.raise_for_status()
print(response.json())</code></pre></div>
    <div class="request-example-panel request-example-panel-java"><pre><code class="language-java">var payload = "{\"model\":\"gpt-image-1\",\"prompt\":\"日落时分的锦鲤池，写实风格\",\"size\":\"1024x1024\",\"quality\":\"high\"}";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1/images/generations/async"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload))
    .build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());</code></pre></div>
    <div class="request-example-panel request-example-panel-csharp"><pre><code class="language-csharp">using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
var payload = new {
    model = "gpt-image-1",
    prompt = "日落时分的锦鲤池，写实风格",
    size = "1024x1024",
    quality = "high"
};
var response = await client.PostAsJsonAsync("https://10000router.com/v1/images/generations/async", payload);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre></div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="async-generation-response-status" id="async-generation-response-status-200" checked>
  <input class="response-status-input" type="radio" name="async-generation-response-status" id="async-generation-response-status-400">
  <input class="response-status-input" type="radio" name="async-generation-response-status" id="async-generation-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="async-generation-response-status-200">200 成功</label>
    <label for="async-generation-response-status-400">400 请求错误</label>
    <label for="async-generation-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200"><pre><code class="language-json">{
  "code": "success",
  "data": "task_xxx"
}</code></pre></div>
    <div class="response-status-panel response-status-panel-400"><pre><code class="language-json">{
  "error": {
    "message": "Invalid image generation parameters",
    "type": "invalid_request_error",
    "param": "prompt",
    "code": null
  }
}</code></pre></div>
    <div class="response-status-panel response-status-panel-429"><pre><code class="language-json">{
  "error": {
    "message": "Rate limit reached",
    "type": "rate_limit_exceeded",
    "param": null,
    "code": null
  }
}</code></pre></div>
  </div>
</div>

<details class="response-field-details" open>
<summary>成功响应字段</summary>
<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>code</code></td><td>string</td><td>任务提交结果，成功时为 <code>success</code>。</td></tr>
    <tr><td><code>data</code></td><td>string</td><td>异步任务 ID，用于查询任务状态。</td></tr>
  </tbody>
</table>
</div>
</details>
