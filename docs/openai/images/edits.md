# 编辑图像

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/edits/</code>
</div>

根据原始图像和提示词创建编辑或扩展图像。原生 OpenAI 格式使用 `multipart/form-data` 上传文件；具体模型和渠道支持的字段可能不同。

## 请求参数

### 请求头

<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

请求体使用 <code>multipart/form-data</code>。网关会转发未识别的表单字段，因此同一请求可以携带模型所需的兼容参数。

### 表单字段

<details class="request-field-details" open>
<summary>表单字段（8 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>默认值</th><th>说明</th><th>是否必填</th></tr></thead>
  <tbody>
    <tr><td><code>image</code></td><td>file</td><td>—</td><td>要编辑的图像。必须是有效的 PNG、小于 4 MB 且为正方形；未提供遮罩时，图像必须具有透明区域。</td><td>是</td></tr>
    <tr><td><code>mask</code></td><td>file</td><td>—</td><td>遮罩图像。完全透明区域表示要编辑的位置；必须与原始图像尺寸相同。</td><td>否</td></tr>
    <tr><td><code>prompt</code></td><td>string</td><td>—</td><td>所需编辑结果的文本描述，最大长度为 1000 个字符。</td><td>是</td></tr>
    <tr><td><code>n</code></td><td>string</td><td>未声明</td><td>要生成的图像数量，必须介于 <code>1</code> 和 <code>10</code> 之间。</td><td>否</td></tr>
    <tr><td><code>size</code></td><td>string</td><td>未声明</td><td>生成图像的尺寸，具体取值由模型决定。</td><td>否</td></tr>
    <tr><td><code>response_format</code></td><td>string</td><td>未声明</td><td>生成图像的返回格式，必须为 <code>url</code> 或 <code>b64_json</code>。</td><td>否</td></tr>
    <tr><td><code>user</code></td><td>string</td><td>未声明</td><td>最终用户的唯一标识符。</td><td>否</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>未声明</td><td>图像模型 ID，例如 <code>dall-e-2</code>；实际可用模型由网关和上游渠道决定。</td><td>否</td></tr>
  </tbody>
</table>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="image-edit-example-language" id="image-edit-example-curl" checked>
  <input class="request-example-input" type="radio" name="image-edit-example-language" id="image-edit-example-javascript">
  <input class="request-example-input" type="radio" name="image-edit-example-language" id="image-edit-example-go">
  <input class="request-example-input" type="radio" name="image-edit-example-language" id="image-edit-example-python">
  <input class="request-example-input" type="radio" name="image-edit-example-language" id="image-edit-example-java">
  <input class="request-example-input" type="radio" name="image-edit-example-language" id="image-edit-example-csharp">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="image-edit-example-curl">cURL</label>
    <label for="image-edit-example-javascript">JavaScript</label>
    <label for="image-edit-example-go">Go</label>
    <label for="image-edit-example-python">Python</label>
    <label for="image-edit-example-java">Java</label>
    <label for="image-edit-example-csharp">C#</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/images/edits/" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "image=@input.png" \
  -F "mask=@mask.png" \
  -F "prompt=把背景改成蓝天" \
  -F "model=dall-e-2" \
  -F "n=1" \
  -F "size=1024x1024" \
  -F "response_format=url" \
  -F "user=user_123"</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const form = new FormData();
form.append("image", document.querySelector("#image").files[0]);
form.append("prompt", "把背景改成蓝天");
form.append("model", "dall-e-2");
form.append("size", "1024x1024");
form.append("response_format", "url");

const response = await fetch("https://10000router.com/v1/images/edits/", {
  method: "POST",
  headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY },
  body: form
});
const imageResponse = await response.json();</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-python">
      <pre><code class="language-python">import os
import requests

with open("input.png", "rb") as image_file, open("mask.png", "rb") as mask_file:
    response = requests.post(
        "https://10000router.com/v1/images/edits/",
        headers={"Authorization": "Bearer " + os.environ["OPENAI_API_KEY"]},
        files={"image": image_file, "mask": mask_file},
        data={
            "prompt": "把背景改成蓝天",
            "model": "dall-e-2",
            "size": "1024x1024",
            "response_format": "url",
        },
    )
response.raise_for_status()
print(response.json())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-go">
      <pre><code class="language-go">file, _ := os.Open("input.png")
defer file.Close()
body := &bytes.Buffer{}
writer := multipart.NewWriter(body)
part, _ := writer.CreateFormFile("image", "input.png")
io.Copy(part, file)
writer.WriteField("prompt", "把背景改成蓝天")
writer.WriteField("model", "dall-e-2")
writer.WriteField("response_format", "url")
writer.Close()
req, _ := http.NewRequest("POST", "https://10000router.com/v1/images/edits/", body)
req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
req.Header.Set("Content-Type", writer.FormDataContentType())</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-java">
      <pre><code class="language-java">var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://10000router.com/v1/images/edits/"))
    .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
    .header("Content-Type", "multipart/form-data")
    .POST(java.net.http.HttpRequest.BodyPublishers.ofFile(java.nio.file.Path.of("input.png"))).build();
var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-csharp">
      <pre><code class="language-csharp">using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
using var form = new MultipartFormDataContent();
form.Add(new StreamContent(File.OpenRead("input.png")), "image", "input.png");
form.Add(new StringContent("把背景改成蓝天"), "prompt");
form.Add(new StringContent("dall-e-2"), "model");
var response = await client.PostAsync("https://10000router.com/v1/images/edits/", form);
Console.WriteLine(await response.Content.ReadAsStringAsync());</code></pre>
    </div>
  </div>
</div>

## 返回响应

编辑接口返回的 JSON 结构与生成接口一致。

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="image-edit-response-status" id="image-edit-response-status-200" checked>
  <input class="response-status-input" type="radio" name="image-edit-response-status" id="image-edit-response-status-400">
  <input class="response-status-input" type="radio" name="image-edit-response-status" id="image-edit-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="image-edit-response-status-200">200 成功</label>
    <label for="image-edit-response-status-400">400 请求错误</label>
    <label for="image-edit-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  "created": 1710000000,
  "data": [
    {
      "url": "https://example.com/edited-image.png",
      "revised_prompt": "把背景改成蓝天"
    }
  ]
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  "error": {
    "message": "image is required",
    "type": "invalid_request_error",
    "param": "image",
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

<details class="response-field-details" open>
<summary>顶层字段（3 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>created</code></td><td>integer</td><td>响应创建时间，Unix 时间戳（秒）。</td></tr>
    <tr><td><code>data</code></td><td>array&lt;object&gt;</td><td>编辑后图像数组，数量由 <code>n</code> 决定。</td></tr>
    <tr><td><code>usage</code></td><td>object</td><td>部分图像模型返回的 token 用量；不保证所有渠道都提供。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="response-field-details" open>
<summary><code>data[]</code> 字段（3 个）</summary>

<div class="response-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>url</code></td><td>string</td><td>编辑后图像的临时 URL。</td></tr>
    <tr><td><code>b64_json</code></td><td>string</td><td>Base64 编码的图像数据；请求 <code>response_format=b64_json</code> 且上游支持时出现。</td></tr>
    <tr><td><code>revised_prompt</code></td><td>string</td><td>上游改写后的提示词；部分模型不返回。</td></tr>
  </tbody>
</table>
</div>
</details>

### 流式响应

当请求携带 <code>stream=true</code> 且模型/渠道支持时，响应为 Server-Sent Events，常见事件类型为 <code>image_edit.completed</code>，最后以 <code>data: [DONE]</code> 结束。
