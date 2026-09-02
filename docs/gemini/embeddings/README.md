# Gemini 嵌入

当前仓库的 OpenAPI 定义未提供单独的 Gemini `v1beta` 嵌入端点。Gemini 嵌入模型通过与 OpenAI 兼容的 `/v1/embeddings` 接口调用；请参阅 [OpenAI 嵌入文档](../../openai/embeddings/README.md)。下面列出网关复用的请求和响应字段，便于在 Gemini 模型上使用。

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/embeddings</code>
</div>

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
<div class="parameter-details__content"><p>请求体为 JSON 时请发送 <code>Content-Type: application/json</code>。</p></div>
</details>
</div>

### 请求体

<details class="request-field-details" open>
<summary>嵌入参数（4 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>是</td><td>嵌入模型 ID；请确认该模型在当前账号和渠道可用。</td></tr>
    <tr><td><code>input</code></td><td>string / array&lt;string&gt;</td><td>是</td><td>要转换为向量的单段文本或文本数组。</td></tr>
    <tr><td><code>encoding_format</code></td><td>string</td><td>否</td><td><code>float</code>（默认）返回数字数组；<code>base64</code> 返回 Base64 编码。</td></tr>
    <tr><td><code>dimensions</code></td><td>integer</td><td>否</td><td>请求输出向量维度；仅在模型支持时生效。</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求体示例

```json
{
  "model": "gemini-embedding-001",
  "input": ["Gemini 支持文本嵌入。", "第二段文本"],
  "encoding_format": "float"
}
```

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="gemini-embedding-example-language" id="gemini-embedding-example-curl" checked>
  <input class="request-example-input" type="radio" name="gemini-embedding-example-language" id="gemini-embedding-example-javascript">
  <input class="request-example-input" type="radio" name="gemini-embedding-example-language" id="gemini-embedding-example-go">
  <input class="request-example-input" type="radio" name="gemini-embedding-example-language" id="gemini-embedding-example-python">
  <input class="request-example-input" type="radio" name="gemini-embedding-example-language" id="gemini-embedding-example-java">
  <input class="request-example-input" type="radio" name="gemini-embedding-example-language" id="gemini-embedding-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言"><label for="gemini-embedding-example-curl">cURL</label><label for="gemini-embedding-example-javascript">JavaScript</label><label for="gemini-embedding-example-go">Go</label><label for="gemini-embedding-example-python">Python</label><label for="gemini-embedding-example-java">Java</label><label for="gemini-embedding-example-csharp">C#</label></div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl"><pre><code class="language-bash">curl -X POST "https://10000router.com/v1/embeddings" \
  -H "Authorization: Bearer $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-001","input":"Gemini 支持文本嵌入。"}'</code></pre></div>
    <div class="request-example-panel request-example-panel-javascript"><pre><code class="language-javascript">const payload = { model: "gemini-embedding-001", input: "Gemini 支持文本嵌入。" };
const response = await fetch("https://10000router.com/v1/embeddings", { method: "POST", headers: { Authorization: "Bearer " + process.env.GEMINI_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
console.log(await response.json());</code></pre></div>
    <div class="request-example-panel request-example-panel-go"><pre><code class="language-go">payload := `{"model":"gemini-embedding-001","input":"Gemini 支持文本嵌入。"}`
req, _ := http.NewRequest("POST", "https://10000router.com/v1/embeddings", strings.NewReader(payload)); req.Header.Set("Authorization", "Bearer "+os.Getenv("GEMINI_API_KEY")); req.Header.Set("Content-Type", "application/json")
res, err := http.DefaultClient.Do(req); if err != nil { log.Fatal(err) }; defer res.Body.Close()</code></pre></div>
    <div class="request-example-panel request-example-panel-python"><pre><code class="language-python">import os, requests
response = requests.post("https://10000router.com/v1/embeddings", headers={"Authorization": "Bearer " + os.environ["GEMINI_API_KEY"], "Content-Type": "application/json"}, json={"model": "gemini-embedding-001", "input": "Gemini 支持文本嵌入。"})
print(response.json())</code></pre></div>
    <div class="request-example-panel request-example-panel-java"><pre><code class="language-java">var payload = "{\"model\":\"gemini-embedding-001\",\"input\":\"Gemini 支持文本嵌入。\"}";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1/embeddings")).header("Authorization", "Bearer " + System.getenv("GEMINI_API_KEY")).header("Content-Type", "application/json").POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload)).build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre></div>
    <div class="request-example-panel request-example-panel-csharp"><pre><code class="language-csharp">using System.Net.Http.Json;
using var client = new HttpClient(); client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("GEMINI_API_KEY"));
var response = await client.PostAsJsonAsync("https://10000router.com/v1/embeddings", new { model = "gemini-embedding-001", input = "Gemini 支持文本嵌入。" });
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre></div>
  </div>
</div>

## 返回响应

成功响应的 `data` 与输入顺序一致，`data[].index` 从 `0` 开始。

```json
{
  "object": "list",
  "data": [
    { "object": "embedding", "index": 0, "embedding": [0.0123, -0.0456] }
  ],
  "model": "gemini-embedding-001",
  "usage": { "prompt_tokens": 8, "total_tokens": 8 }
}
```

<details class="response-field-details" open>
<summary>响应字段</summary>
<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>object</code></td><td>string</td><td>固定为 <code>list</code>。</td></tr>
    <tr><td><code>data</code></td><td>array</td><td>每条输入对应一个嵌入对象。</td></tr>
    <tr><td><code>data[].embedding</code></td><td>array&lt;number&gt; / string</td><td>向量值；<code>encoding_format=float</code> 时返回数字数组，<code>base64</code> 时返回 Base64 编码字符串。</td></tr>
    <tr><td><code>data[].index</code></td><td>integer</td><td>对应输入文本的索引。</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>实际使用的模型 ID。</td></tr>
    <tr><td><code>usage</code></td><td>object</td><td>Token 用量，包含 <code>prompt_tokens</code> 和 <code>total_tokens</code>。</td></tr>
  </tbody>
</table>
</div>
</details>
