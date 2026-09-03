# Gemini 文本聊天

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1beta/models/{model}:generateContent</code>
</div>

代理 Gemini API 请求。普通请求使用 `/v1beta/models/{model_name}:generateContent`，流式请求使用 `/v1beta/models/{model_name}:streamGenerateContent?alt=sse`。

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
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

<details class="parameter-details" open>
<summary>Content-Type</summary>
<div class="parameter-details__content"><p>请求体为 JSON 时请发送 <code>Content-Type: application/json</code>。</p></div>
</details>
</div>

### 请求体

<details class="request-field-details" open>
<summary>顶层字段（5 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>contents</code></td><td>array</td><td>按时间顺序排列的消息。每项包含 <code>role</code>（<code>user</code> 或 <code>model</code>）和 <code>parts</code>。</td><td>否</td></tr>
    <tr><td><code>generationConfig</code></td><td>object</td><td>生成控制参数，如温度、Top-P 和最大输出 token 数。</td><td>否</td></tr>
    <tr><td><code>safetySettings</code></td><td>array</td><td>按安全类别覆盖默认安全阈值。</td><td>否</td></tr>
    <tr><td><code>tools</code></td><td>array</td><td>声明模型可调用的工具；可用形式由模型决定。</td><td>否</td></tr>
    <tr><td><code>systemInstruction</code></td><td>object</td><td>系统级指令，通常包含 <code>parts</code> 数组。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

<p>网关会把空请求转发给上游，但实际模型通常要求至少一条 <code>contents</code> 消息。</p>

