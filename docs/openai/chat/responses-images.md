# Responses 图像输入与输出

Responses 图像能力仍使用 `POST /v1/responses`，通过 `input` 内容块传入图像，或通过 `tools`/模型能力请求图像输出。

```json
{
  "model": "gpt-4o-mini",
  "input": [{
    "role": "user",
    "content": [
      {"type": "input_text", "text": "描述这张图片"},
      {"type": "input_image", "image_url": "https://example.com/image.png"}
    ]
  }]
}
```

详细的认证、流式事件和响应生命周期请参阅 [Responses API](responses-text.md)。
