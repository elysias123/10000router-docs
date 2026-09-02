---
name: api-doc-style
description: "Create or edit this project's HTTP API documentation while preserving its shared structure, interactive examples, and Apifox-inspired visual language."
---

# API Doc Style

Use this skill for every new or revised HTTP API page in this repository, including OpenAI-compatible endpoints and future REST-style endpoints. Keep changes scoped to the requested page and its directly related styles.

## Source of truth

- Content: the requested API page under `docs/`
- Endpoint contract and interface description: `D:\project\new-api-docs-v1` (use the corresponding NewAPI endpoint definition as the reference; do not invent unsupported behavior)
- Theme: `docs/styles/website.css`
- Build check: `pnpm docs:build`

## Page structure

Preserve this shared order unless the endpoint has no applicable section or the user explicitly requests a different information architecture:

1. `h1` page title.
2. `.api-endpoint` row containing the HTTP method and path.
3. A concise interface-description paragraph immediately below the `.api-endpoint` row. Base it on the corresponding NewAPI endpoint description and supported schema; summarize the endpoint's purpose, request format, and important compatibility caveats using inline code for field names, types, and protocol values.
4. `## 请求参数`: request headers, required fields, endpoint-specific option groups, a JSON body/form-data example when applicable, and language examples.
5. `## 返回响应`: status-code examples, response fields, and streaming/events when applicable.

The required visual order is `h1` → endpoint row → description paragraph → request sections, matching the reference layout. Keep the description directly adjacent to the endpoint: do not place request-header cards, request-body tables, extra headings, or code blocks between the endpoint row and this paragraph. Use one or two paragraphs only; avoid repeating the full parameter table or language examples in the description.

Use `h2` for the request/response regions and `h3` for their subsections. Keep field names and protocol values in inline backticks.

Each API should document only the fields, payload format, authentication, and transport modes that its endpoint supports. Do not copy endpoint-specific sections into unrelated APIs. OpenAI-compatible pages may use message fields, tools, or SSE; other APIs should use their own domain vocabulary.

## Category README conventions

- Top-level and functional-category `README.md` pages contain only a brief category introduction and an interface index.
- Keep index entries to the linked interface name only; do not append purpose, method, request format, authentication, parameter, response, or compatibility explanations.
- Put endpoint details, examples, and protocol caveats in the leaf endpoint page. A `README.md` that is itself a leaf endpoint remains a full endpoint page.

## Interactive blocks

- Use native `<details class="parameter-details" open>` for short header or explanatory cards.
- When an endpoint has multiple related request headers, wrap all header `<details>` blocks in one `<div class="parameter-details-group">` so they render as a single connected card (as in the stacked request-header design): each header remains its own independently expandable row, rows are separated by the group's dividers, and header details should not add outer margins, borders, or shadows of their own. Keep the details `open` by default unless the page explicitly needs a collapsed state. A single request header may remain a standalone `.parameter-details` card.
- Use this structure for grouped request headers:

  ```html
  <div class="parameter-details-group">
  <details class="parameter-details" open>
  <summary>Authorization</summary>
  <div class="parameter-details__content">...</div>
  </details>
  <details class="parameter-details" open>
  <summary>x-api-key [optional]</summary>
  <div class="parameter-details__content">...</div>
  </details>
  </div>
  ```
- Use `<details class="request-field-details" open>` for request field groups and `<details class="response-field-details" open>` for response object levels. Nested response objects may add `response-field-details-nested`.
- Keep tables inside the corresponding `__content` wrapper and use the existing three- or four-column field-table pattern.
- Request language examples should use the existing radio/label structure and six panel classes (`curl`, `javascript`, `go`, `python`, `java`, `csharp`) when a request body is meaningful. Keep one panel visible by default (`cURL`). For endpoints that use multipart or binary payloads, retain the same card and Tab treatment while showing the idiomatic request format.
- Response examples should use the existing HTTP status radio/label structure when multiple statuses are documented. Keep `200` selected by default and include relevant client-error or rate-limit examples.
- Preserve ARIA `role`/`aria-label` attributes and visible `:focus-visible` behavior.

## Code example conventions

Keep every language example semantically equivalent. Use the endpoint's natural field order consistently across languages; for the existing Chat Completions page this is `model`, `messages`, `max_completion_tokens`, `response_format`, `stream`.

Format examples as readable multi-line code:

- Define a named payload/object before sending it (except where idiomatic cURL or multipart syntax is clearer).
- Put URL, method, headers, and body on separate lines.
- Use consistent two-space indentation for JavaScript/JSON/Go, four-space indentation for Python/C#, and conventional continuation indentation for Java.
- Keep error handling and response printing on separate lines.
- Do not compress a complete request into one long line.

Use fenced blocks with the correct language identifier (`json`, `bash`, `javascript`, `go`, `python`, `java`, `csharp`, or `text`). Use `text` for SSE so `data:` and `[DONE]` remain literal.

## Visual rules

Reuse existing CSS classes rather than introducing one-off inline styles. The established visual language is:

- white content surface, pale borders, rounded cards, and restrained shadows;
- purple for navigation/focus, orange for HTTP methods, pink for active tabs;
- dark code blocks for ordinary JSON/SSE and the existing light code surface for request/response tab panels;
- responsive wrapping for endpoint paths and long code lines; do not introduce fixed-width code that overflows mobile screens.

Do not conflate article `<details>` with sidebar chapter collapse. Article details should remain manually collapsible even when default-open.

## Validation

After content or style changes, run `pnpm docs:build`. Check the generated HTML for the requested page's endpoint row, applicable example panels, status panels, nested response details, and streaming/event examples. For the Chat Completions page, also check `_book/openai/chat/chat-completions.html` for the `chat.completion.chunk` SSE example. Do not rewrite unrelated dirty-worktree changes.
