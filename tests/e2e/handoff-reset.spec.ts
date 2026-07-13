import { expect, test } from "@playwright/test";
import {
  expectNoPageOverflow,
  monitorRuntime,
  openBlueprint,
  proposeAndRepairScope
} from "./helpers";

test("Handoff compiles the repaired Blueprint and Back preserves the decision", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await openBlueprint(page);
  await proposeAndRepairScope(page);
  await page.getByRole("button", { name: "Open Handoff" }).click();

  await expect(page.locator("[data-app-state='HANDOFF_READY']")).toBeVisible();
  await expect(page.locator("[data-file-path]")).toHaveCount(11);
  await expect(page.locator("[data-file-path='handoff/START_HERE.md']")).toHaveClass(/is-active/);

  for (const path of [
    "handoff/blueprint.json",
    "handoff/ia.md",
    "handoff/flows.md",
    "handoff/wireframes/daily-session.md"
  ]) {
    await page.locator(`[data-file-path='${path}']`).click();
    await expect(page.getByText(path, { exact: true })).toBeVisible();
  }

  await page.getByRole("button", { name: "Copy starter prompt" }).click();
  await expect(page.getByRole("status")).toContainText(
    /Starter prompt copied|Clipboard unavailable/
  );
  await page.getByRole("button", { name: "Back to Blueprint" }).click();
  await expect(page.locator("[data-app-state='REPAIR_APPROVED']")).toBeVisible();
  await expect(page.locator("[data-node-id='node_diagnostic']")).toContainText("Quick Diagnostic");
  await expect(page.getByText("Decision recorded", { exact: true })).toBeVisible();
  await expectNoPageOverflow(page);
  runtime.assertClean();
});

test("clipboard denial gives a truthful manual fallback", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "clipboard", {
      configurable: true,
      get: () => ({ writeText: () => Promise.reject(new Error("clipboard denied")) })
    });
  });
  await openBlueprint(page);
  await proposeAndRepairScope(page);
  await page.getByRole("button", { name: "Open Handoff" }).click();
  await page.getByRole("button", { name: "Copy starter prompt" }).click();

  await expect(page.getByRole("status")).toContainText(
    "Clipboard unavailable. Select the starter prompt manually."
  );
  runtime.assertClean();
});

test("Reset restores the reference fixture from Handoff", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await openBlueprint(page);
  await proposeAndRepairScope(page);
  await page.getByRole("button", { name: "Open Handoff" }).click();
  await page.getByRole("button", { name: "Reset Demo" }).click();

  await expect(page.locator("[data-app-state='INTAKE_DRAFT']")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send idea" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Generate Blueprint" })).toBeDisabled();
  await expect(page.getByRole("status")).toHaveCount(0);
  runtime.assertClean();
});

test("Reset clears pending and approved decisions from Canvas states", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await openBlueprint(page);

  const outline = page.getByRole("complementary", { name: "Blueprint outline" });
  await outline.getByRole("button", { name: "Diagnostic Quiz" }).click();
  await page.getByRole("button", { name: "Move Diagnostic Quiz to Later" }).click();
  await expect(page.locator("[data-app-state='SCOPE_CONFLICT']")).toBeVisible();
  await page.getByRole("button", { name: "Reset Demo" }).click();
  await expect(page.locator("[data-app-state='INTAKE_DRAFT']")).toBeVisible();

  await openBlueprint(page);
  await proposeAndRepairScope(page);
  await expect(page.getByRole("status")).toContainText("Core path restored");
  await page.getByRole("button", { name: "Reset Demo" }).click();
  await expect(page.locator("[data-app-state='INTAKE_DRAFT']")).toBeVisible();
  await expect(page.getByRole("status")).toHaveCount(0);

  await openBlueprint(page);
  await expect(page.locator("[data-node-id='node_diagnostic']")).toContainText("Diagnostic Quiz");
  await expect(page.locator("[data-node-id='node_diagnostic']")).toHaveAttribute(
    "data-scope-variant",
    "full"
  );
  runtime.assertClean();
});
