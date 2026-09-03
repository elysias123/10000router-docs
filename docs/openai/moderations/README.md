# Moderations API

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/moderations</code>
</div>

内容安全审核接口，用于检查文本是否违反使用政策。接口使用 OpenAI 原生格式；请求体仅包含 `input` 和可选的 `model` 字段。

## 请求参数

### 请求头

<div class="parameter-details-group">
<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。格式：<code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

<details class="parameter-details" open>
<summary>Content-Type</summary>

<div class="parameter-details__content">
<p>请求体使用 JSON 编码：<code>Content-Type: application/json</code>。</p>
</div>
</details>

</div>

### 请求体

<details class="request-field-details" open>
<summary>请求参数（2 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>input</code></td><td>string | array&lt;string&gt;</td><td>—</td><td>要审核的文本。传入字符串时审核一段文本；传入字符串数组时逐项审核，并按输入顺序返回对应的 <code>results</code>。</td><td>是</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>未声明</td><td>审核模型 ID，例如 <code>text-moderation-latest</code> 或 <code>omni-moderation-latest</code>。省略时由网关或上游选择默认模型。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

参数约束：

- `input` 必须提供字符串或字符串数组；数组中的每项对应一个独立审核结果。
- `model` 为可选字段。模型名称必须是网关及上游服务支持的模型，否则返回 `400`。
- `results` 的数量和 `input` 中的文本数量一致；单个字符串输入也会返回只包含一个元素的数组。

### JSON 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  "model": "text-moderation-latest",
  "input": "I want to keep this example safe and policy-compliant."
}</code></pre>

<p>批量审核时，将 <code>input</code> 改为字符串数组即可：</p>
<pre><code class="language-json">{
  "model": "text-moderation-latest",
  "input": [
    "A first message to review.",
    "A second message to review."
  ]
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例代码">
  <input class="request-example-input" type="radio" name="moderations-example-language" id="moderations-example-curl" checked>
  <input class="request-example-input" type="radio" name="moderations-example-language" id="moderations-example-javascript">
  <input class="request-example-input" type="radio" name="moderations-example-language" id="moderations-example-go">
  <input class="request-example-input" type="radio" name="moderations-example-language" id="moderations-example-python">
  <input class="request-example-input" type="radio" name="moderations-example-language" id="moderations-example-java">
  <input class="request-example-input" type="radio" name="moderations-example-language" id="moderations-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="moderations-example-curl">cURL</label>
    <label for="moderations-example-javascript">JavaScript</label>
    <label for="moderations-example-go">Go</label>
    <label for="moderations-example-python">Python</label>
    <label for="moderations-example-java">Java</label>
    <label for="moderations-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/moderations" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-moderation-latest",
    "input": "I want to keep this example safe and policy-compliant."
  }'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const response = await fetch("https://10000router.com/v1/moderations", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "text-moderation-latest",
    input: "I want to keep this example safe and policy-compliant."
  })
});
console.log(await response.json());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-go">
      <pre><code class="language-go">package main

import (
  "io"
  "log"
  "net/http"
  "os"
  "strings"
)

func main() {
  payload := `{"model":"text-moderation-latest","input":"I want to keep this example safe and policy-compliant."}`
  req, err := http.NewRequest("POST", "https://10000router.com/v1/moderations", strings.NewReader(payload))
  if err != nil { log.Fatal(err) }
  req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
  req.Header.Set("Content-Type", "application/json")
  res, err := http.DefaultClient.Do(req)
  if err != nil { log.Fatal(err) }
  defer res.Body.Close()
  body, err := io.ReadAll(res.Body)
  if err != nil { log.Fatal(err) }
  log.Println(string(body))
}</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-python">
      <pre><code class="language-python">import os
import requests

response = requests.post(
    "https://10000router.com/v1/moderations",
    headers={
        "Authorization": "Bearer " + os.environ["OPENAI_API_KEY"],
        "Content-Type": "application/json",
    },
    json={
        "model": "text-moderation-latest",
        "input": "I want to keep this example safe and policy-compliant.",
    },
)
print(response.json())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-java">
      <pre><code class="language-java">var client = java.net.http.HttpClient.newHttpClient();
