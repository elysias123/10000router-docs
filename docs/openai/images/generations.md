# 生成图像

<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/generations</code>
</div>

根据提示词生成图像。请求格式与 NewAPI 文档中的原生 OpenAI 图像接口一致，参数是否可用及默认值取决于所选模型和上游渠道。

## 请求参数

### 请求头

<details class="parameter-details" open>
<summary>Authorization</summary>

<div class="parameter-details__content">
<p>使用 Bearer Token 认证。<br>
格式: <code>Authorization: Bearer sk-xxxxxx</code></p>
</div>
</details>

请求体使用 <code>application/json</code>。

### 请求体

<details class="request-field-details" open>
<summary>必填参数（1 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>prompt</code></td><td>string</td><td>是</td><td>所需图像的文本描述。NewAPI 原生 OpenAI 格式对 <code>gpt-image-1</code> 最多接受 32000 个字符，对 <code>dall-e-2</code> 最多 1000 个字符，对 <code>dall-e-3</code> 最多 4000 个字符；具体限制以模型为准。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="request-field-details" open>
<summary>可选参数（9 个）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>model</code></td><td>string</td><td><code>dall-e-2</code></td><td>图像模型 ID，例如 <code>dall-e-2</code>、<code>dall-e-3</code> 或 <code>gpt-image-1</code>。使用 <code>gpt-image-1</code> 特有参数时请显式传入该模型；不同模型支持的其他参数不同。</td></tr>
    <tr><td><code>n</code></td><td>integer</td><td>1</td><td>生成图像数量。标准 OpenAI 模型通常为 1–10；NewAPI 网关允许的上限可能更高，但仍受上游模型限制。<code>dall-e-3</code> 只支持 <code>n=1</code>。</td></tr>
    <tr><td><code>size</code></td><td>string</td><td>模型默认值</td><td><code>gpt-image-1</code> 支持 <code>1024x1024</code>、<code>1536x1024</code>、<code>1024x1536</code> 或 <code>auto</code>；<code>dall-e-2</code> 支持 <code>256x256</code>、<code>512x512</code>、<code>1024x1024</code>；<code>dall-e-3</code> 支持 <code>1024x1024</code>、<code>1792x1024</code>、<code>1024x1792</code>。</td></tr>
    <tr><td><code>background</code></td><td>string</td><td><code>auto</code></td><td>设置背景透明度。仅 <code>gpt-image-1</code> 支持；可选 <code>transparent</code>、<code>opaque</code>、<code>auto</code>。使用 <code>transparent</code> 时，输出格式还必须支持透明度。</td></tr>
    <tr><td><code>moderation</code></td><td>string</td><td><code>auto</code></td><td>设置 <code>gpt-image-1</code> 的内容审核级别。可选 <code>low</code> 或 <code>auto</code>。</td></tr>
    <tr><td><code>quality</code></td><td>string</td><td>模型默认值</td><td>图像质量。常见值为 <code>standard</code>、<code>hd</code>，以及 <code>gpt-image-1</code> 支持的 <code>low</code>、<code>medium</code>、<code>high</code>、<code>auto</code>；以模型文档为准。</td></tr>
    <tr><td><code>stream</code></td><td>boolean</td><td><code>false</code></td><td>是否以流式事件返回。设置为 <code>true</code> 时，只有支持图像流式输出的模型/渠道才能使用。</td></tr>
    <tr><td><code>style</code></td><td>string</td><td>模型默认值</td><td>图像风格。DALL·E 3 常用 <code>vivid</code> 或 <code>natural</code>；其他模型是否接受该字段由上游决定。</td></tr>
    <tr><td><code>user</code></td><td>string</td><td>无</td><td>最终用户的唯一标识符，用于滥用监控和审计。</td></tr>
  </tbody>
</table>
</div>
</details>

<details class="request-field-details" open>
<summary>兼容参数（按模型/渠道支持）</summary>

<div class="request-field-details__content">
<table>
  <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
  <tbody>
    <tr><td><code>response_format</code></td><td>string</td><td>部分 DALL·E 渠道支持 <code>url</code> 或 <code>b64_json</code>。<code>gpt-image-1</code> 通常通过上游默认格式返回；不支持时网关会返回 <code>400</code>。</td></tr>
    <tr><td><code>output_format</code></td><td>string</td><td>部分 <code>gpt-image-1</code> 渠道支持 <code>png</code>、<code>jpeg</code> 或 <code>webp</code>。</td></tr>
    <tr><td><code>output_compression</code></td><td>integer</td><td>对 JPEG/WebP 输出设置压缩质量（通常为 0–100）；仅在上游支持时生效。</td></tr>
  </tbody>
</table>
<p>NewAPI 会将兼容字段转发到上游；请以实际模型和渠道的能力为准。</p>
</div>
</details>

### JSON 请求体示例

