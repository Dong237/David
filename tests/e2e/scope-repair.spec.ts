import { expect, test } from "@playwright/test";
import { expectNoPageOverflow, monitorRuntime, openBlueprint } from "./helpers";

test("a projected scope cut exposes one blocker and repairs the same canonical path", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await openBlueprint(page);

  const outline = page.getByRole("complementary", { name: "Blueprint outline" });
  await outline.getByRole("button", { name: "Diagnostic Quiz" }).click();
  await expect(page.getByRole("complementary", { name: "Node Inspector" })).toContainText(
    "node_diagnostic"
  );
  await page.getByRole("button", { name: "Move Diagnostic Quiz to Later" }).click();

  await expect(page.locator("[data-app-state='SCOPE_CONFLICT']")).toBeVisible();
  await expect(page.locator("[data-node-id='node_diagnostic']")).toHaveAttribute(
    "data-scope-status",
    "later"
  );
  await expect(page.locator("[data-node-id='node_diagnostic']")).toHaveAttribute(
    "data-scope-proposal",
    "later"
  );
  await expect(page.locator("[data-node-id='node_diagnostic']")).toContainText(
    "Proposed: Later"
  );
  await expect(page.locator("[data-flow-id='flow_diagnostic_plan']")).toHaveAttribute(
    "data-edge-state",
    "broken"
  );
  await expect(page.locator(".readiness-pill")).toHaveText("1 blocker");
  await expect(page.locator("[data-repair-id]")).toHaveCount(3);
  await expect(page.getByRole("button", { name: "Toggle Validation" })).toBeDisabled();
  await expect(page.getByText("Canonical state is unchanged.", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open Handoff" })).toBeDisabled();

  await page.getByRole("button", { name: "Apply lightweight diagnostic repair" }).click();
  await expect(page.locator("[data-app-state='REPAIR_APPROVED']")).toBeVisible();
  const repaired = page.locator("[data-node-id='node_diagnostic']");
  await expect(repaired).toContainText("Quick Diagnostic");
  await expect(repaired).toHaveAttribute("data-scope-status", "in_mvp");
  await expect(repaired).toHaveAttribute("data-scope-variant", "lightweight");
  await expect(repaired).toHaveAttribute("data-scope-proposal", "none");
  await expect(page.locator("[data-edge-state='broken']")).toHaveCount(0);
  await expect(page.getByText("Ready for handoff", { exact: true })).toBeVisible();
  await expect(page.getByText("Decision recorded", { exact: true })).toBeVisible();
  await expect(page.getByText("Question 1 of 3", { exact: true })).toBeVisible();
  await expectNoPageOverflow(page);
  runtime.assertClean();
});
