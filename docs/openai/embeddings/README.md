# 嵌入（Embeddings）

## 创建嵌入

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/embeddings</code></div>

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 嵌入模型 ID。 |
| `input` | string / array | 是 | 一个或多个文本输入。 |
| `encoding_format` | string | 否 | `float` 或 `base64`。 |
| `dimensions` | integer | 否 | 输出向量维度。 |
| `user` | string | 否 | 终端用户标识。 |

```bash
curl -X POST "https://10000router.com/v1/embeddings" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"text-embedding-3-small","input":"hello"}'
```

响应的 `data` 数组包含每个输入的 `embedding`、`index` 和 `object`，`usage` 返回 token 用量。

## 旧版兼容路径

部分客户端仍使用：

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/engines/{model}/embeddings</code></div>

请求体格式与 `/v1/embeddings` 相同。