<details class="request-field-details request-example-details" open>
<summary>查看 JSON 请求体示例</summary>

<div class="request-field-details__content">
<pre><code class="language-json">{
  "model": "gpt-image-1",
  "prompt": "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格",
  "n": 1,
  "size": "1024x1024",
  "background": "opaque",
  "moderation": "auto",
  "quality": "high",
  "stream": false,
  "user": "user_123"
}</code></pre>
</div>
</details>

### 请求示例代码

<div class="request-examples" role="group" aria-label="请求示例">
  <input class="request-example-input" type="radio" name="image-generation-example-language" id="image-generation-example-curl" checked>
  <input class="request-example-input" type="radio" name="image-generation-example-language" id="image-generation-example-javascript">
  <input class="request-example-input" type="radio" name="image-generation-example-language" id="image-generation-example-python">
  <div class="request-example-tabs" aria-label="选择编程语言">
    <label for="image-generation-example-curl">cURL</label>
    <label for="image-generation-example-javascript">JavaScript</label>
    <label for="image-generation-example-python">Python</label>
  </div>
  <div class="request-example-panels">
    <div class="request-example-panel request-example-panel-curl">
      <pre><code class="language-bash">curl -X POST "https://10000router.com/v1/images/generations" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格",
    "size": "1024x1024",
    "quality": "high",
    "background": "opaque"
  }'</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-javascript">
      <pre><code class="language-javascript">const response = await fetch("https://10000router.com/v1/images/generations", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-image-1",
    prompt: "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格",
    size: "1024x1024",
    quality: "high",
    background: "opaque"
  })
});
const imageResponse = await response.json();</code></pre>
    </div>
    <div class="request-example-panel request-example-panel-python">
      <pre><code class="language-python">import os
import requests

response = requests.post(
    "https://10000router.com/v1/images/generations",
    headers={
        "Authorization": "Bearer " + os.environ["OPENAI_API_KEY"],
        "Content-Type": "application/json",
    },
    json={
        "model": "gpt-image-1",
        "prompt": "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格",
        "size": "1024x1024",
        "quality": "high",
        "background": "opaque",
    },
)
response.raise_for_status()
print(response.json())</code></pre>
    </div>
  </div>
</div>

## 返回响应

### 响应示例

<div class="response-status-tabs" role="group" aria-label="按 HTTP 状态码查看响应示例">
  <input class="response-status-input" type="radio" name="image-generation-response-status" id="image-generation-response-status-200" checked>
  <input class="response-status-input" type="radio" name="image-generation-response-status" id="image-generation-response-status-400">
  <input class="response-status-input" type="radio" name="image-generation-response-status" id="image-generation-response-status-429">
  <div class="response-status-tablist" aria-label="选择 HTTP 状态码查看响应示例">
    <label for="image-generation-response-status-200">200 成功</label>
    <label for="image-generation-response-status-400">400 请求错误</label>
    <label for="image-generation-response-status-429">429 请求频率限制</label>
  </div>
  <div class="response-status-panels">
    <div class="response-status-panel response-status-panel-200">
      <pre><code class="language-json">{
  "created": 1710000000,
  "data": [
    {
      "url": "https://example.com/generated-image.png",
      "revised_prompt": "一只戴眼镜的猫坐在窗边，柔和的晨光，写实风格"
    }
  ],
  "usage": {
    "total_tokens": 1024,
    "input_tokens": 128,
    "output_tokens": 896,
    "input_tokens_details": {
      "text_tokens": 128,
      "image_tokens": 0
    }
  }
}</code></pre>
    </div>
    <div class="response-status-panel response-status-panel-400">
      <pre><code class="language-json">{
  "error": {
    "message": "Invalid value for parameter: quality",
    "type": "invalid_request_error",
    "param": "quality",
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
    <tr><td><code>data</code></td><td>array&lt;object&gt;</td><td>生成的图像数组，数量由请求参数 <code>n</code> 决定。</td></tr>
    <tr><td><code>usage</code></td><td>object</td><td><code>gpt-image-1</code> 等模型可能返回的 token 用量；部分模型或渠道不返回。</td></tr>
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
    <tr><td><code>url</code></td><td>string</td><td>生成图像的临时 URL。URL 的有效期由上游决定。</td></tr>
    <tr><td><code>b64_json</code></td><td>string</td><td>Base64 编码的图像数据；仅在模型/渠道返回该格式时出现。</td></tr>
    <tr><td><code>revised_prompt</code></td><td>string</td><td>上游改写后的提示词；部分模型不返回。</td></tr>
  </tbody>
</table>
</div>
</details>

### 流式响应

请求设置 <code>stream: true</code> 且模型/渠道支持时，响应为 Server-Sent Events。NewAPI 会转发图像事件，常见事件类型为 <code>image_generation.completed</code>，最后以 <code>data: [DONE]</code> 结束；不支持流式输出时请使用 <code>stream: false</code>。
