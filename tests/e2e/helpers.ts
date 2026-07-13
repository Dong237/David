import { expect, type Page } from "@playwright/test";

export interface RuntimeMonitor {
  assertClean: () => void;
}

export function monitorRuntime(page: Page): RuntimeMonitor {
  const failures: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`console.error: ${message.text()}`);
  });
  page.on("pageerror", (error) => failures.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    const url = new URL(request.url());
    if (url.origin === "http://127.0.0.1:1420") {
      failures.push(`requestfailed: ${request.method()} ${url.pathname}`);
    }
  });

  return {
    assertClean: () => expect(failures, failures.join("\n")).toEqual([])
  };
}

export async function expectNoPageOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    clientHeight: document.documentElement.clientHeight,
    scrollHeight: document.documentElement.scrollHeight
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  expect(dimensions.scrollHeight).toBeLessThanOrEqual(dimensions.clientHeight + 1);
}

export async function openBlueprint(page: Page, navigate = true) {
  if (navigate) await page.goto("/");
  await expect(page.locator("[data-app-state='INTAKE_DRAFT']")).toBeVisible();
  await page.getByRole("button", { name: "Send idea" }).click();
  await expect(page.getByText("What should V1 prove first?", { exact: true })).toHaveCount(1);
  await page.getByRole("button", { name: "Choose daily session outcome" }).click();
  await expect(page.locator("[data-app-state='CONTEXT_READY']")).toBeVisible();
  await page.getByRole("button", { name: "Generate Blueprint" }).click();
  await expect(page.locator("[data-app-state='BLUEPRINT_READY']")).toBeVisible();
  await expect(page.locator("[data-region-id]")).toHaveCount(4);
  await expect(page.locator("[data-node-id]")).toHaveCount(9);
}

export async function proposeAndRepairScope(page: Page) {
  const outline = page.getByRole("complementary", { name: "Blueprint outline" });
  await outline.getByRole("button", { name: "Diagnostic Quiz" }).click();
  await page.getByRole("button", { name: "Move Diagnostic Quiz to Later" }).click();
  await expect(page.locator("[data-app-state='SCOPE_CONFLICT']")).toBeVisible();
  await page.getByRole("button", { name: "Apply lightweight diagnostic repair" }).click();
  await expect(page.locator("[data-app-state='REPAIR_APPROVED']")).toBeVisible();
}
