We are doing spec-driven development.

Write a prompt that I can use in VSCode or Cursor to generate SPEC FILES and an IMPLEMENTATION PLAN for setting up testing infrastructure in my project.

IMPORTANT:
- I will paste my project details after this message.
- The system must wait for that input before generating final output.

Goal:
Set up testing frameworks ONLY. Do NOT write any test cases.

We need setup for:
- unit tests
- integration / API tests
- e2e tests

Constraints:
- do NOT change application behavior
- do NOT add features
- do NOT create real test cases
- keep changes minimal and isolated
- only add configs, scripts, and setup files
- must be safe for an existing project

Output requirements:

1) SPEC FILE(S)
Generate spec file(s) in Markdown that describe:
- testing strategy (unit, integration, e2e)
- framework choices and justification
- folder structure for tests
- naming conventions
- execution flow (how tests are run)
- separation of concerns between test types

2) IMPLEMENTATION PLAN
Provide a clear, ordered, step-by-step plan including:
- dependencies to install
- config files to create
- scripts to add/update in package.json
- minimal setup for each testing type

3) FRAMEWORKS
Choose appropriate tools based on the stack (prefer defaults):
- Jest (unit + integration)
- Supertest (API testing)
- Playwright or Cypress (E2E)

4) CONFIG FILES
Provide example contents for:
- jest.config (or ts-jest setup)
- integration test config (if separate)
- e2e config (Playwright or Cypress)

5) PACKAGE.JSON SCRIPTS
Include scripts such as:
- test
- test:unit
- test:integration
- test:e2e

6) VERIFICATION
Include commands to verify setup works even with ZERO tests:
- test runner executes without crashing
- no config errors
- expected “no tests found” output

7) OUTPUT FORMAT
Return everything in clean Markdown with sections:
- SPEC
- IMPLEMENTATION PLAN
- SAMPLE CONFIG FILES
- VERIFICATION STEPS

REMINDER:
- Do NOT generate test cases
- Do NOT modify business logic
- Do NOT introduce new features
- Only set up testing infrastructure


This is a <mark>Guardrail (Keep This Ready)

If the AI starts going off-track, paste this immediately:

Stop. Framework setup only. No test cases. No feature code. No behavior changes.</mark> in Markdown.