var body = "{\"model\":\"text-moderation-latest\",\"input\":\"I want to keep this example safe and policy-compliant.\"}";
var request = java.net.http.HttpRequest.newBuilder()
    .uri(java.net.URI.create("https://10000router.com/v1/moderations"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(body))
    .build();
var response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-csharp">
      <pre><code class="language-csharp">using System.Net.Http.Json;

using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
var response = await client.PostAsJsonAsync(
    "https://10000router.com/v1/moderations",
    new {
        model = "text-moderation-latest",
        input = "I want to keep this example safe and policy-compliant."
    });
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="moderations-response-status" id="moderations-response-status-200" checked>
  <input class="response-status-input" type="radio" name="moderations-response-status" id="moderations-response-status-400">
  <input class="response-status-input" type="radio" name="moderations-response-status" id="moderations-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="moderations-response-status-200">200 成功</label>
    <label for="moderations-response-status-400">400 请求错误</label>
    <label for="moderations-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  "id": "modr-abc123",
  "model": "text-moderation-latest",
  "results": [
    {
      "flagged": false,
      "categories": {
        "hate": false,
        "hate/threatening": false,
        "harassment": false,
        "harassment/threatening": false,
        "self-harm": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "sexual": false,
        "sexual/minors": false,
        "violence": false,
        "violence/graphic": false,
        "illicit": false,
        "illicit/violent": false
      },
      "category_scores": {
        "hate": 0.0001,
        "hate/threatening": 0.0001,
        "harassment": 0.0002,
        "harassment/threatening": 0.0001,
        "self-harm": 0.0001,
        "self-harm/intent": 0.0001,
        "self-harm/instructions": 0.0001,
        "sexual": 0.0001,
        "sexual/minors": 0.0001,
        "violence": 0.0002,
        "violence/graphic": 0.0001,
        "illicit": 0.0001,
        "illicit/violent": 0.0001
      }
    }
  ]
}</code></pre>
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
    "message": "Rate limit reached for moderations",
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
    <tr><td><code>id</code></td><td>string</td><td>本次审核请求的唯一标识。</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>实际执行审核的模型 ID。</td></tr>
    <tr><td><code>results</code></td><td>array&lt;object&gt;</td><td>审核结果数组。数组顺序与请求中的 <code>input</code> 顺序一致。</td></tr>
  </tbody>
</table>
</div>

<details class="response-field-details" open>
<summary><code>results[]</code> 字段（3 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>flagged</code></td><td>boolean</td><td>文本是否命中任一审核类别。为 <code>true</code> 时应根据具体类别采取拦截或人工复核措施。</td></tr>
    <tr><td><code>categories</code></td><td>object&lt;string, boolean&gt;</td><td>按类别给出的审核结论。每个键表示一个类别，值为是否命中；上游可能随模型版本增加类别。</td></tr>
    <tr><td><code>category_scores</code></td><td>object&lt;string, number&gt;</td><td>按类别给出的置信分数，通常在 <code>0</code> 到 <code>1</code> 之间。分数阈值由上游模型决定，不应单独替代 <code>categories</code> 结论。</td></tr>
  </tbody>
</table>
</div>
</details>
</details>

标准模型通常返回以下审核类别：

- `hate`、`hate/threatening`：仇恨内容及仇恨威胁。
- `harassment`、`harassment/threatening`：骚扰内容及骚扰威胁。
- `self-harm`、`self-harm/intent`、`self-harm/instructions`：自残内容、意图及指导。
- `sexual`、`sexual/minors`：性内容及涉及未成年人的性内容。
- `violence`、`violence/graphic`：暴力内容及血腥暴力描写。
- `illicit`、`illicit/violent`：非法活动及涉及暴力的非法活动。

类别键集合由上游审核模型返回；请以实际响应为准。网关的 OpenAPI 定义将 `categories` 和 `category_scores` 声明为可扩展对象，以兼容不同模型版本。
