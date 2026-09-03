# 原生 Claude API

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/messages</code>
</div>

Anthropic Claude Messages API 格式的请求，使用 JSON 请求体创建消息。请求必须包含 `anthropic-version`，并使用 `Authorization` `Bearer` Token 或 `x-api-key` 其中一种方式认证；可用字段和具体能力取决于目标模型及上游渠道。

## 请求参数

### 请求头

<div class="parameter-details-group">
<details class="parameter-details" open>
<summary>Authorization [可选]</summary>

<div class="parameter-details__content">
<p>使用网关 API Key 的 Bearer Token 认证。与 <code>x-api-key</code> 二选一。<br>
格式：<code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

<details class="parameter-details" open>
<summary>x-api-key [可选]</summary>

<div class="parameter-details__content">
<p>Anthropic 兼容认证请求头。使用此请求头时，可以不发送 <code>Authorization</code>。<br>
格式：<code>x-api-key: sk-ant-xxxxxx</code></p>
</div>
</details>

<details class="parameter-details" open>
<summary>anthropic-version</summary>

<div class="parameter-details__content">
<p>Anthropic API 版本，必填。当前示例使用 <code>2023-06-01</code>。<br>
格式：<code>anthropic-version: 2023-06-01</code></p>
</div>
</details>

<details class="parameter-details" open>
<summary>Content-Type</summary>
<div class="parameter-details__content">
<p>请求体为 JSON 时必须发送 <code>Content-Type: application/json</code>。</p>
</div>
</details>
</div>

下表列出网关当前支持的请求字段；字段是否生效仍取决于目标模型和上游渠道。

### 请求体

<details class="request-field-details" open>
<summary>顶层字段（13 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>目标模型 ID。请使用当前账号可用的模型。</td><td>是</td></tr>
    <tr><td><code>messages</code></td><td>array</td><td>按时间顺序排列的对话消息。每条消息包含 <code>role</code> 和 <code>content</code>。</td><td>是</td></tr>
    <tr><td><code>system</code></td><td>string / array</td><td>系统提示词或系统内容块。</td><td>否</td></tr>
    <tr><td><code>max_tokens</code></td><td>integer</td><td>本次响应允许生成的最大 token 数，最小值为 <code>1</code>。</td><td>是</td></tr>
    <tr><td><code>temperature</code></td><td>number</td><td>采样温度，范围为 <code>0</code> 到 <code>1</code>。</td><td>否</td></tr>
    <tr><td><code>top_p</code></td><td>number</td><td>核采样参数。通常只调整 <code>temperature</code> 或 <code>top_p</code> 其中一个。</td><td>否</td></tr>
    <tr><td><code>top_k</code></td><td>integer</td><td>限制每一步采样时考虑的候选 token 数量。</td><td>否</td></tr>
    <tr><td><code>stream</code></td><td>boolean</td><td>是否使用 SSE 流式返回；未设置时默认非流式（<code>false</code>）。</td><td>否</td></tr>
    <tr><td><code>stop_sequences</code></td><td>array&lt;string&gt;</td><td>命中任一停止序列后结束生成。</td><td>否</td></tr>
    <tr><td><code>tools</code></td><td>array</td><td>声明 Claude 可以调用的工具。</td><td>否</td></tr>
    <tr><td><code>tool_choice</code></td><td>object</td><td>控制工具选择策略：<code>auto</code>、<code>any</code> 或指定 <code>tool</code>。</td><td>否</td></tr>
    <tr><td><code>thinking</code></td><td>object</td><td>配置扩展思考；是否支持取决于目标模型。</td><td>否</td></tr>
    <tr><td><code>metadata</code></td><td>object</td><td>请求元数据。当前 schema 列出 <code>user_id</code> 字段。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### 消息与内容块

`messages` 中每项的 `role` 为 `user` 或 `assistant`。`content` 可以是字符串，也可以是内容块数组。

