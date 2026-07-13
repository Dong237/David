import { expect, test } from "@playwright/test";
import {
  expectNoPageOverflow,
  monitorRuntime,
  openBlueprint,
  proposeAndRepairScope
} from "./helpers";

test("the complete showcase is deterministic across five reset cycles", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (let run = 1; run <= 5; run += 1) {
    await openBlueprint(page, run === 1);
    await page.getByRole("button", { name: "Toggle Flow" }).click();
    await expect(page.locator("[data-flow-id]")).toHaveCount(0);
    await page.getByRole("button", { name: "Toggle Flow" }).click();
    await expect(page.locator("[data-flow-id]")).toHaveCount(7);
    await page.locator("[data-node-id='node_daily_session']").click();
    await expect(page.locator("[data-app-state='NODE_EXPANDED']")).toBeVisible();
    await expect(page.locator("[data-flow-id='flow_session_error']")).toBeVisible();
    await proposeAndRepairScope(page);
    await page.getByRole("button", { name: "Open Handoff" }).click();
    await expect(page.locator("[data-file-path]")).toHaveCount(11);
    for (const path of [
      "handoff/blueprint.json",
      "handoff/ia.md",
      "handoff/flows.md",
      "handoff/wireframes/diagnostic.md"
    ]) {
      await page.locator(`[data-file-path='${path}']`).click();
    }
    await page.getByRole("button", { name: "Copy starter prompt" }).click();
    await expect(page.getByRole("status")).toBeVisible();
    await page.getByRole("button", { name: "Back to Blueprint" }).click();
    await expect(page.locator("[data-app-state='REPAIR_APPROVED']")).toBeVisible();
    await expectNoPageOverflow(page);
    await page.getByRole("button", { name: "Reset Demo" }).click();
    await expect(page.locator("[data-app-state='INTAKE_DRAFT']")).toBeVisible();
  }

  runtime.assertClean();
});

test("capture the required evidence states", async ({ page }, testInfo) => {
  const runtime = monitorRuntime(page);
  const isWide = testInfo.project.name === "chromium-1440";
  await page.goto("/");

  await page.screenshot({
    path: isWide
      ? "artifacts/demo-showcase/screenshots/intake-1440x900.png"
      : "artifacts/demo-showcase/screenshots/intake-1280x720.png",
    animations: "disabled"
  });
  await openBlueprint(page);
  await page.waitForTimeout(320);
  await page.screenshot({
    path: isWide
      ? "artifacts/demo-showcase/screenshots/canvas-1440x900.png"
      : "artifacts/demo-showcase/screenshots/canvas-1280x720.png",
    animations: "disabled"
  });

  await page.locator("[data-node-id='node_daily_session']").click();
  await expect(page.locator("[data-app-state='NODE_EXPANDED']")).toBeVisible();
  await page.waitForTimeout(1_000);
  await page.screenshot({
    path: isWide
      ? "artifacts/demo-showcase/screenshots/node-expanded-1440x900.png"
      : "artifacts/demo-showcase/screenshots/node-expanded-1280x720.png",
    animations: "allow"
  });

  const outline = page.getByRole("complementary", { name: "Blueprint outline" });
  await outline.getByRole("button", { name: "Diagnostic Quiz" }).click();
  await page.getByRole("button", { name: "Move Diagnostic Quiz to Later" }).click();
  await page.waitForTimeout(320);
  await page.screenshot({
    path: isWide
      ? "artifacts/demo-showcase/screenshots/scope-conflict-1440x900.png"
      : "artifacts/demo-showcase/screenshots/scope-conflict-1280x720.png",
    animations: "disabled"
  });

  await page.getByRole("button", { name: "Apply lightweight diagnostic repair" }).click();
  await page.getByRole("button", { name: "Open Handoff" }).click();
  await page.waitForTimeout(100);
  await page.screenshot({
    path: isWide
      ? "artifacts/demo-showcase/screenshots/handoff-1440x900.png"
      : "artifacts/demo-showcase/screenshots/handoff-1280x720.png",
    animations: "disabled"
  });
  runtime.assertClean();
});
