# 文字转语音

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/audio/speech</code></div>

使用 OpenAI 兼容格式将文本转换为音频。请求需要 `Authorization: Bearer <API_KEY>` 和 `Content-Type: application/json`。

## 请求体

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | TTS 模型 ID。 |
| `input` | string | 是 | 要合成的文本。 |
| `voice` | string | 是 | 声音 ID。 |
| `response_format` | string | 否 | 音频格式，例如 `mp3`、`opus`、`aac`、`flac`、`wav`、`pcm`。 |
| `speed` | number | 否 | 播放速度，默认 `1.0`。 |

## 请求示例

```bash
curl -X POST "https://10000router.com/v1/audio/speech" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o-mini-tts","input":"你好","voice":"alloy","response_format":"mp3"}' \
  --output speech.mp3
```

响应体是所选格式的二进制音频数据，不是 JSON。
