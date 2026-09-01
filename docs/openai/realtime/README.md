# 实时语音（Realtime）

<div class="api-endpoint"><span class="api-endpoint__method">GET</span> <code class="api-endpoint__path">/v1/realtime</code></div>

这是一个 WebSocket 升级入口，不是普通 JSON 请求。客户端应使用 `wss://` 连接，并在握手时携带 API Key。

```text
wss://10000router.com/v1/realtime?model=gpt-4o-realtime
```

连接建立后，以 JSON 事件交换会话、音频缓冲区、转录和响应事件。具体事件集合取决于网关支持的 Realtime 模型。
