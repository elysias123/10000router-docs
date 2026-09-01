# 异步生图任务

耗时较长的生成与编辑可以使用异步,请求体参数相同

异步生成图像:
<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/generations/async</code>
</div>

异步编辑图像:
<div class="api-endpoint" role="group" aria-label="API endpoint">
  <span class="api-endpoint__method">POST</span>
  <code class="api-endpoint__path">/v1/images/edits/async</code>
</div>

## 使用示例

### 1. 创建异步任务
```shell
curl https://10000router.com/v1/images/generations/async \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-image-2", "prompt": "a koi pond at sunset", "n": 1}'
```

> 返回结果:<br>
> {"code":"success","data":"task_xxx"}

### 2. 查询任务状态

```shell
curl https://10000router.com/v1/images/generations/task/task_xxx \
  -H "Authorization: Bearer $API_KEY"
```

> 返回结果:<br>
> 

### 3. 下载结果

```shell
# 302 跳转到图片地址
curl -L https://10000router.com/v1/images/generations/task/task_xxx/content \
  -H "Authorization: Bearer $API_KEY" -o result.png
```
