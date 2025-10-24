# 04 – AI Integration (MCP Tools)

## Purpose
Integrates AgentStatic with Claude via MCP tools for discovery, reasoning, and composition.

## Tools
| Tool | Purpose | Input | Output |
|------|----------|--------|---------|
| discover_components | Search registry | query, filters | matches[], suggestions[] |
| get_component_details | Fetch schema | componentId | component object |
| compose_page | Build AST | title, sections[] | validated AST + report |
| validate_composition | Check AST | sections[] | valid, errors[], suggestions[] |
| suggest_next_components | Recommend | current sections | suggestions[] |

## Acceptance Criteria
- MCP spec-compliant JSON schemas
- Validation feedback loop operational
- Autonomous site composition demo