<details class="request-field-details" open>
<summary>消息与内容块字段</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>内容块类型</th><th>主要字段</th><th>用途</th></tr></thead>
  <tbody>
    <tr><td><code>text</code></td><td><code>text</code></td><td>文本输入或输出。</td></tr>
    <tr><td><code>image</code></td><td><code>source</code></td><td>图像输入，支持 Base64 或 URL。</td></tr>
    <tr><td><code>tool_use</code></td><td><code>id</code>、<code>name</code>、<code>input</code></td><td>Claude 发起工具调用时返回。</td></tr>
    <tr><td><code>tool_result</code></td><td><code>tool_use_id</code>、<code>content</code></td><td>客户端执行工具后回传结果。</td></tr>
  </tbody>
</table>

</div>
</details>

文本消息示例：

```json
{
  "role": "user",
  "content": "介绍一下 prompt caching。"
}
```

多内容块消息示例：

```json
{
  "role": "user",
  "content": [
    { "type": "text", "text": "描述这张图片。" },
    {
      "type": "image",
      "source": {
        "type": "url",
        "url": "https://example.com/image.png"
      }
    }
  ]
}
```

Base64 图像将 `source.type` 设为 `base64`，并同时提供 `media_type` 与 Base64 编码的 `data`：

```json
{
  "type": "image",
  "source": {
    "type": "base64",
    "media_type": "image/png",
    "data": "iVBORw0KGgoAAAANSUhEUg..."
  }
}
```

### 工具调用

工具定义至少包含 `name` 和 `input_schema`，可选 `description`。`input_schema` 使用 JSON Schema 描述工具参数。

```json
{
  "tools": [
    {
      "name": "get_weather",
      "description": "查询指定城市的天气",
      "input_schema": {
        "type": "object",
        "properties": {
          "city": { "type": "string", "description": "城市名称" }
        },
        "required": ["city"]
      }
    }
  ],
  "tool_choice": { "type": "auto" }
}
```

