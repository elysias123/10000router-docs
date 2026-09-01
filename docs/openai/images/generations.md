# 生成图像

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/images/generations</code></div>

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `prompt` | string | 是 | 图像描述。 |
| `model` | string | 否 | 图像模型 ID。 |
| `n` | integer | 否 | 生成数量。 |
| `size` | string | 否 | 图像尺寸。 |
| `quality` | string | 否 | 图像质量。 |
| `response_format` | string | 否 | `url` 或 `b64_json`。 |
| `style` | string | 否 | 图像风格。 |

```bash
curl -X POST "https://10000router.com/v1/images/generations" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-image-1","prompt":"一只戴眼镜的猫","size":"1024x1024"}'
```
