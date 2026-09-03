
# ChatCompletions格式

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/chat/completions</code>
</div>

根据对话历史创建模型响应。支持流式和非流式响应，兼容 OpenAI Chat Completions API。

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
<div class="parameter-details__content"><p>请求体为 JSON 时请同时发送 <code>Content-Type: application/json</code></p></div>
</details>
</div>

以下参数遵循 OpenAI Chat Completions 请求格式。参数是否可用取决于所选模型和兼容网关；网关不支持的字段会返回 `400`。

### 请求体

<details class="request-field-details" open>
<summary>请求体参数（21 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>—</td><td>要调用的模型 ID。</td><td>是</td></tr>
    <tr><td><code>messages</code></td><td>array</td><td>—</td><td>对话消息数组，按时间顺序传入。每条消息至少包含 <code>role</code> 和 <code>content</code>；常见角色包括 <code>system</code>、<code>user</code>、<code>assistant</code> 和 <code>tool</code>。</td><td>是</td></tr>
    <tr><td><code>temperature</code></td><td>number</td><td>1</td><td>采样温度，范围 <code>0</code> 到 <code>2</code>。是否支持取决于模型。</td><td>否</td></tr>
    <tr><td><code>top_p</code></td><td>number</td><td>1</td><td>核采样参数，范围 <code>0</code> 到 <code>1</code>。一般只调整 <code>temperature</code> 或 <code>top_p</code> 其中一个。</td><td>否</td></tr>
    <tr><td><code>max_completion_tokens</code></td><td>integer</td><td>模型上限</td><td>限制本次请求生成的最大 token 数。支持推理的模型可能会将推理 token 计入此上限。</td><td>否</td></tr>
    <tr><td><code>max_tokens</code></td><td>integer</td><td>—</td><td>旧版长度限制字段，部分新模型不支持；新请求优先使用 <code>max_completion_tokens</code>。</td><td>否</td></tr>
    <tr><td><code>stop</code></td><td>string / array</td><td>null</td><td>命中停止序列后结束生成。部分模型不支持此参数。</td><td>否</td></tr>
    <tr><td><code>n</code></td><td>integer</td><td>1</td><td>为每个输入生成的候选数量，最小值为 <code>1</code>。大于 <code>1</code> 会按候选数量增加用量。</td><td>否</td></tr>
    <tr><td><code>presence_penalty</code></td><td>number</td><td>0</td><td>根据已有内容惩罚重复主题，通常范围为 <code>-2</code> 到 <code>2</code>。</td><td>否</td></tr>
    <tr><td><code>frequency_penalty</code></td><td>number</td><td>0</td><td>根据出现频率惩罚重复 token，通常范围为 <code>-2</code> 到 <code>2</code>。</td><td>否</td></tr>
    <tr><td><code>logit_bias</code></td><td>object</td><td>null</td><td>以 token ID 为键、数值为值调整生成概率。</td><td>否</td></tr>
    <tr><td><code>seed</code></td><td>integer</td><td>—</td><td>尽量复现结果的随机种子；只在支持的模型上生效，不能保证绝对一致。</td><td>否</td></tr>
    <tr><td><code>response_format</code></td><td>object</td><td>—</td><td>设置输出格式。可使用 <code>{ "type": "text" }</code>、<code>{ "type": "json_object" }</code>，或使用 <code>json_schema</code> 约束 JSON 结构。</td><td>否</td></tr>
    <tr><td><code>modalities</code></td><td>array</td><td><code>["text"]</code></td><td>指定输出模态，可选 <code>text</code> 或 <code>audio</code>。</td><td>否</td></tr>
    <tr><td><code>audio</code></td><td>object</td><td>—</td><td>音频输出配置，包含 <code>voice</code> 和 <code>format</code>；仅适用于支持音频的模型。</td><td>否</td></tr>
    <tr><td><code>reasoning_effort</code></td><td>string</td><td>—</td><td>推理强度，可选 <code>low</code>、<code>medium</code>、<code>high</code>；仅适用于支持推理的模型。</td><td>否</td></tr>
    <tr><td><code>stream</code></td><td>boolean</td><td>false</td><td>设置为 <code>true</code> 时以 SSE 增量事件返回结果。</td><td>否</td></tr>
    <tr><td><code>stream_options</code></td><td>object</td><td>—</td><td>流式选项，例如 <code>{ "include_usage": true }</code> 用于请求最终用量统计。仅在 <code>stream=true</code> 时使用。</td><td>否</td></tr>
    <tr><td><code>tools</code></td><td>array</td><td>—</td><td>声明模型可以调用的工具，目前最常见的是 <code>function</code> 工具。</td><td>否</td></tr>
    <tr><td><code>tool_choice</code></td><td>string / object</td><td>auto</td><td>控制工具调用策略：<code>none</code>、<code>auto</code>、<code>required</code>，或指定某个函数。</td><td>否</td></tr>
    <tr><td><code>user</code></td><td>string</td><td>—</td><td>旧版终端用户标识字段；新项目请根据网关要求使用对应的安全标识字段。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

