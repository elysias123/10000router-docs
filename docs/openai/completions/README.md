# 自动补全（Completions）

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/completions</code></div>

传统 prompt 补全接口。新项目通常优先使用 Chat Completions 或 Responses。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型 ID。 |
| `prompt` | string / array | 是 | 输入提示词。 |
| `max_tokens` | integer | 否 | 最大生成 token 数。 |
| `temperature` | number | 否 | 采样温度。 |
| `top_p` | number | 否 | 核采样参数。 |
| `n` | integer | 否 | 返回候选数量。 |
| `stream` | boolean | 否 | 是否流式返回。 |
| `stop` | string / array | 否 | 停止序列。 |

```bash
curl -X POST "https://10000router.com/v1/completions" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-3.5-turbo-instruct","prompt":"写一句问候：","max_tokens":32}'
```
