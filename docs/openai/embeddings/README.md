# Embeddings API

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/embeddings</code>
</div>

将文本转换为向量嵌入

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
<div class="parameter-details__content"><p>请求体必须使用 <code>Content-Type: application/json</code>。</p></div>
</details>
</div>

### 请求体

请求体必须使用 <code>application/json</code>。以下字段与原生 OpenAI 格式定义一致；未列出的字段不属于此接口的通用请求参数。

<details class="request-field-details" open>
<summary>请求体参数（4 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td>—</td><td>要调用的嵌入模型 ID，例如 <code>text-embedding-3-small</code>。模型必须已在网关渠道中配置。</td><td>是</td></tr>
    <tr><td><code>input</code></td><td>string | array&lt;string&gt;</td><td>—</td><td>要嵌入的文本。可以传入单个字符串，或传入字符串数组以批量生成多个向量；数组中的每一项都必须是字符串。</td><td>是</td></tr>
    <tr><td><code>encoding_format</code></td><td>string</td><td><code>float</code></td><td>向量编码格式。可选值为 <code>float</code>（浮点数数组）或 <code>base64</code>（Base64 编码）；具体行为取决于上游模型和渠道。</td><td>否</td></tr>
    <tr><td><code>dimensions</code></td><td>integer</td><td>模型默认维度</td><td>输出向量维度。仅在模型支持自定义维度时生效；不支持时请省略此字段。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  &quot;model&quot;: &quot;text-embedding-3-small&quot;,
  &quot;input&quot;: [
    &quot;向量检索可以比较文本的语义相似度。&quot;,
    &quot;Embeddings convert text into numerical vectors.&quot;
  ],
  &quot;encoding_format&quot;: &quot;float&quot;,
  &quot;dimensions&quot;: 512
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="embeddings-language" id="embeddings-curl" checked>
  <input class="request-example-input" type="radio" name="embeddings-language" id="embeddings-javascript">
  <input class="request-example-input" type="radio" name="embeddings-language" id="embeddings-go">
  <input class="request-example-input" type="radio" name="embeddings-language" id="embeddings-python">
  <input class="request-example-input" type="radio" name="embeddings-language" id="embeddings-java">
  <input class="request-example-input" type="radio" name="embeddings-language" id="embeddings-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="embeddings-curl">cURL</label>
    <label for="embeddings-javascript">JavaScript</label>
    <label for="embeddings-go">Go</label>
    <label for="embeddings-python">Python</label>
    <label for="embeddings-java">Java</label>
    <label for="embeddings-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/embeddings" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-3-small",
    "input": ["向量检索可以比较文本的语义相似度。", "Embeddings convert text into numerical vectors."],
    "encoding_format": "float",
    "dimensions": 512
  }'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const response = await fetch("https://10000router.com/v1/embeddings", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "text-embedding-3-small",
    input: ["向量检索可以比较文本的语义相似度。", "Embeddings convert text into numerical vectors."],
    encoding_format: "float",
    dimensions: 512
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
  payload := `{"model":"text-embedding-3-small","input":["向量检索可以比较文本的语义相似度。","Embeddings convert text into numerical vectors."],"encoding_format":"float","dimensions":512}`
  req, err := http.NewRequest("POST", "https://10000router.com/v1/embeddings", strings.NewReader(payload))
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
    "https://10000router.com/v1/embeddings",
    headers={
        "Authorization": "Bearer " + os.environ["OPENAI_API_KEY"],
        "Content-Type": "application/json",
    },
    json={
        "model": "text-embedding-3-small",
        "input": ["向量检索可以比较文本的语义相似度。", "Embeddings convert text into numerical vectors."],
        "encoding_format": "float",
        "dimensions": 512,
    },
)
print(response.json())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-java">
      <pre><code class="language-java">var client = java.net.http.HttpClient.newHttpClient();
var request = java.net.http.HttpRequest.newBuilder()
    .uri(java.net.URI.create("https://10000router.com/v1/embeddings"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "application/json")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString("{\"model\":\"text-embedding-3-small\",\"input\":[\"向量检索可以比较文本的语义相似度。\",\"Embeddings convert text into numerical vectors.\"],\"encoding_format\":\"float\",\"dimensions\":512}"))
    .build();