其中只有 <code>model</code> 和 <code>messages</code> 为必填字段；其余参数均为可选，是否生效取决于所选模型和兼容网关。

### 消息字段

`messages` 是按时间顺序排列的消息数组。网关会保留下列字段并按所选上游适配器进行转换；不同模型对多模态内容和推理字段的支持不同。

<details class="request-field-details" open>
<summary>消息对象与内容块字段（16 个）</summary>

<div class="request-field-details__content">
<table class="message-fields-table">
  <thead><tr><th>字段</th><th>类型</th><th>取值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>messages[].role</code></td><td>string</td><td><code>system</code>、<code>developer</code>、<code>user</code>、<code>assistant</code>、<code>tool</code></td><td>消息角色。</td><td>是</td></tr>
    <tr><td><code>messages[].content</code></td><td>string / array</td><td>文本或内容块数组</td><td>文本，或由 <code>text</code>、<code>image_url</code>、<code>input_audio</code>、<code>file</code>、<code>video_url</code> 组成的内容块数组。助手消息仅包含工具调用时可以省略。</td><td>条件</td></tr>
    <tr><td><code>messages[].name</code></td><td>string</td><td>—</td><td>可选的参与者名称。</td><td>否</td></tr>
    <tr><td><code>messages[].reasoning_content</code></td><td>string</td><td>—</td><td>向兼容推理模型传递的推理内容；请勿在不需要时回传隐藏推理。</td><td>否</td></tr>
    <tr><td><code>messages[].tool_calls</code></td><td>array</td><td>—</td><td>助手消息发起的工具调用。通常与 <code>role: "assistant"</code> 一起回传。</td><td>否</td></tr>
    <tr><td><code>messages[].tool_call_id</code></td><td>string</td><td>—</td><td>工具消息对应的调用 ID，必须与助手消息中的工具调用匹配。</td><td>条件</td></tr>
    <tr><td><code>messages[].content[].type</code></td><td>string</td><td><code>text</code>、<code>image_url</code>、<code>input_audio</code>、<code>file</code>、<code>video_url</code></td><td>内容块类型，用于确定当前内容块的字段结构。</td><td>是</td></tr>
    <tr><td><code>messages[].content[].text</code></td><td>string</td><td>—</td><td>文本内容，仅用于 <code>type: "text"</code>。</td><td>条件</td></tr>
    <tr><td><code>messages[].content[].image_url.url</code></td><td>string</td><td>—</td><td>图片 URL 或 base64 数据，仅用于 <code>type: "image_url"</code>。</td><td>条件</td></tr>
    <tr><td><code>messages[].content[].image_url.detail</code></td><td>string</td><td><code>low</code> / <code>high</code> / <code>auto</code></td><td>图片细节级别，仅用于 <code>type: "image_url"</code>。</td><td>否</td></tr>
    <tr><td><code>messages[].content[].input_audio.data</code></td><td>string</td><td>—</td><td>Base64 编码的音频数据，仅用于 <code>type: "input_audio"</code>。</td><td>条件</td></tr>
    <tr><td><code>messages[].content[].input_audio.format</code></td><td>string</td><td><code>wav</code> / <code>mp3</code></td><td>音频格式，仅用于 <code>type: "input_audio"</code>。</td><td>条件</td></tr>
    <tr><td><code>messages[].content[].file.filename</code></td><td>string</td><td>—</td><td>文件名，仅用于 <code>type: "file"</code>。</td><td>条件</td></tr>
    <tr><td><code>messages[].content[].file.file_data</code></td><td>string</td><td>—</td><td>文件数据，仅用于 <code>type: "file"</code>；通常与 <code>file_id</code> 二选一。</td><td>条件</td></tr>
    <tr><td><code>messages[].content[].file.file_id</code></td><td>string</td><td>—</td><td>已上传文件 ID，仅用于 <code>type: "file"</code>；通常与 <code>file_data</code> 二选一。</td><td>条件</td></tr>
    <tr><td><code>messages[].content[].video_url.url</code></td><td>string</td><td>—</td><td>视频 URL，仅用于 <code>type: "video_url"</code>。</td><td>条件</td></tr>
  </tbody>
