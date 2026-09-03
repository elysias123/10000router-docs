# 项目概述

- 这是一个服务使用 newapi 搭建的商业ai网关的文档, 主要用于向专业人员提供接口文档, 便于他们理解和使用该服务。
- 编写时可以参考本地版newapi文档[new-api-docs-v1](D:\project\new-api-docs-v1)或者在线版文档[NewAPI文档](https://docs.newapi.pro/zh/docs/api)

## 项目结构

```text
.
├── AGENTS.md                         # 项目协作规则与文档编写约定
├── book.json                         # HonKit 构建配置、内容根目录和插件配置
├── package.json                      # 开发、构建和本地插件依赖
├── pnpm-lock.yaml                    # pnpm 依赖锁定文件
├── .gitbook.yaml                     # GitBook/Git Sync 目录配置
├── docs/                             # 文档源文件（book.json 的 root）
│   ├── SUMMARY.md                    # 站点导航目录
│   ├── README.md                     # 站点首页
│   ├── models/                       # 模型列表接口文档
│   ├── openai/                       # OpenAI 兼容接口文档
│   │   ├── audio/                    # 语音、转录和翻译
│   │   ├── chat/                     # Chat Completions 和 Responses
│   │   ├── completions/              # Completions
│   │   ├── embeddings/               # Embeddings
│   │   ├── images/                   # 图像生成、编辑和异步任务
│   │   └── moderations/              # 内容审查
│   ├── anthropic/                    # Anthropic/Claude 兼容接口文档
│   ├── gemini/                       # Gemini 兼容接口文档
│   │   ├── audio/
│   │   ├── chat/                     # 文本聊天和媒体分析
│   │   ├── embeddings/
│   │   └── images/
│   └── styles/website.css            # 文档内容相关样式
├── styles/website.css                # HonKit 网站主题样式
├── plugins/                          # 本地 HonKit 插件
│   ├── collapse/                     # 可折叠章节侧边栏
│   └── code-copy/                    # 代码块复制按钮
└── .agents/skills/api-doc-style/     # 本项目 API 文档编写技能及辅助配置
```

以下目录不属于文档源码，通常不需要手动修改：`node_modules/` 为依赖目录，`_book/` 为 `pnpm docs:build` 生成的静态站点，`.playwright-mcp/` 为本地网页测试状态，`.vscode/` 为编辑器配置。

## 测试流程

- 网页测试均使用playwright-mcp 测试进行网页测试,如果`http://localhost:4000`无法访问,请检查是否启动了`pnpm run dev`

## api参考对象

- 举例模型使用较新的gpt-5.6-sol进行举例