var response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-csharp">
      <pre><code class="language-csharp">using System.Net.Http.Json;

using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new(
    "Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
var response = await client.PostAsJsonAsync(
    "https://10000router.com/v1/embeddings",
    new {
        model = "text-embedding-3-small",
        input = new[] { "向量检索可以比较文本的语义相似度。", "Embeddings convert text into numerical vectors." },
        encoding_format = "float",
        dimensions = 512
    });
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="embeddings-response-status" id="embeddings-response-status-200" checked>
  <input class="response-status-input" type="radio" name="embeddings-response-status" id="embeddings-response-status-400">
  <input class="response-status-input" type="radio" name="embeddings-response-status" id="embeddings-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="embeddings-response-status-200">200 成功</label>
    <label for="embeddings-response-status-400">400 请求错误</label>
    <label for="embeddings-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  &quot;object&quot;: &quot;list&quot;,
  &quot;data&quot;: [
    {
      &quot;object&quot;: &quot;embedding&quot;,
      &quot;index&quot;: 0,
      &quot;embedding&quot;: [0.0123, -0.0456, 0.0789]
    },
    {
      &quot;object&quot;: &quot;embedding&quot;,
      &quot;index&quot;: 1,
      &quot;embedding&quot;: [0.0234, -0.0567, 0.089]
    }
  ],
  &quot;model&quot;: &quot;text-embedding-3-small&quot;,
  &quot;usage&quot;: {
    &quot;prompt_tokens&quot;: 14,
    &quot;total_tokens&quot;: 14
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  &quot;error&quot;: {
    &quot;message&quot;: &quot;Invalid value for 'input': expected a string or an array of strings.&quot;,
    &quot;type&quot;: &quot;invalid_request_error&quot;,
    &quot;param&quot;: &quot;input&quot;,
    &quot;code&quot;: null
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-429">
      <pre><code class="language-json">{
  &quot;error&quot;: {
    &quot;message&quot;: &quot;Rate limit reached for embeddings requests.&quot;,
    &quot;type&quot;: &quot;rate_limit_exceeded&quot;,
    &quot;param&quot;: null,
    &quot;code&quot;: null
  }
}</code></pre>
    </div>
  </div>
</div>

### 返回字段参数

<details class="response-field-details" open>
<summary>顶层字段（4 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>object</code></td><td>string</td><td>响应对象类型，固定为 <code>list</code>。</td></tr>
    <tr><td><code>data</code></td><td>array&lt;object&gt;</td><td>每个输入文本对应一个嵌入对象，顺序与请求中的 <code>input</code> 一致。</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>实际生成嵌入的模型 ID。</td></tr>
    <tr><td><code>usage</code></td><td>object</td><td>本次请求的输入 token 用量统计。</td></tr>
  </tbody>
</table>
</div>

<details class="response-field-details response-field-details-nested" open>
<summary><code>data[]</code> 字段（3 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>object</code></td><td>string</td><td>嵌入对象类型，固定为 <code>embedding</code>。</td></tr>
    <tr><td><code>index</code></td><td>integer</td><td>对应输入文本在 <code>input</code> 数组中的索引，从 <code>0</code> 开始。</td></tr>
    <tr><td><code>embedding</code></td><td>array&lt;number&gt;</td><td>生成的向量数组。数组长度通常等于模型默认维度，或请求中生效的 <code>dimensions</code>。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="response-field-details response-field-details-nested" open>
<summary><code>usage</code> 字段（2 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>prompt_tokens</code></td><td>integer</td><td>所有输入文本消耗的 token 数。</td></tr>
    <tr><td><code>total_tokens</code></td><td>integer</td><td>本次请求消耗的总 token 数；Embeddings 请求通常等于 <code>prompt_tokens</code>。</td></tr>
  </tbody>
</table>
</div>
</details>
</details>

### 错误响应

请求参数无效、认证失败、模型不可用或触发限流时，接口返回相应的 HTTP 4xx 状态码，并使用以下 OpenAI 兼容错误对象：

```json
{
  "error": {
    "message": "错误描述",
    "type": "invalid_request_error",
    "param": "input",
    "code": null
  }
}
```

请根据 <code>error.type</code>、<code>error.param</code> 和 HTTP 状态码定位问题；修正请求参数后再重试，避免对参数错误进行重复重试。
