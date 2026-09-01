# 视频（OpenAI 兼容 / Sora）

## 通用视频生成任务

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/video/generations</code></div>

提交文生视频或图生视频任务，返回任务 ID。

<div class="api-endpoint"><span class="api-endpoint__method">GET</span> <code class="api-endpoint__path">/v1/video/generations/{task_id}</code></div>

使用任务 ID 查询生成状态和结果。

## 创建视频

<div class="api-endpoint"><span class="api-endpoint__method">POST</span> <code class="api-endpoint__path">/v1/videos</code></div>

用于创建视频任务。任务创建后通过任务 ID 查询状态和下载内容。

## 查询任务

<div class="api-endpoint"><span class="api-endpoint__method">GET</span> <code class="api-endpoint__path">/v1/videos/{task_id}</code></div>

## 获取视频内容

<div class="api-endpoint"><span class="api-endpoint__method">GET</span> <code class="api-endpoint__path">/v1/videos/{task_id}/content</code></div>

具体模型、提示词、尺寸和时长参数由网关支持的 Sora 模型决定。任务型接口应处理排队、失败和完成状态，而不是把创建响应当作最终视频。
