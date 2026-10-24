# 来源与改编

核查日期：2026-10-24。本插件是为当前需求编写的本地开发版本，不是以下项目的官方版本。未整体移植任何优化工作台、模型客户端或宿主 UI 接口。

| 来源 | 使用方式 | 本地调整 |
| --- | --- | --- |
| [Matt Pocock / grilling](https://github.com/mattpocock/skills/blob/95249b0b49782349740fd9b8c6ce32b4e59e497a/skills/productivity/grilling/SKILL.md)，MIT | 决策树、依赖顺序与附推荐答案的澄清方法 | 聚焦会改变结果的问题；默认短访谈；增加跳过与结束条件及提示词产出 |
| [Abdoul-sudo / prompt-enhancer](https://github.com/Abdoul-sudo/prompt-enhancer/blob/main/hooks/register.tsx)，MIT | 意图保留、原文恢复、不过度扩写的规则与交互参考 | 重新编写为 Codex Skill；无 Claude Code 接口、模型调用或输入框控件 |
| [linshenkx / prompt-optimizer](https://github.com/linshenkx/prompt-optimizer)，AGPL-3.0-only | 仅调研优化、反馈与对比的产品设计 | 未复制源码或模板，未作为运行依赖 |
| [1546742976 / prompt_enhancer](https://github.com/1546742976/prompt_enhancer) | 仅调研公开设计 | 未发现 LICENSE，不复制其文件或正文 |
| [Fabric](https://github.com/danielmiessler/Fabric/tree/f16de16827ae23e4bb9aa35c2e4b690d40c5907c)，MIT | 任务型模板、代码审查、比较与写作改进结构 | 独立改写为按需加载的短任务骨架，保留用户范围 |
| [Agency Agents](https://github.com/msitarzewski/agency-agents/tree/4e3ac3ca6604c75113f52c695dbddcc7af928b46)，MIT | 性能基线、工具选型、内容创作检查项 | 删除角色人格、固定指标和未经请求的完整业务流程 |
| [LangGPT](https://github.com/langgptai/LangGPT/tree/c8864d748e7cb8437427721eed756f6e578e6c9b)，Apache-2.0 | 结构化表达参考 | 不移植角色初始化，以当前 Skill 的目标/约束/输出规则为准 |

实际适配正文由本任务编写；未采用本机 Yanlu 文件作为运行依赖。相关上游 MIT 与 Apache-2.0 许可全文及修改说明随包保留在 `LICENSES/`，详见 `LICENSES/THIRD_PARTY_NOTICES.md`。插件新增内容尚未指定对外发布许可证；公开发布前由作者确定。当前包用于本地开发、审阅与试用，未申请公共商店发布。

宿主接线参考：

- [官方插件打包与本地 marketplace](https://developers.openai.com/plugins/build/plugins)
- [官方 Codex Hooks](https://developers.openai.com/codex/hooks)
- [官方 Skills](https://developers.openai.com/plugins/concepts/skills)

0.7.0 仅保留自动路由 Hook 与增强 Skill。自动任务入口增强后继续执行，显式只要提示词时交付文本。已移除工作台、MCP 服务、捆绑的 SDK、相关构建依赖、页面截图和命令文件；MIT 参考来源声明保留。路由仍使用当前会话模型，不调用第二个分类模型，不新增授权。

0.7.1 根据触发过少的使用反馈调整路由：实质任务默认快速增强，关键用户决策缺失才澄清；普通聊天和单点操作直接放行。具体分析仍只交付分析，同任务续答与新任务分开判断。保留 0.7.0 的 Hook + Skill 精简布局。

0.8.0 增加故障修复、项目优化、调研选型、内容设计四份短模板，按主要交付选择并读取；没有匹配时回退通用规则。模板字段只作补漏，用户的数量、格式、权限和已有约束优先。保持原自动路由与增强后继续执行行为。
