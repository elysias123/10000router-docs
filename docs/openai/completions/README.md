# Completions API

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/completions</code>
</div>

传统文本补全接口。接口根据 `prompt` 生成一个或多个文本候选，适用于兼容旧版 Completion 模型的场景。以下字段与 `CompletionRequest` 保持一致；网关不支持的模型或取值会返回 `400`。

该接口主要用于兼容旧版 Completion 模型。文中的 `gpt-3.5-turbo-instruct` 仅作为传统模型示例，实际可用模型以当前账号配置和上游渠道为准；新项目应优先评估 Chat Completions 或 Responses 接口。

## 请求参数

### 请求头

<div class="parameter-details-group">
<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式：<code>Authorization: Bearer sk-xxxxxx</code></p>
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
<summary>请求参数（10 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>—</td><td>要调用的模型 ID，例如 <code>gpt-3.5-turbo-instruct</code>。</td><td>是</td></tr>
    <tr><td><code>prompt</code></td><td>string / array</td><td>—</td><td>用于补全的提示词。可以传入单个字符串或字符串数组；数组中的每个元素会独立生成结果。</td><td>是</td></tr>
    <tr><td><code>max_tokens</code></td><td>integer</td><td>未声明</td><td>限制每个提示词生成的最大 token 数。总上下文长度不能超过模型上限。</td><td>否</td></tr>
    <tr><td><code>temperature</code></td><td>number</td><td>未声明</td><td>控制采样随机性，具体范围由模型决定。</td><td>否</td></tr>
    <tr><td><code>top_p</code></td><td>number</td><td>未声明</td><td>核采样范围，具体范围由模型决定。一般只调整 <code>temperature</code> 或 <code>top_p</code> 其中一个。</td><td>否</td></tr>
    <tr><td><code>n</code></td><td>integer</td><td>未声明</td><td>为每个提示词生成的候选数量。</td><td>否</td></tr>
    <tr><td><code>stream</code></td><td>boolean</td><td>未声明</td><td>设置为 <code>true</code> 时以 Server-Sent Events（SSE）增量返回结果；设置为 <code>false</code> 时返回完整 JSON。</td><td>否</td></tr>
    <tr><td><code>stop</code></td><td>string / array</td><td>未声明</td><td>命中停止序列后结束生成，可传入一个字符串或字符串数组。</td><td>否</td></tr>
    <tr><td><code>suffix</code></td><td>string</td><td>未声明</td><td>插入补全文本时使用的后缀，仅适用于支持 infill 的模型。</td><td>否</td></tr>
    <tr><td><code>echo</code></td><td>boolean</td><td>未声明</td><td>是否在每个结果的 <code>text</code> 前回显输入的提示词。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### 参数约束

- `model` 和 `prompt` 必须同时提供；`prompt` 为空数组会返回 `400`。
- `temperature` 与 `top_p` 均用于采样控制，通常只调整其中一个。
- `stream=true` 时，响应为 SSE 增量事件；`stream=false`（默认）时返回完整响应。
- `n` 应为正整数；`max_tokens` 不能为负数。实际上限由模型和网关配置决定。

### 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  &quot;model&quot;: &quot;gpt-3.5-turbo-instruct&quot;,
  &quot;prompt&quot;: &quot;Write a short greeting:&quot;,
  &quot;max_tokens&quot;: 64,
  &quot;temperature&quot;: 0.7,
  &quot;top_p&quot;: 1,
  &quot;n&quot;: 1,
  &quot;stop&quot;: [&quot;\n\n&quot;],
  &quot;stream&quot;: false,
  &quot;suffix&quot;: &quot;&quot;,
  &quot;echo&quot;: false
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="completions-example-language" id="completions-example-curl" checked>
  <input class="request-example-input" type="radio" name="completions-example-language" id="completions-example-javascript">
  <input class="request-example-input" type="radio" name="completions-example-language" id="completions-example-go">
  <input class="request-example-input" type="radio" name="completions-example-language" id="completions-example-python">
  <input class="request-example-input" type="radio" name="completions-example-language" id="completions-example-java">
  <input class="request-example-input" type="radio" name="completions-example-language" id="completions-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="completions-example-curl">cURL</label>
    <label for="completions-example-javascript">JavaScript</label>
    <label for="completions-example-go">Go</label>
    <label for="completions-example-python">Python</label>
    <label for="completions-example-java">Java</label>
    <label for="completions-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST &quot;https://10000router.com/v1/completions&quot; \
  -H &quot;Authorization: Bearer $OPENAI_API_KEY&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{
    &quot;model&quot;: &quot;gpt-3.5-turbo-instruct&quot;,
    &quot;prompt&quot;: &quot;Write a short greeting:&quot;,
    &quot;max_tokens&quot;: 64,
    &quot;temperature&quot;: 0.7,
    &quot;stream&quot;: false
  }'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const response = await fetch("https://10000router.com/v1/completions", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo-instruct",
    prompt: "Write a short greeting:",
    max_tokens: 64,
    temperature: 0.7,
    stream: false
  })
});
console.log(await response.json());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-go">
      <pre><code class="language-go">package main

