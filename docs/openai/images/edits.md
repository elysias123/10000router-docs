# 编辑图像

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/images/edits</code></div>

使用 `multipart/form-data` 根据提示词编辑一张或多张输入图像。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `image` | file | 是 | 输入图像。 |
| `prompt` | string | 是 | 编辑指令。 |
| `mask` | file | 否 | 指定可编辑区域。 |
| `model` | string | 否 | 图像模型 ID。 |
| `n` | integer | 否 | 生成数量。 |
| `size` | string | 否 | 输出尺寸。 |
| `response_format` | string | 否 | `url` 或 `b64_json`。 |

```bash
curl -X POST "https://10000router.com/v1/images/edits" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "image=@input.png" \
  -F "prompt=把背景改成蓝天"
```
