# 异步生图任务

图像生成或编辑耗时较长时，可以使用 10000Router 提供的异步任务接口。提交请求会立即返回 `task_id`，任务成功后才计费。异步接口的生成参数与 [生成图像](generations.md) 相同，编辑参数与 [编辑图像](edits.md) 相同；NewAPI 支持的字段仍取决于模型和上游渠道。

> **10000Router 扩展**：本页的异步路径、任务状态和结果下载协议是 10000Router 新增接口，不属于 OpenAI 官方 Images API。它们不能假设被标准 OpenAI SDK 直接支持。

## 请求参数

### 创建生成任务

<div class="api-endpoint" role="group" aria-label="创建异步生成任务">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/generations/async</code>
</div>

请求体使用 <code>application/json</code>，字段如下：

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `prompt` | string | 是 | 图像描述。 |
| `model` | string | 否 | 图像模型 ID；建议显式传入。 |
| `n` | integer | 否 | 生成数量，默认 1；受 NewAPI 和上游模型上限限制。 |
| `size` | string | 否 | 输出尺寸，如 `1024x1024`、`1536x1024` 或 `1024x1536`，以模型为准。 |
| `background` | string | 否 | `transparent`、`opaque` 或 `auto`；通常仅 `gpt-image-1` 支持。 |
| `moderation` | string | 否 | `low` 或 `auto`；通常仅 `gpt-image-1` 支持。 |
| `quality` | string | 否 | 图像质量，如 `standard`、`hd`、`low`、`medium`、`high` 或 `auto`，以模型为准。 |
| `stream` | boolean | 否 | 异步任务通常不需要流式输出；仅在渠道明确支持时使用。 |
| `style` | string | 否 | DALL·E 3 常用 `vivid` 或 `natural`。 |
| `user` | string | 否 | 最终用户的唯一标识符。 |

### 创建编辑任务

<div class="api-endpoint" role="group" aria-label="创建异步编辑任务">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/edits/async</code>
</div>

使用 `multipart/form-data`。除文件字段外，参数与 [编辑图像](edits.md) 相同：`image`（必填）、`mask`、`prompt`（必填）、`model`、`n`、`size`、`response_format` 和 `user`。NewAPI 支持用 `image[]` 传入多张图像（是否可用取决于上游）。

## 请求头

所有请求都需要 Bearer Token：

```text
Authorization: Bearer sk-xxxxxx
```

## 请求示例

### 1. 创建异步生成任务

```bash
curl -X POST "https://10000router.com/v1/images/generations/async" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "日落时分的锦鲤池，写实风格",
    "size": "1024x1024",
    "quality": "high",
    "background": "opaque"
  }'
```

成功时返回任务 ID：

```json
{
  "code": "success",
  "data": "task_xxx"
}
```

### 2. 创建异步编辑任务

```bash
curl -X POST "https://10000router.com/v1/images/edits/async" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "image=@input.png" \
  -F "mask=@mask.png" \
  -F "prompt=把背景改成蓝天" \
  -F "model=dall-e-2" \
  -F "n=1" \
  -F "response_format=url"
```

## 返回响应

### 3. 查询任务状态

生成任务和编辑任务统一使用以下任务查询路径：

<div class="api-endpoint" role="group" aria-label="查询异步图像任务">
  <span class="api-endpoint__method">GET</span>
  <code class="api-endpoint__path">/v1/images/generations/task/{task_id}</code>
</div>

```bash
curl "https://10000router.com/v1/images/generations/task/task_xxx" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

任务未完成时，按需轮询查询接口。返回体中的状态字段和错误信息由任务执行器提供，常见状态包括 `queued`、`running`、`completed` 和 `failed`。

典型的排队或执行中响应：

```json
{
  "task_id": "task_xxx",
  "status": "running"
}
```

典型的成功响应：

```json
{
  "task_id": "task_xxx",
  "status": "completed",
  "result": {
    "url": "https://example.com/result.png"
  }
}
```

如果任务失败，响应中的 `status` 为 `failed`，并包含任务执行器提供的 `error` 信息。客户端应停止轮询并记录 `task_id`，不要无限重试同一个失败任务。

### 4. 下载结果

任务完成后，结果接口会通过 HTTP 302 跳转到图片地址。使用 `-L` 跟随跳转并保存文件：

<div class="api-endpoint" role="group" aria-label="下载异步图像结果">
  <span class="api-endpoint__method">GET</span>
  <code class="api-endpoint__path">/v1/images/generations/task/{task_id}/content</code>
</div>

```bash
curl -L "https://10000router.com/v1/images/generations/task/task_xxx/content" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -o result.png
```

生成和编辑任务都使用上述 `generations/task/{task_id}/content` 下载路径。默认结果是可下载的图片地址；如果提交时将 `response_format` 设为 `b64_json`，任务结果会内联 Base64 数据，此时请从结果 JSON 中取出并在客户端解码，而不是调用二进制下载地址。下载接口返回图片二进制，具体 `Content-Type` 以任务结果为准。

### 错误响应

创建任务或查询任务失败时，接口遵循 OpenAI 兼容错误结构：

```json
{
  "error": {
    "message": "任务不存在或已过期",
    "type": "invalid_request_error",
    "param": null,
    "code": null
  }
}
```

常见 HTTP 状态码包括 `400`（参数或任务 ID 无效）、`401`（认证失败）、`404`（任务不存在）和 `429`（请求频率限制）。
