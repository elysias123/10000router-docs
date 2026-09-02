# Gemini 内容安全与审查

当前网关没有独立的 Gemini `moderations` API 端点。Gemini 的内容安全由模型在 `generateContent` 请求中依据 `safetySettings` 处理，并在响应的 `candidates[].safetyRatings` 返回评估结果。

## 请求时设置安全阈值

在[文本聊天](../chat/text/README.md)或[媒体识别](../chat/media/README.md)请求体中添加 `safetySettings`：

```json
{
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_LOW_AND_ABOVE"
    }
  ]
}
```

`category` 和 `threshold` 的可选值由 Gemini 模型版本决定。未提供时使用模型默认策略；过于宽松或过于严格的阈值都可能影响可用性。

## 响应中的安全评级

成功响应的每个候选通常包含 `safetyRatings` 数组：

```json
{
  "category": "HARM_CATEGORY_HARASSMENT",
  "probability": "NEGLIGIBLE",
  "blocked": false
}
```

当候选被拦截时，`finishReason` 可能为 `SAFETY`，并且 `content.parts` 为空。客户端应检查 `finishReason` 和 `safetyRatings`，不要仅依据 HTTP `200` 判断请求是否生成了内容。

如需独立的文本审查接口，请使用[OpenAI 审查接口](../../openai/moderations/README.md)；该接口与 Gemini `safetySettings` 的类别和响应结构不同，不能混用字段。
