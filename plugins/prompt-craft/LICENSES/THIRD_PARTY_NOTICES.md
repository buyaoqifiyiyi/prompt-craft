# 上游来源与改编说明

Prompt Craft 0.8.0 的 `skills/enhance-prompt/references/templates/` 是独立改写的短任务骨架与示例，不是上游完整角色或工作流的镜像。

- **Fabric**，固定提交 `f16de16827ae23e4bb9aa35c2e4b690d40c5907c`：[仓库](https://github.com/danielmiessler/Fabric/tree/f16de16827ae23e4bb9aa35c2e4b690d40c5907c)。参考代码审查、比较与写作改进的任务组织。原 MIT 许可全文保留在 `Fabric-MIT.txt`。
- **Agency Agents**，固定提交 `4e3ac3ca6604c75113f52c695dbddcc7af928b46`：[仓库](https://github.com/msitarzewski/agency-agents/tree/4e3ac3ca6604c75113f52c695dbddcc7af928b46)。参考性能基线、工具评估和内容创作的检查项。原 MIT 许可全文保留在 `Agency-Agents-MIT.txt`。
- **LangGPT**，固定提交 `c8864d748e7cb8437427721eed756f6e578e6c9b`：[仓库](https://github.com/langgptai/LangGPT/tree/c8864d748e7cb8437427721eed756f6e578e6c9b)。仅参考结构化表达方式，未移植角色初始化或强制人格指令。原 Apache-2.0 许可全文保留在 `LangGPT-Apache-2.0.txt`。核查该提交未发现上游 NOTICE 文件。

2026-10-24 的改编：压缩为四类按需加载模板；去除固定技术栈、固定指标、角色问候、长推理指令及默认扩展的部署、监控、采购和营销任务；新增保留用户范围的示例。具体模板的直接来源链接见各文件末尾。

此前使用的 Matt Pocock/grilling 与 Abdoul-sudo/prompt-enhancer 的 MIT 声明继续分别保留。未复制 prompt-optimizer 的 AGPL 代码或模板，未引入上述项目的运行依赖。
