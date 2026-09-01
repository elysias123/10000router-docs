# 音频翻译

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/audio/translations</code></div>

使用 `multipart/form-data` 将音频翻译成英文文本。认证方式为 `Authorization: Bearer <API_KEY>`。

## 表单字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `file` | file | 是 | 要翻译的音频文件。 |
| `model` | string | 是 | 翻译模型 ID。 |
| `prompt` | string | 否 | 可选的上下文提示。 |
| `response_format` | string | 否 | `json`、`text`、`srt`、`verbose_json` 或 `vtt`。 |
| `temperature` | number | 否 | 采样温度。 |

```bash
curl -X POST "https://10000router.com/v1/audio/translations" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "file=@audio.mp3" \
  -F "model=whisper-1"
```