<details class="request-field-details" open>
<summary><code>contents[]</code> 与生成参数</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>contents[].role</code></td><td>string</td><td><code>user</code> 表示用户输入，<code>model</code> 表示历史模型输出。</td><td>否</td></tr>
    <tr><td><code>contents[].parts</code></td><td>array</td><td>内容片段数组。文本片段使用 <code>{ "text": "..." }</code>；媒体片段请参阅[媒体识别](../media/README.md)。</td><td>条件</td></tr>
    <tr><td><code>generationConfig.temperature</code></td><td>number</td><td>采样温度，取值范围和默认值由模型决定。</td><td>否</td></tr>
    <tr><td><code>generationConfig.topP</code></td><td>number</td><td>核采样阈值。</td><td>否</td></tr>
    <tr><td><code>generationConfig.topK</code></td><td>integer</td><td>候选 token 数量。</td><td>否</td></tr>
    <tr><td><code>generationConfig.maxOutputTokens</code></td><td>integer</td><td>限制本次响应最多生成的 token 数。</td><td>否</td></tr>
    <tr><td><code>generationConfig.stopSequences</code></td><td>array&lt;string&gt;</td><td>命中任一序列后停止生成。</td><td>否</td></tr>
    <tr><td><code>safetySettings[].category</code></td><td>string</td><td>安全类别，例如 <code>HARM_CATEGORY_HARASSMENT</code>。</td><td>条件</td></tr>
    <tr><td><code>safetySettings[].threshold</code></td><td>string</td><td>该类别的拦截阈值，例如 <code>BLOCK_MEDIUM_AND_ABOVE</code>。</td><td>条件</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "用三句话介绍新加坡。" }]
    }
  ],
  "generationConfig": {
    "temperature": 0.7,
    "topP": 0.95,
    "maxOutputTokens": 256
  },
  "systemInstruction": {
    "parts": [{ "text": "回答要简洁、准确。" }]
  }
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="gemini-text-example-language" id="gemini-text-example-curl" checked>
  <input class="request-example-input" type="radio" name="gemini-text-example-language" id="gemini-text-example-javascript">
  <input class="request-example-input" type="radio" name="gemini-text-example-language" id="gemini-text-example-go">
  <input class="request-example-input" type="radio" name="gemini-text-example-language" id="gemini-text-example-python">
  <input class="request-example-input" type="radio" name="gemini-text-example-language" id="gemini-text-example-java">
  <input class="request-example-input" type="radio" name="gemini-text-example-language" id="gemini-text-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="gemini-text-example-curl">cURL</label><label for="gemini-text-example-javascript">JavaScript</label><label for="gemini-text-example-go">Go</label><label for="gemini-text-example-python">Python</label><label for="gemini-text-example-java">Java</label><label for="gemini-text-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl"><pre><code class="language-bash">curl -X POST "https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent" \
  -H "Authorization: Bearer $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"role":"user","parts":[{"text":"用三句话介绍新加坡。"}]}],"generationConfig":{"maxOutputTokens":256}}'</code></pre></div>
    <div class="request-example-panel request-example-panel-javascript"><pre><code class="language-javascript">const payload = {
  contents: [{ role: "user", parts: [{ text: "用三句话介绍新加坡。" }] }],
  generationConfig: { maxOutputTokens: 256 }
};
const response = await fetch("https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent", {
  method: "POST",
  headers: { Authorization: "Bearer " + process.env.GEMINI_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
console.log(await response.json());</code></pre></div>
    <div class="request-example-panel request-example-panel-go"><pre><code class="language-go">payload := `{"contents":[{"role":"user","parts":[{"text":"用三句话介绍新加坡。"}]}],"generationConfig":{"maxOutputTokens":256}}`
req, _ := http.NewRequest("POST", "https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent", strings.NewReader(payload))
req.Header.Set("Authorization", "Bearer "+os.Getenv("GEMINI_API_KEY"))
req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req)
if err != nil { log.Fatal(err) }
defer res.Body.Close()</code></pre></div>
    <div class="request-example-panel request-example-panel-python"><pre><code class="language-python">import os
import requests

payload = {"contents": [{"role": "user", "parts": [{"text": "用三句话介绍新加坡。"}]}], "generationConfig": {"maxOutputTokens": 256}}
response = requests.post(
    "https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent",
    headers={"Authorization": "Bearer " + os.environ["GEMINI_API_KEY"], "Content-Type": "application/json"},
    json=payload,
)
print(response.json())</code></pre></div>
    <div class="request-example-panel request-example-panel-java"><pre><code class="language-java">var client = java.net.http.HttpClient.newHttpClient();
var payload = "{\"contents\":[{\"role\":\"user\",\"parts\":[{\"text\":\"用三句话介绍新加坡。\"}]}],\"generationConfig\":{\"maxOutputTokens\":256}}";
var request = java.net.http.HttpRequest.newBuilder()
    .uri(java.net.URI.create("https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent"))
    .header("Authorization", "Bearer " + System.getenv("GEMINI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload)).build();
var response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre></div>
    <div class="request-example-panel request-example-panel-csharp"><pre><code class="language-csharp">using System.Net.Http.Json;
using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("GEMINI_API_KEY"));
var payload = new { contents = new[] { new { role = "user", parts = new[] { new { text = "用三句话介绍新加坡。" } } } }, generationConfig = new { maxOutputTokens = 256 } };
var response = await client.PostAsJsonAsync("https://10000router.com/v1beta/models/gemini-2.5-pro:generateContent", payload);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre></div>
  </div>
</div>

## 返回响应

### 响应示例

```json
{
  "candidates": [{
    "content": { "role": "model", "parts": [{ "text": "新加坡是一个现代化城市国家。" }] },
    "finishReason": "STOP",
    "safetyRatings": []
  }],
  "usageMetadata": {
    "promptTokenCount": 12,
    "candidatesTokenCount": 18,
    "totalTokenCount": 30
  }
}
```

### 返回字段

<details class="response-field-details" open>
<summary>顶层字段（2 个）</summary>
<div class="response-field-details__content">
<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody>
<tr><td><code>candidates</code></td><td>array</td><td>模型生成的候选结果。</td></tr>
<tr><td><code>usageMetadata</code></td><td>object</td><td>输入、输出和总 token 数。</td></tr>
</tbody></table>
</div>
<details class="response-field-details response-field-details-nested" open><summary><code>candidates[]</code></summary><div class="response-field-details__content">
<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody>
<tr><td><code>content.role</code></td><td>string</td><td>通常为 <code>model</code>。</td></tr>
<tr><td><code>content.parts</code></td><td>array</td><td>响应内容片段，文本位于 <code>parts[].text</code>。</td></tr>
<tr><td><code>finishReason</code></td><td>string</td><td>生成结束原因，例如 <code>STOP</code>、<code>MAX_TOKENS</code> 或安全拦截原因。</td></tr>
<tr><td><code>safetyRatings</code></td><td>array</td><td>安全分类和概率评估。</td></tr>
</tbody></table></div></details>
<details class="response-field-details response-field-details-nested" open><summary><code>usageMetadata</code></summary><div class="response-field-details__content">
<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody>
<tr><td><code>promptTokenCount</code></td><td>integer</td><td>输入 token 数。</td></tr><tr><td><code>candidatesTokenCount</code></td><td>integer</td><td>候选输出 token 数。</td></tr><tr><td><code>totalTokenCount</code></td><td>integer</td><td>输入与输出 token 总数。</td></tr>
</tbody></table></div></details>
</details>

### 流式响应

将路径中的动作替换为 `:streamGenerateContent` 并附加 `?alt=sse`：

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1beta/models/{model}:streamGenerateContent?alt=sse</code>
</div>

流式请求返回 `text/event-stream`。每个 `data` 事件包含一个 Gemini 响应片段；客户端应按顺序拼接 `candidates[].content.parts[].text`，直到收到 `finishReason`。与 OpenAI SSE 不同，Gemini 流通常不发送 `[DONE]` 标记。

```text
data: {"candidates":[{"content":{"role":"model","parts":[{"text":"新加坡"}]},"finishReason":""}]}

data: {"candidates":[{"content":{"parts":[{"text":"是一个城市国家。"}]},"finishReason":"STOP"}]}
```