Claude 返回 `stop_reason: "tool_use"` 时，遍历 `content` 找到 `tool_use` 块，在客户端执行对应工具。下一轮请求应保留完整的 assistant 内容，并追加 `tool_result`：

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01ABC",
      "content": "晴，25°C"
    }
  ]
}
```

`tool_choice.type` 可设为：

- `auto`：由 Claude 决定是否调用工具。
- `any`：要求 Claude 调用任一工具。
- `tool`：通过 `name` 指定工具。

### 扩展思考

根据目标模型支持情况，可以使用 `thinking` 配置扩展思考：

```json
{
  "thinking": {
    "type": "enabled",
    "budget_tokens": 4096
  }
}
```

关闭扩展思考：

```json
{
  "thinking": {
    "type": "disabled"
  }
}
```

`budget_tokens` 必须小于 `max_tokens`，并且扩展思考需要目标模型支持。启用扩展思考后，不要同时发送模型不支持的采样参数。

### 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  &quot;model&quot;: &quot;gpt-5.6-sol&quot;,
  &quot;system&quot;: &quot;你是一个简洁、准确的助手。&quot;,
  &quot;messages&quot;: [
    { &quot;role&quot;: &quot;user&quot;, &quot;content&quot;: &quot;用三句话介绍 Claude Messages API。&quot; }
  ],
  &quot;max_tokens&quot;: 256,
  &quot;temperature&quot;: 0.7,
  &quot;stream&quot;: false
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="Claude Messages 请求示例">
  <input class="request-example-input" type="radio" name="claude-example-language" id="claude-example-curl" checked>
  <input class="request-example-input" type="radio" name="claude-example-language" id="claude-example-javascript">
  <input class="request-example-input" type="radio" name="claude-example-language" id="claude-example-go">
  <input class="request-example-input" type="radio" name="claude-example-language" id="claude-example-python">
  <input class="request-example-input" type="radio" name="claude-example-language" id="claude-example-java">
  <input class="request-example-input" type="radio" name="claude-example-language" id="claude-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="claude-example-curl">cURL</label>
    <label for="claude-example-javascript">JavaScript</label>
    <label for="claude-example-go">Go</label>
    <label for="claude-example-python">Python</label>
    <label for="claude-example-java">Java</label>
    <label for="claude-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/messages" \
  -H "Authorization: Bearer $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.6-sol",
    "max_tokens": 256,
    "messages": [
      {"role": "user", "content": "用三句话介绍 Claude Messages API。"}
    ]
  }'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const payload = {
  model: "gpt-5.6-sol",
  max_tokens: 256,
  messages: [
    { role: "user", content: "用三句话介绍 Claude Messages API。" }
  ]
};

const response = await fetch("https://10000router.com/v1/messages", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});

if (!response.ok) throw new Error(await response.text());
console.log(await response.json());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-go">
      <pre><code class="language-go">payload := strings.NewReader(`{
  "model": "gpt-5.6-sol",
  "max_tokens": 256,
  "messages": [
    {"role": "user", "content": "用三句话介绍 Claude Messages API。"}
  ]
}`)
req, err := http.NewRequest("POST", "https://10000router.com/v1/messages", payload)
if err != nil {
  log.Fatal(err)
}
req.Header.Set("Authorization", "Bearer "+os.Getenv("ANTHROPIC_API_KEY"))
req.Header.Set("anthropic-version", "2023-06-01")
req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req)
if err != nil {
  log.Fatal(err)
}
defer res.Body.Close()
if res.StatusCode >= 400 {
  log.Fatal(res.Status)
}
io.Copy(os.Stdout, res.Body)</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-python">
      <pre><code class="language-python">import os
import requests

payload = {
    "model": "gpt-5.6-sol",
    "max_tokens": 256,
    "messages": [
        {"role": "user", "content": "用三句话介绍 Claude Messages API。"}
    ],
}

response = requests.post(
    "https://10000router.com/v1/messages",
    headers={
        "Authorization": "Bearer " + os.environ["ANTHROPIC_API_KEY"],
        "anthropic-version": "2023-06-01",
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
    + "\"max_tokens\":256,"
    + "\"messages\":[{\"role\":\"user\","
    + "\"content\":\"用三句话介绍 Claude Messages API。\"}]}";
var request = java.net.http.HttpRequest.newBuilder()
    .uri(java.net.URI.create("https://10000router.com/v1/messages"))
    .header("Authorization", "Bearer " + System.getenv("ANTHROPIC_API_KEY"))
    .header("anthropic-version", "2023-06-01")
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload))
    .build();
var response = client.send(
    request,
    java.net.http.HttpResponse.BodyHandlers.ofString()
);
if (response.statusCode() >= 400) {
    throw new IllegalStateException(response.body());
}
System.out.println(response.body());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-csharp">
      <pre><code class="language-csharp">using System.Net.Http.Json;

using var client = new HttpClient();
client.DefaultRequestHeaders.TryAddWithoutValidation(
    "Authorization",
    "Bearer " + Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
);
client.DefaultRequestHeaders.Add("anthropic-version", "2023-06-01");

var payload = new
{
    model = "gpt-5.6-sol",
    max_tokens = 256,
    messages = new[]
    {
        new { role = "user", content = "用三句话介绍 Claude Messages API。" }
    }
};

var response = await client.PostAsJsonAsync(
    "https://10000router.com/v1/messages",
    payload
);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="claude-response-status" id="claude-response-status-200" checked>
  <input class="response-status-input" type="radio" name="claude-response-status" id="claude-response-status-400">
  <input class="response-status-input" type="radio" name="claude-response-status" id="claude-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="claude-response-status-200">200 成功</label>
    <label for="claude-response-status-400">400 请求错误</label>
    <label for="claude-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <p>成功请求返回 <code>type: "message"</code> 的消息对象。文本内容位于 <code>content</code> 数组中的 <code>text</code> 内容块；不要假定 <code>content[0]</code> 永远是文本块，使用工具或扩展思考时可能包含其他类型。</p>
      <pre><code class="language-json">{
  "id": "msg_01ABC123",
  "type": "message",
  "role": "assistant",
  "model": "gpt-5.6-sol",
  "content": [
    {
      "type": "text",
      "text": "Claude Messages API 用统一消息结构完成多轮对话。"
    }
  ],
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 18,
    "output_tokens": 16
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "messages: Field required"
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-429">
      <pre><code class="language-json">{
  "type": "error",
  "error": {
    "type": "rate_limit_error",
    "message": "Request rate limit exceeded"
  }
}</code></pre>
    </div>
  </div>
</div>

### 非流式响应（200）

成功响应字段如下：

```json
{
  "id": "msg_01ABC123",
  "type": "message",
  "role": "assistant",
  "model": "gpt-5.6-sol",
  "content": [
    {
      "type": "text",
      "text": "Claude Messages API 用统一消息结构完成多轮对话。"
    }
  ],
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 18,
    "output_tokens": 16
  }
}
```

### 响应字段

<details class="response-field-details" open>
<summary>顶层字段（7 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>id</code></td><td>string</td><td>本次消息的唯一标识。</td></tr>
    <tr><td><code>type</code></td><td>string</td><td>响应对象类型，通常为 <code>message</code>。</td></tr>
    <tr><td><code>role</code></td><td>string</td><td>响应角色，通常为 <code>assistant</code>。</td></tr>
    <tr><td><code>content</code></td><td>array</td><td>响应内容块数组，文本位于 <code>content[].text</code>。</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>实际生成响应的模型 ID。</td></tr>
    <tr><td><code>stop_reason</code></td><td>string</td><td>生成结束原因：<code>end_turn</code>、<code>max_tokens</code>、<code>stop_sequence</code> 或 <code>tool_use</code>。</td></tr>
    <tr><td><code>usage</code></td><td>object</td><td>本次请求的输入和输出 token 用量。</td></tr>
  </tbody>
</table>
</div>

<details class="response-field-details response-field-details-nested" open>
<summary><code>content[]</code> 内容块</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>type</code></td><td>string</td><td>内容块类型，例如 <code>text</code> 或 <code>tool_use</code>。</td></tr>
    <tr><td><code>text</code></td><td>string</td><td><code>type</code> 为 <code>text</code> 时的文本内容。</td></tr>
    <tr><td><code>id</code></td><td>string</td><td><code>tool_use</code> 内容块的调用 ID。</td></tr>
    <tr><td><code>name</code></td><td>string</td><td><code>tool_use</code> 内容块调用的工具名称。</td></tr>
    <tr><td><code>input</code></td><td>object</td><td>传给工具的参数对象。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="response-field-details response-field-details-nested" open>
<summary><code>usage</code></summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>input_tokens</code></td><td>integer</td><td>输入 token 数。</td></tr>
    <tr><td><code>output_tokens</code></td><td>integer</td><td>输出 token 数。</td></tr>
    <tr><td><code>cache_creation_input_tokens</code></td><td>integer</td><td>创建提示缓存时的输入 token 数；上游未返回时可能不存在。</td></tr>
    <tr><td><code>cache_read_input_tokens</code></td><td>integer</td><td>从提示缓存读取的输入 token 数；上游未返回时可能不存在。</td></tr>
  </tbody>
</table>
</div>
</details>
</details>

### 流式响应

将 `stream` 设为 `true` 后，响应类型为 `text/event-stream`。Claude 使用多个 SSE 事件传递一条消息，客户端应按事件顺序拼接 `content_block_delta` 中的文本增量。

```text
event: message_start
data: {"type":"message_start","message":{"id":"msg_01ABC123","type":"message","role":"assistant","content":[],"model":"gpt-5.6-sol","stop_reason":null}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Claude Messages"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" API"}}

event: content_block_stop
data: {"type":"content_block_stop","index":0}

event: message_delta
data: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":16}}

event: message_stop
data: {"type":"message_stop"}
```

- `message_start`：消息开始，包含消息 ID 和模型信息。
- `content_block_delta`：内容增量。文本增量位于 `delta.text`。
- `message_delta`：消息结束前的状态和用量更新。
- `message_stop`：事件流结束。

工具调用、扩展思考和上游能力可能产生其他事件。客户端应根据 `event` 或 `data.type` 分支处理，并安全忽略无法识别的事件；不要把完整 JSON 事件直接拼接成文本。

### 错误响应

常见状态码包括 `400`（请求参数错误）、`401`（认证失败）、`429`（请求频率限制）和 `5xx`（上游服务错误）。错误示例见上方状态码标签，响应保持 Anthropic 错误对象结构。

使用 `x-api-key` 时缺少 `anthropic-version`，或请求体缺少 `model`、`messages`、`max_tokens`，通常会收到 `400`。模型不可用、参数不兼容时，也应优先检查模型列表和目标模型能力。