</table>
<p>“条件”表示仅在对应消息角色或内容块类型下必填；消息对象中的 <code>role</code> 和每个内容块中的 <code>type</code> 始终必填。</p>
</div>
</details>

内容块示例：

```json
{
  "role": "user",
  "content": [
    { "type": "text", "text": "描述这张图片" },
    { "type": "image_url", "image_url": { "url": "https://example.com/image.png", "detail": "auto" } }
  ]
}
```

### 输出格式与推理

输出格式、音频输出和推理强度参数请参阅上方请求体参数表。

音频输出配置示例：

```json
{
  "modalities": ["text", "audio"],
  "audio": { "voice": "alloy", "format": "wav" }
}
```

### 流式输出

设置 `stream` 为 `true` 后，接口会以 SSE 增量事件返回结果；如需在最终事件中获取用量统计，可同时设置 `stream_options.include_usage`。

### 工具调用

`tools` 和 `tool_choice` 的用途请参阅上方请求体参数表。工具定义使用 `type` 和 `function` 对象。`function` 至少需要 `name`；可选 `description` 和 `parameters`（JSON Schema）。

```json
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "查询指定城市的天气",
        "parameters": {
          "type": "object",
          "properties": { "city": { "type": "string" } },
          "required": ["city"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tools[].type` | string | 工具类型，当前示例为 `function`。 |
| `tools[].function.name` | string | 函数名称。 |
| `tools[].function.description` | string | 函数用途说明。 |
| `tools[].function.parameters` | object | JSON Schema 格式的参数定义。 |
| `tool_choice` | string / object | `none`、`auto`、`required`，或 `{ "type": "function", "function": { "name": "..." } }`。 |

### 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  &quot;model&quot;: &quot;gpt-5.6-sol&quot;,
  &quot;messages&quot;: [
    { &quot;role&quot;: &quot;system&quot;, &quot;content&quot;: &quot;你是一个简洁的助手.&quot; },
    { &quot;role&quot;: &quot;user&quot;, &quot;content&quot;: &quot;介绍一下自己.&quot; }
  ],
  &quot;max_completion_tokens&quot;: 512,
  &quot;response_format&quot;: { &quot;type&quot;: &quot;text&quot; },
  &quot;stream&quot;: false
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="request-example-language" id="request-example-curl" checked>
  <input class="request-example-input" type="radio" name="request-example-language" id="request-example-javascript">
  <input class="request-example-input" type="radio" name="request-example-language" id="request-example-go">
  <input class="request-example-input" type="radio" name="request-example-language" id="request-example-python">
  <input class="request-example-input" type="radio" name="request-example-language" id="request-example-java">
  <input class="request-example-input" type="radio" name="request-example-language" id="request-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="request-example-curl">cURL</label>
    <label for="request-example-javascript">JavaScript</label>
    <label for="request-example-go">Go</label>
    <label for="request-example-python">Python</label>
    <label for="request-example-java">Java</label>
    <label for="request-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/chat/completions" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.6-sol",
    "messages": [
      { "role": "system", "content": "You are a concise assistant." },
      { "role": "user", "content": "Introduce yourself." }
    ],
    "max_completion_tokens": 512,
    "response_format": { "type": "text" },
    "stream": false
  }'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const payload = {
  model: "gpt-5.6-sol",
  messages: [
    { role: "system", content: "You are a concise assistant." },
    { role: "user", content: "Introduce yourself." }
  ],
  max_completion_tokens: 512,
  response_format: { type: "text" },
  stream: false
};

