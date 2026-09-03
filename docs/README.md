---
description: "10000Router接口文档"
icon: comments
---

# 10000Router 接口文档总览

本文只介绍如何调用 10000Router API，包括请求地址、认证方式、请求字段、响应格式和调用示例。
视频模型使用 OpenAI Chat Completions 格式，不使用独立的视频 API 路径。

---

## 索引

- [获取模型列表](models/README.md)
- [OpenAI](openai/README.md)
- [Anthropic](anthropic/README.md)
- [Gemini](gemini/README.md)

## 选择调用格式

| 使用场景 | 调用格式 | 请求路径 |
| --- | --- | --- |
| OpenAI SDK 或通用聊天请求 | OpenAI Chat Completions | `POST /v1/chat/completions` |
| OpenAI Responses SDK | OpenAI Responses | `POST /v1/responses` |
| Claude SDK 或 Anthropic 客户端 | Anthropic Claude Messages | `POST /v1/messages` |
| Gemini 原生请求格式 | Gemini | `POST /v1beta/models/{model}:generateContent` |
| 视频模型 | OpenAI Chat Completions | `POST /v1/chat/completions` |

## 常见错误与排查

| HTTP 状态码 | 含义 |
| --- | --- |
| `400` | 请求字段或请求体格式错误 |
| `401` | API Key 或认证请求头无效 |
| `404` | 模型或请求路径不存在 |
| `429` | 请求频率或额度限制 |
| `5xx` | 网关或上游服务错误 |
