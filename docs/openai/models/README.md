# 模型（Models）

## 列出模型

<div class="api-endpoint"><span class="api-endpoint__method">GET</span> <code class="api-endpoint__path">/v1/models</code></div>

```bash
curl "https://10000router.com/v1/models" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

响应为 `{ "object": "list", "data": [...] }`。每个模型通常包含 `id`、`object`、`created`、`owned_by` 等字段。
