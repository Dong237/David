import { expect, test } from "@playwright/test";
import { expectNoPageOverflow, monitorRuntime, openBlueprint } from "./helpers";

async function nodePositions(page: import("@playwright/test").Page) {
  return page.locator("[data-node-id]").evaluateAll((nodes) =>
    Object.fromEntries(
      nodes.map((node) => {
        const box = node.getBoundingClientRect();
        return [node.getAttribute("data-node-id"), { x: box.x, y: box.y }];
      })
    )
  );
}

test("Flow, Wireframe, and Scope are lenses over a stable IA spine", async ({ page }) => {
  const runtime = monitorRuntime(page);
  await openBlueprint(page);
  const before = await nodePositions(page);

  const flowToggle = page.getByRole("button", { name: "Toggle Flow" });
  await expect(flowToggle).toHaveAttribute("aria-pressed", "true");
  await flowToggle.click();
  await expect(page.locator("[data-flow-id]")).toHaveCount(0);
  const withoutFlow = await nodePositions(page);
  expect(withoutFlow).toEqual(before);

  await flowToggle.click();
  await expect(page.locator("[data-flow-id]")).toHaveCount(7);
  expect(await nodePositions(page)).toEqual(before);

  await expect(page.getByRole("button", { name: "IA base lens, always on" })).toBeDisabled();
  await page.getByRole("button", { name: "Toggle Wireframe" }).click();
  await expect(page.getByLabel("Wireframe thumbnail")).toHaveCount(0);
  await expect(page.locator("[data-node-id]")).toHaveCount(9);

  await page.getByRole("button", { name: "Toggle Scope" }).click();
  await expect(page.locator(".scope-badge")).toHaveCount(0);
  await expect(page.locator("[data-node-id]")).toHaveCount(9);

  await page.getByRole("button", { name: "Toggle Wireframe" }).click();
  const outline = page.getByRole("complementary", { name: "Blueprint outline" });
  await outline.getByRole("button", { name: "Today" }).click();
  await outline.getByRole("button", { name: "Daily Session" }).click();
  await expect(page.locator("[data-app-state='NODE_EXPANDED']")).toBeVisible();
  await expect(page.locator("[data-node-id='node_daily_session']")).toHaveAttribute(
    "data-expanded",
    "true"
  );
  await expect(page.locator("[data-flow-id='flow_session_error']")).toBeVisible();

  await page.getByRole("button", { name: "Toggle Wireframe" }).click();
  await expect(page.locator("[data-app-state='BLUEPRINT_READY']")).toBeVisible();
  await expect(page.locator("[data-node-id='node_daily_session']")).toHaveAttribute(
    "data-expanded",
    "false"
  );
  await expect(page.getByLabel("Daily Session low fidelity wireframe")).toHaveCount(0);
  await expectNoPageOverflow(page);
  runtime.assertClean();
});
