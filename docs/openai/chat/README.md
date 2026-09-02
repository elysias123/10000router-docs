# 聊天（Chat）

这里汇总 NewAPI 当前文档中列出的 OpenAI Chat Completions 与 Responses 接口。

请求参数以 NewAPI 的 OpenAPI 定义为准；字段是否实际生效还取决于所选模型和上游渠道。所有示例均使用兼容网关地址 `https://10000router.com`，请按部署地址替换。

- [Chat Completions](chat-completions.md)：兼容传统消息数组格式。
- [Responses](responses-text.md)：统一响应、工具调用和流式事件。
- [Responses 图像输入](responses-images.md)：在 `input` 消息中传递图片内容。
