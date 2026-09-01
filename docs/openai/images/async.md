# 异步生图任务

耗时较长的生成与编辑可走异步：提交后立即返回 task_id，任务成功后才扣费。
编辑接口使用 POST /v1/images/edits/async，请求体相同。response_format 传 "b64_json" 可在任务结果中内联 base64；默认返回可直接下载的图片地址。

```shell
# 1. 提交——立即返回 task_id
curl https://10000router.com/v1/images/generations/async \
  -H "Authorization: Bearer $NEW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-image-2", "prompt": "a koi pond at sunset", "n": 1}'
# => {"code":"success","data":"task_xxx"}
```

```shell
# 2. 轮询任务直到 status 为 SUCCESS
curl https://10000router.com/v1/images/generations/task/{task_id} \
  -H "Authorization: Bearer $NEW_API_KEY"
```s

```shell
# 3. 下载结果（302 跳转到图片地址）
curl -L https://10000router.com/v1/images/generations/task/{task_id}/content \
  -H "Authorization: Bearer $NEW_API_KEY" -o result.png
```
