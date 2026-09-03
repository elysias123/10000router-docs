---
name: api-doc-style
description: "创建或编辑本项目的 HTTP API 文档，同时保持统一结构、交互式示例和 Apifox 风格的视觉语言。"
---

# API 文档风格

仓库中所有新增或修订的 HTTP API 页面（包括 OpenAI 兼容端点和未来的 REST 风格端点）都必须使用此技能。将修改范围限制在请求的页面及其直接相关的样式。

## 信息来源

- 内容：`docs/` 下请求的 API 页面。
- 端点参数和接口说明：`D:\project\new-api-docs-v1`（以对应的 NewAPI 端点定义为准，不得编造不受支持的行为）。
- 主题：`docs/styles/website.css`

## 页面结构

除非端点不适用某个章节，或用户明确要求采用其他信息架构，否则保持以下统一顺序：

1. `h1` 页面标题。
2. 包含 HTTP 方法和路径的 `.api-endpoint` 行。
3. 紧接在 `.api-endpoint` 行下方的简洁接口说明段落。说明应以对应的 NewAPI 端点描述和受支持的 schema 为基础，概括端点用途、请求格式及重要兼容性注意事项；字段名、类型和协议值使用行内代码。
4. `## 请求参数`：请求头、必填字段、端点专属选项组、适用时的 JSON 请求体或 `form-data` 示例，以及各语言示例。
5. `## 返回响应`：状态码示例、响应字段，以及适用时的流式响应或事件。

页面的视觉顺序必须是 `h1` → 端点行 → 接口说明段落 → 请求章节，与参考布局一致。接口说明必须紧邻端点行；两者之间不得插入请求头卡片、请求体表格、额外标题或代码块。说明只使用一到两个段落，避免在其中重复完整参数表或语言示例。

请求和响应区域使用 `h2`，其子章节使用 `h3`。字段名和协议值使用行内反引号。

每个 API 只能记录其端点实际支持的字段、载荷格式、认证方式和传输模式。不要将端点专属章节复制到无关的 API 中。OpenAI 兼容页面可以使用消息字段、工具或 SSE；其他 API 应使用各自领域的术语。

## 分类 README 约定

- 顶层和功能分类的 `README.md` 页面只包含简短的分类介绍和接口索引。
- 索引条目只保留链接对应的接口名称；不要附加用途、方法、请求格式、认证、参数、响应或兼容性说明。
- 将端点详情、示例和协议注意事项放在叶子端点页面中。如果某个 `README.md` 本身就是叶子端点页面，则仍按完整端点页面编写。

## 交互区块

- 简短的请求头或说明卡片使用原生 `<details class="parameter-details" open>`。
- 如果端点包含多个相关请求头，将所有请求头 `<details>` 放入一个 `<div class="parameter-details-group">`，使其显示为一张连续卡片（与堆叠式请求头设计一致）：每个请求头仍是可独立展开的行，行之间使用分隔线；请求头 details 自身不得添加外边距、边框或阴影。除非页面明确需要默认折叠，否则 details 默认保持 `open`。只有一个请求头时，可以使用独立的 `.parameter-details` 卡片。
- 根据端点契约和实际接口要求判断每个请求头是否必需；不得根据请求头名称推断可选性，也不得从其他 API 复制标记。如果请求头不是请求成功所严格要求的（例如替代认证请求头或按条件使用的兼容性请求头），就在其 `<summary>` 标题末尾添加 `[可选]`。只有契约明确要求的请求头才省略该标记，并始终使用中文 `[可选]`，不要使用 `[optional]`。
- 分组请求头使用以下结构：

  ```html
  <div class="parameter-details-group">
  <details class="parameter-details" open>
  <summary>Authorization</summary>
  <div class="parameter-details__content">...</div>
  </details>
  <details class="parameter-details" open>
  <summary>{header-name} [可选]</summary>
  <div class="parameter-details__content">...</div>
  </details>
  </div>
  ```
- 请求字段分组使用 `<details class="request-field-details" open>`，响应对象层级使用 `<details class="response-field-details" open>`。嵌套响应对象可以添加 `response-field-details-nested`。
- 表格放在对应的 `__content` 容器中，并使用现有的三列或四列字段表格模式。
- 请求体的必填字段和可选字段尽量合并到同一张参数表中，不要按必填/可选拆成多张重复表；使用 `是否必填` 列区分，且该列固定放在表格最后。值使用 `是`、`否`；对于依赖消息角色或内容块类型的字段，使用 `条件` 并在表后说明条件。
- Chat Completions 的消息对象字段和内容块字段也尽量合并为一张消息字段表；仅在内容层级或端点结构确实不同、合并会降低可读性时才拆分。
- 请求体有意义时，请求语言示例使用现有的 radio/label 结构和六个面板类（`curl`、`javascript`、`go`、`python`、`java`、`csharp`）。默认显示一个面板（`cURL`）。对于使用 multipart 或二进制载荷的端点，保留相同的卡片和 Tab 交互方式，同时展示符合该格式习惯的请求写法。
- 文档包含多个状态码时，响应示例使用现有的 HTTP 状态 radio/label 结构。默认选中 `200`，并包含相关的客户端错误或速率限制示例。
- 保留 ARIA 的 `role`/`aria-label` 属性以及可见的 `:focus-visible` 行为。

## 代码示例约定

确保所有语言示例在语义上等价。各语言统一使用端点自然的字段顺序；现有 Chat Completions 页面使用的顺序是 `model`、`messages`、`max_completion_tokens`、`response_format`、`stream`。

示例应格式化为易读的多行代码：

- 发送请求前先定义具名的载荷或对象（符合 cURL 惯用写法或 multipart 语法更清晰的情况除外）。
- 将 URL、方法、请求头和请求体分别放在不同的代码行中。
- JavaScript/JSON/Go 使用统一的两空格缩进，Python/C# 使用四空格缩进，Java 使用惯用的续行缩进。
- 将错误处理和响应输出分别放在不同的代码行中。
- 不要将完整请求压缩成一行过长的代码。

使用正确语言标识符的围栏代码块（`json`、`bash`、`javascript`、`go`、`python`、`java`、`csharp` 或 `text`）。SSE 示例使用 `text`，以便 `data:` 和 `[DONE]` 保持字面形式。

## 视觉规则

复用现有 CSS 类，不要引入一次性的行内样式。既定的视觉语言包括：

- 白色内容背景、浅色边框、圆角卡片和克制的阴影；
- 导航和焦点使用紫色，HTTP 方法使用橙色，活动标签使用粉色；
- 普通 JSON/SSE 使用深色代码块，请求/响应 Tab 面板使用现有的浅色代码区域；
- 端点路径和较长代码行应支持响应式换行；不要引入在移动端溢出的固定宽度代码。

不要将文章中的 `<details>` 与侧边栏章节折叠混为一谈。文章 details 即使默认展开，也必须保留手动折叠能力。
