# 创建模型响应（Responses）

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/responses</code></div>

Responses API 用统一的输入/输出项表示多轮对话、工具调用和推理结果。

## 请求体

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型 ID。 |
| `input` | string / array | 是 | 文本或输入项数组。 |
| `instructions` | string | 否 | 系统级指令。 |
| `tools` | array | 否 | 模型可调用的工具。 |
| `tool_choice` | string / object | 否 | 工具选择策略。 |
| `stream` | boolean | 否 | 是否以 SSE 返回事件。 |
| `temperature` | number | 否 | 采样温度。 |
| `max_output_tokens` | integer | 否 | 最大输出 token 数。 |
| `previous_response_id` | string | 否 | 关联上一轮响应。 |

## 请求示例

```bash
curl -X POST "https://10000router.com/v1/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o-mini","input":"介绍一下 Responses API"}'
```

非流式响应为 `response` 对象；流式响应使用 `text/event-stream`，客户端应按事件类型处理 `response.output_text.delta` 等事件。
