# Agent 工作说明

## 测试环境

- 所有测试、类型检查、Lint、构建和本地浏览器验证均必须在 WSL 环境中执行。
- Windows PowerShell 仅用于文件查看、编辑和 Git 操作，不作为测试运行环境。
- 在 WSL 中进入项目目录后再执行测试命令；当前项目位于 `/mnt/d/project/10000router-docs`。
- 网页测试使用 `http://localhost:3000`，请确保在 WSL 中运行 `pnpm run dev` 后再进行网页测试,并且使用 playwright 测试.