import (
  "log"
  "net/http"
  "os"
  "strings"
)

func main() {
  payload := `{"model":"gpt-3.5-turbo-instruct","prompt":"Write a short greeting:","max_tokens":64,"temperature":0.7,"stream":false}`
  req, err := http.NewRequest("POST", "https://10000router.com/v1/completions", strings.NewReader(payload))
  if err != nil { log.Fatal(err) }
  req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
  req.Header.Set("Content-Type", "application/json")
  res, err := http.DefaultClient.Do(req)
  if err != nil { log.Fatal(err) }
  defer res.Body.Close()
}</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-python">
      <pre><code class="language-python">import os
import requests

response = requests.post(
    "https://10000router.com/v1/completions",
    headers={
        "Authorization": "Bearer " + os.environ["OPENAI_API_KEY"],
        "Content-Type": "application/json",
    },
    json={
        "model": "gpt-3.5-turbo-instruct",
        "prompt": "Write a short greeting:",
        "max_tokens": 64,
        "temperature": 0.7,
        "stream": False,
    },
)
print(response.json())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-java">
      <pre><code class="language-java">var client = java.net.http.HttpClient.newHttpClient();
var body = "{\"model\":\"gpt-3.5-turbo-instruct\",\"prompt\":\"Write a short greeting:\",\"max_tokens\":64,\"temperature\":0.7,\"stream\":false}";
var request = java.net.http.HttpRequest.newBuilder()
    .uri(java.net.URI.create("https://10000router.com/v1/completions"))
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
    "https://10000router.com/v1/completions",
    new {
        model = "gpt-3.5-turbo-instruct",
        prompt = "Write a short greeting:",
        max_tokens = 64,
        temperature = 0.7,
        stream = false
    });
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="completions-response-status" id="completions-response-status-200" checked>
  <input class="response-status-input" type="radio" name="completions-response-status" id="completions-response-status-400">
  <input class="response-status-input" type="radio" name="completions-response-status" id="completions-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="completions-response-status-200">200 成功</label>
    <label for="completions-response-status-400">400 请求错误</label>
    <label for="completions-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  &quot;id&quot;: &quot;cmpl-abc123&quot;,
  &quot;object&quot;: &quot;text_completion&quot;,
  &quot;created&quot;: 1710000000,
  &quot;model&quot;: &quot;gpt-3.5-turbo-instruct&quot;,
  &quot;choices&quot;: [
    {
      &quot;text&quot;: &quot;Hello! How can I help you today?&quot;,
      &quot;index&quot;: 0,
      &quot;finish_reason&quot;: &quot;stop&quot;
    }
  ],
  &quot;usage&quot;: {
    &quot;prompt_tokens&quot;: 6,
    &quot;completion_tokens&quot;: 8,
    &quot;total_tokens&quot;: 14
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  &quot;error&quot;: {
    &quot;message&quot;: &quot;Missing required parameter: prompt&quot;,
    &quot;type&quot;: &quot;invalid_request_error&quot;,
    &quot;param&quot;: &quot;prompt&quot;,
    &quot;code&quot;: null
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-429">
      <pre><code class="language-json">{
  &quot;error&quot;: {
    &quot;message&quot;: &quot;Rate limit reached for completions&quot;,
    &quot;type&quot;: &quot;rate_limit_exceeded&quot;,
    &quot;param&quot;: null,
    &quot;code&quot;: null
  }
}</code></pre>
    </div>
  </div>
</div>

### 返回字段参数

响应字段按对象层级拆分为可折叠区块，默认展开；可收起暂时不关注的对象，减少长响应的视觉干扰。

<details class="response-field-details" open>
<summary>顶层字段（6 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>id</code></td><td>string</td><td>本次文本补全请求的唯一标识。</td></tr>
    <tr><td><code>object</code></td><td>string</td><td>对象类型，非流式响应通常为 <code>text_completion</code>。</td></tr>
    <tr><td><code>created</code></td><td>integer</td><td>响应创建时间，Unix 时间戳（秒）。</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>实际生成响应的模型 ID。</td></tr>
    <tr><td><code>choices</code></td><td>array&lt;object&gt;</td><td>模型生成的候选结果；数量由请求参数 <code>n</code> 和提示词数组长度共同决定。</td></tr>
    <tr><td><code>usage</code></td><td>object</td><td>输入、输出及总 token 用量。部分网关可能省略此字段。</td></tr>
  </tbody>
</table>
</div>

<details class="response-field-details" open>
<summary><code>choices[]</code> 字段（3 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>text</code></td><td>string</td><td>模型生成的补全文本；当 <code>echo=true</code> 时包含输入提示词。</td></tr>
    <tr><td><code>index</code></td><td>integer</td><td>候选结果在 <code>choices</code> 数组中的索引。</td></tr>
    <tr><td><code>finish_reason</code></td><td>string / null</td><td>生成结束原因，例如 <code>stop</code>、<code>length</code> 或 <code>content_filter</code>；生成尚未结束时可能为 <code>null</code>。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="response-field-details" open>
<summary><code>usage</code> 字段（5 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>prompt_tokens</code></td><td>integer</td><td>输入提示词使用的 token 数。</td></tr>
    <tr><td><code>completion_tokens</code></td><td>integer</td><td>生成补全文本使用的 token 数。</td></tr>
    <tr><td><code>total_tokens</code></td><td>integer</td><td><code>prompt_tokens</code> 与 <code>completion_tokens</code> 的总和。</td></tr>
    <tr><td><code>prompt_tokens_details</code></td><td>object</td><td>输入 token 的细分统计；部分网关可能不返回。</td></tr>
    <tr><td><code>completion_tokens_details</code></td><td>object</td><td>输出 token 的细分统计；部分网关可能不返回。</td></tr>
  </tbody>
</table>
</div>

<details class="response-field-details response-field-details-nested" open>
<summary><code>prompt_tokens_details</code> 字段（4 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>cached_tokens</code></td><td>integer</td><td>命中提示词缓存的 token 数。</td></tr>
    <tr><td><code>text_tokens</code></td><td>integer</td><td>文本输入 token 数。</td></tr>
    <tr><td><code>audio_tokens</code></td><td>integer</td><td>音频输入 token 数（支持音频的模型）。</td></tr>
    <tr><td><code>image_tokens</code></td><td>integer</td><td>图像输入 token 数（支持图像的模型）。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="response-field-details response-field-details-nested" open>
<summary><code>completion_tokens_details</code> 字段（3 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>text_tokens</code></td><td>integer</td><td>文本输出 token 数。</td></tr>
    <tr><td><code>audio_tokens</code></td><td>integer</td><td>音频输出 token 数（支持音频的模型）。</td></tr>
    <tr><td><code>reasoning_tokens</code></td><td>integer</td><td>推理过程使用的 token 数（支持推理的模型）。</td></tr>
  </tbody>
</table>
</div>
</details>
</details>
</details>

### 流式响应

当请求设置 `stream=true` 时，响应的 `Content-Type` 为 `text/event-stream`，每个事件包含一个增量补全对象。客户端应按顺序拼接 `choices[].text`，并在收到 `data: [DONE]` 后结束读取：

```text
data: {"id":"cmpl-abc123","object":"text_completion","created":1710000000,"model":"gpt-3.5-turbo-instruct","choices":[{"text":"Hello","index":0,"finish_reason":null}]}

data: {"id":"cmpl-abc123","object":"text_completion","created":1710000000,"model":"gpt-3.5-turbo-instruct","choices":[{"text":"! How can I help?","index":0,"finish_reason":"stop"}]}

data: [DONE]
```

流式响应中的每个 `choices` 元素只包含当前增量文本；`usage` 通常在非流式响应中返回。客户端应处理网络中断并在完成读取后释放连接。
