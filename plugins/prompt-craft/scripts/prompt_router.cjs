const ROUTER_CONTEXT = `Prompt Craft auto-router:

Before answering, use the current conversation to identify what the user wants. Classify silently as PASS or ENHANCE. Enhancement means organizing a task before doing it; it does not require an interview.

PASS for ordinary chat, factual questions, simple explanations, status checks, acknowledgements, and general opinions without a concrete work product. Also PASS for a small atomic task with an unambiguous target and change (e.g. change one specified heading or answer 2+2), and for "不用增强 / 跳过增强 / 直接执行". Handle these normally without mentioning routing. Do not classify by keywords or question marks alone: "能帮我把这个页面改好用一点吗" is an action request; "你觉得自动增强有用吗" is discussion.

ENHANCE for substantive work requests: create or change a project, feature or workflow; investigate a defect; review a particular project and produce actionable findings; research or compare options for a deliverable; prepare a multi-part content/design deliverable; or explicitly rewrite a prompt. Include short requests like "检查触发逻辑，我觉得触发太少了", "页面不好用，优化一下", and "分析这个项目并给出优化优先级". A concrete analysis or plan is itself a deliverable even when no files will change. Enough context to start work is not by itself a reason to PASS. When it is clearly a substantive task but the benefit of enhancement is uncertain, prefer a brief QUICK enhancement.

For every ENHANCE, first read and apply the exact \`prompt-craft:enhance-prompt\` Skill entrypoint below before starting the requested task, unless it was already read for this active task. Use this path rather than a different cached version from an older skill list. QUICK is also a Skill invocation; do not replace it with ordinary task planning or silently PASS just because no questions are needed.
Skill entrypoint: ${require("node:path").join(__dirname, "..", "skills", "enhance-prompt", "SKILL.md")}
Choose its depth separately from whether to enhance:
- QUICK: the goal is usable, context supplies the missing facts, or remaining choices are low-impact/reversible. Briefly organize the goal, scope, constraints and completion condition using only the user's request and current evidence, then proceed immediately. Do not ask questions just to show enhancement occurred or turn a task into a long prompt template.
- CLARIFY: an unresolved user decision would materially change the goal, deliverable, scope or permission and cannot be obtained from context or by inspecting the project. Ask only those essential questions, then proceed. Missing technical facts are investigated by the executing agent rather than treated as a reason to interrogate the user.

When a new task changes what the product does, identify its essential behavior before choosing QUICK: who/what it serves, what event or timing should trigger its actions, and where the result should be delivered, when these determine the product. Unknown business behavior is not a low-impact implementation detail. Without a prior answer or delegated discretion, CLARIFY those missing choices before creating the product. The current OS, existing sample data, and the previous task's recommendations do not establish those choices.

Keep a general discussion as discussion. An analysis-only request may be enhanced but remains analysis-only; it never authorizes editing the project.

Choose and retain the handoff mode across the enhancement interview:
- AUTO_CONTINUE for an ordinary work request. For QUICK, state the organized task in one short progress message and start the work immediately; for CLARIFY, continue once essential questions are answered. Do not end the turn after a copyable prompt, ask the user to copy/send it, or require an extra "execute" confirmation. A clarification answer continues AUTO_CONTINUE. Finish by reporting actual task results, including analysis when analysis was requested.
- PROMPT_ONLY when the user explicitly asks for a rewritten prompt, only wants a prompt, says "do not execute", or invokes an explicit enhancement entrypoint without asking to execute. Return the enhanced prompt and stop. This explicit limit overrides AUTO_CONTINUE, including if added during an interview.

AUTO_CONTINUE preserves the original task's scope and permissions. A generated prompt does not grant new authorization: discussion stays discussion, analysis stays analysis, and actions requiring separate approval still follow the host's rules. Do not claim to have submitted a new user message or call a tool to message this or another thread; continue as the same assistant.

If the message answers a clarification or continues the SAME active task, keep its handoff mode and do not restart enhancement. This exemption is task-specific, not thread-wide: after completion, or when the user introduces a different task (even while a previous question is pending), classify the new task again. A thread can enhance multiple distinct tasks. "继续 / 按推荐 / 开始" continues the agreed flow, and an explicit request to execute an already-delivered enhanced prompt proceeds without another cycle.

Explicit bypasses:
- If the prompt already invokes \`$prompt-craft:enhance-prompt\`, load the skill.
- If the user explicitly says "do not enhance", "直接执行", or "不用增强", PASS.
- Do not ask a clarification merely because a reversible low-risk detail is absent; let the executing agent choose and state an assumption.

Keep the current project, permissions, and thread. Never create a new conversation for enhancement.`;

let input = "";

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});
process.stdin.on("end", () => {
  try {
    const event = JSON.parse(input);
    const prompt = typeof event.prompt === "string" ? event.prompt : "";

    // The explicit Skill already performs routing; avoid duplicate context.
    if (prompt.includes("$prompt-craft:enhance-prompt")) return;

    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "UserPromptSubmit",
          additionalContext: ROUTER_CONTEXT,
        },
      }),
    );
  } catch {
    // A malformed hook event must not block the user's prompt.
  }
});
