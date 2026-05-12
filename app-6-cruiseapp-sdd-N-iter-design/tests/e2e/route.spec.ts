import { test, expect } from "@playwright/test";

test.describe("Route Planner", () => {
  test("route form with waypoints is visible", async ({ page }) => {
    await page.goto("/en/route");
    await expect(page.getByTestId("route-page")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByTestId("route-form")).toBeVisible();
    await expect(page.getByTestId("waypoint-0")).toBeVisible();
    await expect(page.getByTestId("waypoint-1")).toBeVisible();
  });

  test("planning Berlin→Helsinki→Tallinn shows multi-leg route", async ({
    page,
  }) => {
    await page.goto("/en/route");
    await page.getByTestId("waypoint-0").fill("Berlin");
    // Add a stop
    await page.getByTestId("add-waypoint").click();
    await expect(page.getByTestId("waypoint-1")).toBeVisible();
    await page.getByTestId("waypoint-1").fill("Helsinki");
    await page.getByTestId("waypoint-2").fill("Tallinn");
    await page.getByTestId("plan-route-btn").click();
    await expect(page.getByTestId("route-result")).toBeVisible({
      timeout: 10000,
    });
  });
});
