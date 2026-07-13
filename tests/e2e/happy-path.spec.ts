import { expect, test } from "@playwright/test";
import { expectNoPageOverflow, monitorRuntime, openBlueprint } from "./helpers";

test("agentic intake produces one canonical Blueprint", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await page.goto("/");

  await expect(page.locator("[data-app-state='INTAKE_DRAFT']")).toBeVisible();
  await expect(page.getByRole("button", { name: "Generate Blueprint" })).toBeDisabled();
  await expect(page.getByLabel("Product idea")).not.toHaveValue("");
  await page.getByRole("button", { name: "Send idea" }).click();

  await expect(page.locator("[data-app-state='INTAKE_QUESTION']")).toBeVisible();
  await expect(page.getByText("What should V1 prove first?", { exact: true })).toHaveCount(1);
  await expect(page.getByText("Why this matters:", { exact: false })).toBeVisible();
  await expect(page.getByText("Safe fallback:", { exact: false })).toBeVisible();

  await page.getByRole("button", { name: "Choose daily session outcome" }).click();
  await expect(page.locator("[data-app-state='CONTEXT_READY']")).toBeVisible();
  await expect(page.getByText("Context sufficient", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Generate Blueprint" })).toBeEnabled();
  await page.getByRole("button", { name: "Generate Blueprint" }).click();

  await expect(page.locator("[data-app-state='BLUEPRINT_READY']")).toBeVisible();
  await expect(page.locator("[data-region-id]")).toHaveCount(4);
  await expect(page.locator("[data-node-id]")).toHaveCount(9);
  await expect(page.locator("[data-flow-id]")).toHaveCount(7);
  await expect(page.getByText("4 regions · 9 nodes · 1 canonical Blueprint")).toBeVisible();
  await expectNoPageOverflow(page);
  runtime.assertClean();
});

test("the plan-first answer changes the Blueprint organizing focus", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Send idea" }).click();
  await page.getByRole("button", { name: /Generate a useful study plan/ }).click();

  await expect(page.getByText("plan usefulness", { exact: false })).toBeVisible();
  await expect(page.getByText("Turn one exam goal into a useful first study plan", {
    exact: true
  })).toBeVisible();
  await page.getByRole("button", { name: "Generate Blueprint" }).click();
  await expect(page.getByRole("complementary", { name: "Node Inspector" })).toContainText(
    "node_study_plan"
  );
  runtime.assertClean();
});

test("intake handles empty and non-reference ideas truthfully", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await page.goto("/");
  await page.getByLabel("Product idea").fill("");
  await page.getByRole("button", { name: "Send idea" }).click();
  await expect(page.getByText("Add a product idea before continuing.")).toBeVisible();
  await expect(page.locator("[data-app-state='INTAKE_DRAFT']")).toBeVisible();

  await page.getByLabel("Product idea").fill("A meal planning tool for busy families");
  await page.getByRole("button", { name: "Send idea" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Demo mode uses the AI Study Coach reference case."
  );
  await expect(page.locator("[data-app-state='INTAKE_QUESTION']")).toBeVisible();
  runtime.assertClean();
});

test("Daily Session expands its Wireframe inside the same IA graph", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await openBlueprint(page);

  const dailySession = page.locator("[data-node-id='node_daily_session']");
  await expect(dailySession).toHaveAttribute("data-expanded", "false");
  await dailySession.click();

  await expect(page.locator("[data-app-state='NODE_EXPANDED']")).toBeVisible();
  await expect(dailySession).toHaveAttribute("data-expanded", "true");
  await expect(dailySession.getByLabel("Daily Session low fidelity wireframe")).toBeVisible();
  await expect(dailySession.getByText("Primary CTA", { exact: true })).toBeVisible();
  await expect(page.locator("[data-node-id]")).toHaveCount(9);
  await expect(page.locator("[data-region-id]")).toHaveCount(4);
  await expect(page.getByRole("complementary", { name: "Node Inspector" })).toContainText(
    "node_daily_session"
  );
  await expectNoPageOverflow(page);
  runtime.assertClean();
});
