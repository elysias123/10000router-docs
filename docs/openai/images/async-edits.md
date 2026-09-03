# 创建异步编辑任务

<div class="api-endpoint" role="group" aria-label="创建异步编辑任务">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/edits/async</code>
</div>

提交异步图像编辑任务并立即返回 `task_id`。这是 10000Router 的扩展端点，请求体使用 `multipart/form-data`，字段与 `/v1/images/edits/` 兼容；具体字段是否生效取决于模型和上游渠道。

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
<div class="parameter-details__content"><p>请求体使用 <code>multipart/form-data</code>；由客户端自动生成 boundary。</p></div>
</details>
</div>

### 表单字段

<details class="request-field-details" open>
<summary>表单字段（8 个）</summary>
<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>image</code></td><td>file</td><td>—</td><td>要编辑的图像。通常要求有效 PNG、小于 4 MB 且为正方形。</td><td>是</td></tr>
    <tr><td><code>mask</code></td><td>file</td><td>—</td><td>遮罩图像；完全透明区域表示要编辑的位置。</td><td>否</td></tr>
    <tr><td><code>prompt</code></td><td>string</td><td>—</td><td>所需编辑结果的文本描述。</td><td>是</td></tr>
    <tr><td><code>n</code></td><td>string</td><td>未声明</td><td>要生成的图像数量，必须介于 <code>1</code> 和 <code>10</code> 之间。</td><td>否</td></tr>
    <tr><td><code>size</code></td><td>string</td><td>未声明</td><td>输出图像的尺寸，具体取值由模型决定。</td><td>否</td></tr>
    <tr><td><code>response_format</code></td><td>string</td><td>未声明</td><td>返回格式，可选值取决于模型和渠道。</td><td>否</td></tr>
    <tr><td><code>user</code></td><td>string</td><td>未声明</td><td>最终用户的唯一标识符。</td><td>否</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>未声明</td><td>图像模型 ID，实际可用模型由网关和上游渠道决定。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="async-edit-example-language" id="async-edit-example-curl" checked>
  <input class="request-example-input" type="radio" name="async-edit-example-language" id="async-edit-example-javascript">
  <input class="request-example-input" type="radio" name="async-edit-example-language" id="async-edit-example-go">
  <input class="request-example-input" type="radio" name="async-edit-example-language" id="async-edit-example-python">
  <input class="request-example-input" type="radio" name="async-edit-example-language" id="async-edit-example-java">
  <input class="request-example-input" type="radio" name="async-edit-example-language" id="async-edit-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="async-edit-example-curl">cURL</label>
    <label for="async-edit-example-javascript">JavaScript</label>
    <label for="async-edit-example-go">Go</label>
    <label for="async-edit-example-python">Python</label>
    <label for="async-edit-example-java">Java</label>
    <label for="async-edit-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl"><pre><code class="language-bash">curl -X POST "https://10000router.com/v1/images/edits/async" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "image=@input.png" \
  -F "prompt=把背景改成蓝天" \
  -F "model=dall-e-2" \
  -F "n=1"</code></pre></div>
    <div class="request-example-panel request-example-panel-javascript"><pre><code class="language-javascript">const form = new FormData();
form.append("image", fileInput.files[0]);
form.append("prompt", "把背景改成蓝天");
form.append("model", "dall-e-2");
form.append("n", "1");
const response = await fetch("https://10000router.com/v1/images/edits/async", {
  method: "POST",
  headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY },
  body: form
});
const data = await response.json();
console.log(data);</code></pre></div>
    <div class="request-example-panel request-example-panel-go"><pre><code class="language-go">file, err := os.Open("input.png")
if err != nil { log.Fatal(err) }
defer file.Close()
body := &bytes.Buffer{}
writer := multipart.NewWriter(body)
part, _ := writer.CreateFormFile("image", "input.png")
io.Copy(part, file)
writer.WriteField("prompt", "把背景改成蓝天")
writer.WriteField("model", "dall-e-2")
writer.Close()
req, _ := http.NewRequest("POST", "https://10000router.com/v1/images/edits/async", body)
req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
req.Header.Set("Content-Type", writer.FormDataContentType())</code></pre></div>
    <div class="request-example-panel request-example-panel-python"><pre><code class="language-python">import os
import requests

with open("input.png", "rb") as image:
    response = requests.post(
        "https://10000router.com/v1/images/edits/async",
        headers={"Authorization": "Bearer " + os.environ["OPENAI_API_KEY"]},
        files={"image": image},
        data={"prompt": "把背景改成蓝天", "model": "dall-e-2", "n": "1"},
    )
response.raise_for_status()
print(response.json())</code></pre></div>
    <div class="request-example-panel request-example-panel-java"><pre><code class="language-java">var boundary = "----10000RouterBoundary";
var body = "--" + boundary + "\r\n"
    + "Content-Disposition: form-data; name=\"prompt\"\r\n\r\n把背景改成蓝天\r\n"
    + "--" + boundary + "--\r\n";
var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1/images/edits/async"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "multipart/form-data; boundary=" + boundary)
    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(body))
    .build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());</code></pre></div>
    <div class="request-example-panel request-example-panel-csharp"><pre><code class="language-csharp">using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
using var form = new MultipartFormDataContent();
form.Add(new StreamContent(File.OpenRead("input.png")), "image", "input.png");
form.Add(new StringContent("把背景改成蓝天"), "prompt");
form.Add(new StringContent("dall-e-2"), "model");
var response = await client.PostAsync("https://10000router.com/v1/images/edits/async", form);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre></div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="async-edit-response-status" id="async-edit-response-status-200" checked>
  <input class="response-status-input" type="radio" name="async-edit-response-status" id="async-edit-response-status-400">
  <input class="response-status-input" type="radio" name="async-edit-response-status" id="async-edit-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="async-edit-response-status-200">200 成功</label>
    <label for="async-edit-response-status-400">400 请求错误</label>
    <label for="async-edit-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200"><pre><code class="language-json">{
  "code": "success",
  "data": "task_xxx"
}</code></pre></div>
    <div class="response-status-panel response-status-panel-400"><pre><code class="language-json">{
  "error": {
    "message": "Invalid image edit parameters",
    "type": "invalid_request_error",
    "param": "image",
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