const response = await fetch("https://10000router.com/v1/chat/completions", {
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
      <pre><code class="language-go">payload := `{
  "model": "gpt-5.6-sol",
  "messages": [
    { "role": "system", "content": "You are a concise assistant." },
    { "role": "user", "content": "Introduce yourself." }
  ],
  "max_completion_tokens": 512,
  "response_format": { "type": "text" },
  "stream": false
}`
req, err := http.NewRequest("POST", "https://10000router.com/v1/chat/completions", strings.NewReader(payload))
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
    "messages": [
        {"role": "system", "content": "You are a concise assistant."},
        {"role": "user", "content": "Introduce yourself."}
    ],
    "max_completion_tokens": 512,
    "response_format": {"type": "text"},
    "stream": False
}

response = requests.post(
    "https://10000router.com/v1/chat/completions",
    headers={
        "Authorization": "Bearer " + os.environ["OPENAI_API_KEY"],
        "Content-Type": "application/json"
    },
    json=payload
)
print(response.json())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-java">
      <pre><code class="language-java">var client = java.net.http.HttpClient.newHttpClient();
var payload = "{"
    + "\"model\":\"gpt-5.6-sol\","
    + "\"messages\":["
    + "{\"role\":\"system\",\"content\":\"You are a concise assistant.\"},"
    + "{\"role\":\"user\",\"content\":\"Introduce yourself.\"}"
    + "],\"max_completion_tokens\":512,"
    + "\"response_format\":{\"type\":\"text\"},\"stream\":false}";
var request = java.net.http.HttpRequest.newBuilder()
    .uri(java.net.URI.create("https://10000router.com/v1/chat/completions"))
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
    messages = new[]
    {
        new { role = "system", content = "You are a concise assistant." },
        new { role = "user", content = "Introduce yourself." }
    },
    max_completion_tokens = 512,
    response_format = new { type = "text" },
    stream = false
};

var response = await client.PostAsJsonAsync(
    "https://10000router.com/v1/chat/completions",
    payload
);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>


## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="response-status" id="response-status-200" checked>
  <input class="response-status-input" type="radio" name="response-status" id="response-status-400">
  <input class="response-status-input" type="radio" name="response-status" id="response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="response-status-200">200 成功</label>
    <label for="response-status-400">400 请求错误</label>
    <label for="response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1710000000,
  "model": "gpt-5.6-sol",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "你好！"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 18,
    "completion_tokens": 4,
    "total_tokens": 22
  },
  "system_fingerprint": "fp_example"
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  "error": {
    "message": "Missing required parameter: messages",
    "type": "invalid_request_error",
    "param": "messages",
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

响应字段按对象层级拆分为可折叠区块，默认展开；可收起暂时不关注的对象，减少长响应的视觉干扰。

<details class="response-field-details" open>
<summary>顶层字段（7 个）</summary>

<div class="response-field-details__content">
<table>
  <thead>
    <tr><th>字段</th><th>类型</th><th>说明</th></tr>
  </thead>
  <tbody>
    <tr><td><code>id</code></td><td>string</td><td>本次 Chat Completion 的唯一标识。</td></tr>
    <tr><td><code>object</code></td><td>string</td><td>对象类型，非流式响应通常为 <code>chat.completion</code>。</td></tr>
    <tr><td><code>created</code></td><td>integer</td><td>响应创建时间，Unix 时间戳（秒）。</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>实际生成响应的模型 ID。</td></tr>
    <tr><td><code>choices</code></td><td>array&lt;object&gt;</td><td>模型生成的候选结果；数量由请求参数 <code>n</code> 决定。</td></tr>
    <tr><td><code>usage</code></td><td>object</td><td>Token 用量统计。部分网关或流式中间响应可能不返回此字段。</td></tr>
    <tr><td><code>system_fingerprint</code></td><td>string</td><td>服务端配置或模型版本指纹，可用于排查结果变化；部分模型或网关可能不返回。</td></tr>
  </tbody>
</table>
</div>

<details class="response-field-details" open>
<summary><code>choices[]</code> 字段（4 个）</summary>

<div class="response-field-details__content">
<table>
  <thead>
    <tr><th>字段</th><th>类型</th><th>说明</th></tr>
  </thead>
  <tbody>
    <tr><td><code>index</code></td><td>integer</td><td>候选结果在 <code>choices</code> 数组中的索引。</td></tr>
    <tr><td><code>message</code></td><td>object</td><td>助手消息。通常包含 <code>role: "assistant"</code> 和文本 <code>content</code>；工具调用时还可能包含 <code>tool_calls</code>。</td></tr>
    <tr><td><code>logprobs</code></td><td>object / null</td><td>请求启用 <code>logprobs</code> 时返回的 token 对数概率信息，否则为 <code>null</code>。</td></tr>
    <tr><td><code>finish_reason</code></td><td>string</td><td>生成结束原因：<code>stop</code>、<code>length</code>、<code>tool_calls</code> 或 <code>content_filter</code>。流式中间事件尚未结束时可能为 <code>null</code>。</td></tr>
  </tbody>
</table>
</div>

<details class="response-field-details response-field-details-nested" open>
<summary><code>choices[].message</code> 字段（6 个）</summary>

<div class="response-field-details__content">
<p><code>message</code> 可能包含以下字段：</p>
<table>
  <thead>
    <tr><th>字段</th><th>类型</th><th>说明</th></tr>
  </thead>
  <tbody>
    <tr><td><code>role</code></td><td>string</td><td>消息角色，通常为 <code>assistant</code>。</td></tr>
    <tr><td><code>content</code></td><td>string / array</td><td>文本或内容块数组；当响应仅包含工具调用时可能为空或由网关省略。</td></tr>
    <tr><td><code>name</code></td><td>string</td><td>发送者名称；部分模型响应中会返回。</td></tr>
    <tr><td><code>tool_calls</code></td><td>array&lt;object&gt;</td><td>模型请求调用的工具及其参数。仅在模型选择工具调用时返回。</td></tr>
    <tr><td><code>tool_call_id</code></td><td>string</td><td>工具调用 ID；工具消息用于对应此前的调用。</td></tr>
    <tr><td><code>reasoning_content</code></td><td>string</td><td>支持推理模型时返回的推理内容。</td></tr>
  </tbody>
</table>
</div>

</details>
</details>

<details class="response-field-details" open>
<summary><code>usage</code> 字段（5 个）</summary>

<div class="response-field-details__content">
<table>
  <thead>
    <tr><th>字段</th><th>类型</th><th>说明</th></tr>
  </thead>
  <tbody>
    <tr><td><code>prompt_tokens</code></td><td>integer</td><td>输入消息使用的 token 数。</td></tr>
    <tr><td><code>completion_tokens</code></td><td>integer</td><td>输出内容使用的 token 数。支持推理的模型可能包含推理 token。</td></tr>
    <tr><td><code>total_tokens</code></td><td>integer</td><td><code>prompt_tokens</code> 与 <code>completion_tokens</code> 的总和。</td></tr>
    <tr><td><code>prompt_tokens_details</code></td><td>object</td><td>输入 token 的细分统计，例如缓存 token；按模型和网关返回。</td></tr>
    <tr><td><code>completion_tokens_details</code></td><td>object</td><td>输出 token 的细分统计，例如推理 token；按模型和网关返回。</td></tr>
  </tbody>
</table>
</div>

</details>
</details>

### 流式响应

当请求设置 `stream=true` 时，响应为 Server-Sent Events（SSE），每个事件包含一个 `chat.completion.chunk` 对象，而不是上面的完整对象：

```text
data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1710000000,"model":"gpt-5.6-sol","choices":[{"index":0,"delta":{"role":"assistant","content":"你好"},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1710000000,"model":"gpt-5.6-sol","choices":[{"index":0,"delta":{"content":"！"},"finish_reason":"stop"}]}

data: [DONE]
```

客户端应按顺序拼接 `choices[].delta.content`。如果请求同时设置 `stream_options.include_usage=true`，结束事件前还会返回一个包含 `usage` 的统计块。
