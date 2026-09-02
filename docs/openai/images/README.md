# 图像（Images）

这里汇总 10000Router / NewAPI 兼容的图像接口。同步接口的路径和请求/响应结构遵循 OpenAI Images API；字段是否可用取决于模型与上游渠道。异步任务接口是 10000Router 扩展，不属于 OpenAI 官方 Images API。

## 接口列表

| 接口 | 方法 | 用途 | 请求格式 |
| --- | --- | --- | --- |
| [`/v1/images/generations`](generations.md) | `POST` | 根据提示词生成图像 | `application/json` |
| [`/v1/images/edits`](edits.md) | `POST` | 根据原图、遮罩和提示词编辑图像 | `multipart/form-data` |
| [`/v1/images/generations/async`](async.md) | `POST` | **10000Router 扩展：**创建异步生成任务 | `application/json` |
| [`/v1/images/edits/async`](async.md) | `POST` | **10000Router 扩展：**创建异步编辑任务 | `multipart/form-data` |

所有接口都使用以下认证头：

```text
Authorization: Bearer sk-xxxxxx
```

### 参数兼容性

- 原生 OpenAI 图像参数（如 `prompt`、`n`、`size`、`quality`、`background`、`moderation`、`style` 和 `user`）会按 NewAPI 文档定义转发。
- 编辑接口额外支持 `image`、`image[]` 和 `mask` 文件字段。
- `response_format`、`output_format`、`output_compression`、`partial_images`、`stream` 等字段依赖模型/渠道；不支持的组合会返回 `400`。
- 图像响应通常包含 `created` 和 `data`；`data[]` 中可能返回 `url`、`b64_json`、`revised_prompt`，以及部分模型提供的 `usage`。
- 异步生成和编辑任务提交后返回 `task_id`；任务查询与二进制下载使用异步文档中列出的任务路径。这些任务路径属于 10000Router 扩展，不能假设可由标准 OpenAI SDK 直接调用。
