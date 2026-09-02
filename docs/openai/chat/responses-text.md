# Responses 格式

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/responses</code>
</div>

根据输入创建模型响应。NewAPI 当前按 Responses 文档支持流式和非流式请求，并兼容 OpenAI Responses API。

## 请求参数

### 请求头

<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

请求体必须使用 `application/json`。下表为 NewAPI 文档当前列出的字段；字段是否对具体模型生效仍取决于上游渠道。

<details class="request-field-details" open>
<summary>请求体字段（12 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>是</td><td>模型 ID。</td></tr>
    <tr><td><code>input</code></td><td>string / array</td><td>否</td><td>输入内容，可以是字符串或消息数组。未提供时由上游返回参数错误。</td></tr>
    <tr><td><code>instructions</code></td><td>string</td><td>否</td><td>应用于本次请求的系统级指令。</td></tr>
    <tr><td><code>max_output_tokens</code></td><td>integer</td><td>否</td><td>限制最大输出 token 数。</td></tr>
    <tr><td><code>temperature</code></td><td>number</td><td>否</td><td>采样温度；是否支持取决于模型。</td></tr>
    <tr><td><code>top_p</code></td><td>number</td><td>否</td><td>核采样参数；通常与 <code>temperature</code> 二选一。</td></tr>
    <tr><td><code>stream</code></td><td>boolean</td><td>否</td><td>是否以 SSE 事件流返回结果，默认 <code>false</code>。</td></tr>
    <tr><td><code>tools</code></td><td>array</td><td>否</td><td>模型可以调用的工具。</td></tr>
    <tr><td><code>tool_choice</code></td><td>string / object</td><td>否</td><td>工具选择策略。</td></tr>
    <tr><td><code>reasoning</code></td><td>object</td><td>否</td><td>推理配置，例如 <code>{ "effort": "low" }</code>；仅适用于支持推理的模型。</td></tr>
    <tr><td><code>previous_response_id</code></td><td>string</td><td>否</td><td>关联上一轮响应 ID，用于多轮对话。</td></tr>
    <tr><td><code>truncation</code></td><td>string</td><td>否</td><td>上下文超限时的处理方式：<code>auto</code> 或 <code>disabled</code>。</td></tr>
  </tbody>
</table>
</div>
</details>

> `input` 在 OpenAPI 文档中标记为可选，但创建响应时通常仍应提供输入内容；`model` 是唯一标记为必填的字段。

## 请求示例

### JSON 请求体

```json
{
  "model": "gpt-5.6-sol",
  "instructions": "你是一个简洁的助手。",
  "input": "用一句话介绍 Responses API。",
  "max_output_tokens": 256,
  "stream": false
}
```

### 请求示例代码

<div class="request-examples" role="group" aria-label="Responses 请求示例">
  <input class="request-example-input" type="radio" name="responses-example-language" id="responses-example-curl" checked>
  <input class="request-example-input" type="radio" name="responses-example-language" id="responses-example-javascript">
  <input class="request-example-input" type="radio" name="responses-example-language" id="responses-example-go">
  <input class="request-example-input" type="radio" name="responses-example-language" id="responses-example-python">
  <input class="request-example-input" type="radio" name="responses-example-language" id="responses-example-java">
  <input class="request-example-input" type="radio" name="responses-example-language" id="responses-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="responses-example-curl">cURL</label>
    <label for="responses-example-javascript">JavaScript</label>
    <label for="responses-example-go">Go</label>
    <label for="responses-example-python">Python</label>
    <label for="responses-example-java">Java</label>
    <label for="responses-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.6-sol",
    "input": "用一句话介绍 Responses API。",
    "max_output_tokens": 256
  }'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">

<pre><code class="language-javascript">const payload = {
  model: "gpt-5.6-sol",
  input: "用一句话介绍 Responses API。",
  max_output_tokens: 256
};

const response = await fetch("https://10000router.com/v1/responses", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});

const data = await response.json();
console.log(data.output_text ?? data.output);
</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-go">
      <pre><code class="language-go">payload := strings.NewReader(`{
  "model": "gpt-5.6-sol",
  "input": "用一句话介绍 Responses API。",
  "max_output_tokens": 256
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
    "model": "gpt-5.6-sol",
    "input": "用一句话介绍 Responses API。",
    "max_output_tokens": 256,
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
    + "\"model\":\"gpt-5.6-sol\","
    + "\"input\":\"用一句话介绍 Responses API。\","
    + "\"max_output_tokens\":256}";
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
    model = "gpt-5.6-sol",
    input = "用一句话介绍 Responses API。",
    max_output_tokens = 256
};
var response = await client.PostAsJsonAsync(
    "https://10000router.com/v1/responses",
    payload
);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 非流式响应（200）

NewAPI 透传上游的 `response` 对象。不同模型的 `output` 项类型可能不同，读取文本时优先使用 SDK 提供的 `output_text`，或遍历 `output` 中的文本内容块。

```json
{
  "id": "resp_abc123",
  "object": "response",
  "created_at": 1710000000,
  "status": "completed",
  "model": "gpt-5.6-sol",
  "output": [
    {
      "id": "msg_abc123",
      "type": "message",
      "status": "completed",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Responses API 使用统一的输入和输出项。",
          "annotations": []
        }
      ]
    }
  ],
  "usage": {
    "input_tokens": 18,
    "output_tokens": 12,
    "total_tokens": 30
  }
}
```

### 流式响应

将 `stream` 设为 `true` 后，响应类型为 `text/event-stream`。客户端应按事件类型处理 `data`，并按顺序拼接文本增量：

```text
event: response.created
data: {"type":"response.created","response":{"id":"resp_abc123","status":"in_progress"}}

event: response.output_text.delta
data: {"type":"response.output_text.delta","delta":"Responses API"}

event: response.completed
data: {"type":"response.completed","response":{"id":"resp_abc123","status":"completed"}}
```

工具调用或推理模型可能发送其他 `response.*` 事件；未知事件应安全忽略。若网关发送 `data: [DONE]`，表示事件流结束。

### 错误响应

```json
{
  "error": {
    "message": "Missing required parameter: model",
    "type": "invalid_request_error",
    "param": "model",
    "code": null
  }
}
```

常见状态码包括 `400`（请求参数错误）、`401`（认证失败）、`429`（请求频率限制）和 `5xx`（上游服务错误）。
