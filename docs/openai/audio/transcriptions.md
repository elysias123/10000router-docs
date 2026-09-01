# 语音转文字

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/audio/transcriptions</code></div>

使用 `multipart/form-data` 上传音频并转换为文字。

## 表单字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `file` | file | 是 | 音频文件。 |
| `model` | string | 是 | 转录模型 ID。 |
| `language` | string | 否 | ISO-639-1 语言代码。 |
| `prompt` | string | 否 | 提示词，用于改善专有名词识别。 |
| `response_format` | string | 否 | `json`、`text`、`srt`、`verbose_json` 或 `vtt`。 |
| `temperature` | number | 否 | 采样温度。 |

## 请求示例

```bash
curl -X POST "https://10000router.com/v1/audio/transcriptions" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "file=@audio.mp3" \
  -F "model=whisper-1"
```

默认 JSON 响应包含 `text` 字段；选择 `verbose_json` 时还会返回分段和时间信息。
