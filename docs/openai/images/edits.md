# 编辑图像

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/edits</code>
</div>

根据原始图像和提示词创建编辑或扩展图像。NewAPI 原生 OpenAI 格式使用 `multipart/form-data` 上传文件；具体模型和渠道支持的字段可能不同。

## 请求参数

### 请求头

<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

请求体使用 <code>multipart/form-data</code>。NewAPI 会转发未识别的表单字段，因此同一请求可以携带模型所需的兼容参数。

### 表单字段

<details class="request-field-details" open>
<summary>必填字段（2 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>image</code></td><td>file</td><td>是</td><td>要编辑的原始图像。原生 OpenAI 图像编辑通常要求有效的 PNG、小于 4 MB 且为正方形；未提供 <code>mask</code> 时，图像通常需要包含透明区域。NewAPI 也支持使用 <code>image[]</code> 传入多张图像（是否可用取决于上游）。</td></tr>
    <tr><td><code>prompt</code></td><td>string</td><td>是</td><td>所需编辑结果的文本描述。DALL·E 2 的原生 OpenAI 接口通常限制为 1000 个字符。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="request-field-details" open>
<summary>可选字段（6 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>字段</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>mask</code></td><td>file</td><td>无</td><td>遮罩图像。透明区域（例如 alpha 为 0）表示要编辑的位置；必须与原始图像尺寸相同，通常也要求 PNG 且小于 4 MB。</td></tr>
    <tr><td><code>model</code></td><td>string</td><td>由网关决定</td><td>图像模型 ID，例如 <code>dall-e-2</code> 或上游支持的编辑模型。</td></tr>
    <tr><td><code>n</code></td><td>integer</td><td>1</td><td>生成图像数量。原生 OpenAI 文档通常要求 1–10；NewAPI 最终仍受上游模型限制。</td></tr>
    <tr><td><code>size</code></td><td>string</td><td>模型默认值</td><td>输出图像大小。DALL·E 2 常用 <code>256x256</code>、<code>512x512</code> 或 <code>1024x1024</code>。</td></tr>
    <tr><td><code>response_format</code></td><td>string</td><td><code>url</code></td><td>返回格式，可选 <code>url</code> 或 <code>b64_json</code>；仅在上游渠道支持时生效。</td></tr>
    <tr><td><code>user</code></td><td>string</td><td>无</td><td>最终用户的唯一标识符，用于滥用监控和审计。</td></tr>
  </tbody>
</table>
</div>
</details>

### JSON 图像输入（10000Router/渠道扩展）

部分 NewAPI 渠道允许使用 <code>application/json</code> 传入 <code>image</code> 或 <code>images</code> 字段（值可以是图像 URL 或 data URL），并可附带 <code>input_fidelity</code>、<code>background</code>、<code>quality</code>、<code>output_format</code>、<code>output_compression</code>、<code>partial_images</code>、<code>stream</code> 等模型参数。这些字段不是标准 OpenAI 编辑接口的通用参数，必须以实际模型/渠道的支持列表为准。原生 OpenAI 编辑接口的标准文档格式仍是 multipart；如果渠道不接受 JSON，将返回 <code>400</code>。

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="image-edit-example-language" id="image-edit-example-curl" checked>
  <input class="request-example-input" type="radio" name="image-edit-example-language" id="image-edit-example-javascript">
  <input class="request-example-input" type="radio" name="image-edit-example-language" id="image-edit-example-python">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="image-edit-example-curl">cURL</label>
    <label for="image-edit-example-javascript">JavaScript</label>
    <label for="image-edit-example-python">Python</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/images/edits" \
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

const response = await fetch("https://10000router.com/v1/images/edits", {
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
        "https://10000router.com/v1/images/edits",
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
