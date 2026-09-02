# openai

这里汇总 OpenAI 原生格式及 10000Router 的兼容扩展接口。

接口分为两类：

- **标准 OpenAI 兼容接口**：请求和响应遵循 OpenAI 公开格式，例如 Chat Completions、Responses、Embeddings、Audio、Images 和 Moderations。
- **10000Router 扩展接口**：在 OpenAI 格式之上增加的能力，例如图像异步任务。扩展接口会在对应页面明确标注，不能假设标准 OpenAI SDK 已经支持。

模型列表接口位于 [模型接口](../models/README.md)。
