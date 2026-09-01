---
description: "使用 HonKit 构建的 OpenAI 兼容 API 中文参考文档"
icon: comments
---

# OpenAI 兼容 API 调用文档

这是一份面向开发者的中文 **OpenAI 兼容 API** 参考，优先覆盖 Chat Completions，并逐步补齐 Audio、Responses、Images、Embeddings 等接口。

OpenAI 新项目也可以评估 [Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses)。本手册聚焦兼容大量现有 SDK 和网关的 `POST /v1/chat/completions` 接口。

## 五分钟上手

### 准备 API Key

在运行环境中设置 `OPENAI_API_KEY`。密钥只放在服务端或安全的密钥管理系统中，不要提交到 Git。
### 安装 SDK

可直接参考 [Chat Completions 请求示例](openai/chat/chat-completions.md) 中的 Python、Node.js、Go、Java 和 C# 示例。
### 发送第一条消息

调用 `POST /v1/chat/completions`，从 `choices[0].message.content` 读取文本回复。

- [Chat Completions](openai/chat/chat-completions.md)：请求字段、响应结构和可运行示例。
- [Responses](openai/chat/responses-text.md)：统一响应、工具调用和流式事件。
- [Audio](openai/audio/README.md)：语音合成、转录和翻译。

## 官方资料

- [Chat Completions API Reference](https://platform.openai.com/docs/api-reference/chat)
- [Text generation guide](https://developers.openai.com/api/docs/guides/text)
- [Authentication](https://platform.openai.com/docs/api-reference/authentication)
- [Models](https://platform.openai.com/docs/models)

## 本地预览

```bash
pnpm install
pnpm docs:serve
```

然后打开 `http://localhost:4000`。生成静态站点可运行 `pnpm docs:build`，产物位于 `_book/`。
