# 提示词增强 · Prompt Craft

本地开发版 0.8.0。插件只包含自动路由 Hook 和增强 Skill，所有交互都在当前项目会话中完成。

## 使用

直接发送任务即可：

- 普通聊天、简单问答、进度查询、泛泛讨论和明确的单点操作，直接处理。
- 项目创建、优化、排查、具体分析方案和多步内容任务，即使信息够用，也先快速整理目标、范围和完成条件，再立即执行。
- 关键用户决策缺失且无法从上下文或项目检查确定时，才先澄清。增强不等于必须问问题，也不要求输出长篇提示词。
- “直接执行／不用增强”跳过增强。
- “只给提示词／先别执行”只生成提示词。
- 主动要求“深度质询”时才进入深入访谈。

也可显式调用：

```text
$prompt-craft:enhance-prompt 只给提示词：我想做一个收集客户反馈的工具。
```

显式调用默认只生成提示词；明确说“增强后执行”时继续原任务。澄清回答保留原来的交接模式；用户随时可以改为只生成。

同一任务的回答和“继续”不重复增强；上一任务完成或用户切换到新任务后重新判断，因此同一会话可以多次触发。具体分析报告或实施方案也属于交付任务，但“只分析、不改代码”始终保留为边界。

## 按需任务模板

增强时自动选择当前任务匹配的一份短模板：

| 类型 | 补齐的重点 |
| --- | --- |
| 故障修复 | 现象、预期、复现条件、证据和相关验证 |
| 项目优化 | 痛点、目标、保留项、允许范围和前后比较 |
| 调研选型 | 使用约束、候选、比较标准、来源依据和取舍 |
| 内容设计 | 受众、用途、素材、风格及交付数量/程度 |

模板位于 `skills/enhance-prompt/references/templates/`。没有匹配时使用通用规则；不会每次加载整套模板。字段只用于补漏，已明确的信息直接复用，未知事实由执行者调查。模板不会覆盖用户格式、数量、权限或技术栈，也不会让快速增强变成强制访谈。

结构和专业检查项参考 Fabric、Agency Agents 与 LangGPT，保留来源及许可；未纳入 AGPL 的 prompt-optimizer 模板。模板选择与最终效果仍取决于模型，发布说明区分结构检查和实际样例验证。

本次验证中，四类任务均只读取了对应模板；严格 JSON 和简单改写边界保持正常。六组匿名前后对照均合格且全部持平，尚未证明输出质量高于 0.7.1。安装副本另通过一次自动增强后续执行测试：修复隔离购物车样例，五条业务断言通过。这些结果仅对应本批样例。

## 安装

需要本机已有的 Codex CLI 和 Node.js，无需 npm 安装、额外模型服务或 API Key。

从 GitHub 安装（私有仓库需要当前 Git 账号具有访问权限）：

```powershell
codex plugin marketplace add buyaoqifiyiyi/prompt-craft
codex plugin add prompt-craft@prompt-craft-local
codex plugin list --marketplace prompt-craft-local --json
```

从本地目录安装：

```powershell
codex plugin marketplace add '此目录的绝对路径'
codex plugin add prompt-craft@prompt-craft-local
codex plugin list --marketplace prompt-craft-local --json
```

安装或升级后重启 Codex，继续原项目会话。首次使用时在 `/hooks` 审阅并信任来源为 `prompt-craft@prompt-craft-local` 的 Hook；已信任且定义未变时沿用原信任。

卸载：

```powershell
codex plugin remove prompt-craft@prompt-craft-local
codex plugin marketplace remove prompt-craft-local
```

## 组成与范围

- `.codex-plugin/plugin.json`：插件身份与 Skill、Hook 入口。
- `hooks/hooks.json` 与 `scripts/prompt_router.cjs`：向当前模型提供路由规则。
- `skills/enhance-prompt/`：澄清、保留原意和增强后的交接。

当前版本没有独立工作台、MCP 服务、页面入口或斜杠命令。手动增强使用显式 Skill。

增强使用当前会话的模型和原任务权限；不会创建新会话或伪造用户消息。普通讨论不转成执行任务，生成文本不扩大授权。仅面向本地 Codex；自动判断和语义保真仍取决于当前模型，有限测试不代表所有请求均准确。

来源及上游许可声明见 [SOURCES.md](plugins/prompt-craft/SOURCES.md) 与 [改编说明](plugins/prompt-craft/LICENSES/THIRD_PARTY_NOTICES.md)。新增内容的对外发布许可证尚未确定；本包用于本地开发和试用。
