# 审查（Moderations）

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/moderations</code></div>

检查文本或多模态输入是否可能违反安全策略。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 审查模型 ID。 |
| `input` | string / array | 是 | 待检查的文本或内容数组。 |

```bash
curl -X POST "https://10000router.com/v1/moderations" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"omni-moderation-latest","input":"待检查的文本"}'
```

响应包含 `results` 数组及 `flagged`、分类结果和分类置信度。
