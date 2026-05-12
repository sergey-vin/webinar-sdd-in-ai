import { test, expect } from "@playwright/test";
import { signInAsDemoUser } from "../fixtures/test-utils";

test.describe("Trip Timeline", () => {
  test("shows demo user picker when not signed in", async ({ page }) => {
    await page.goto("/en/trip");
    await expect(page.getByTestId("demo-user-picker")).toBeVisible();
    await expect(page.getByTestId("demo-user-elena")).toBeVisible();
    await expect(page.getByTestId("demo-user-james")).toBeVisible();
  });

  test("Elena signs in and sees trip timeline with 4 legs", async ({
    page,
  }) => {
    await signInAsDemoUser(page, "elena");
    await expect(page.getByTestId("trip-page")).toBeVisible();
    await expect(page.getByTestId("trip-timeline")).toBeVisible();

    // Elena has 4 legs
    await expect(page.getByTestId("leg-card-1")).toBeVisible();
    await expect(page.getByTestId("leg-card-2")).toBeVisible();
    await expect(page.getByTestId("leg-card-3")).toBeVisible();
    await expect(page.getByTestId("leg-card-4")).toBeVisible();
  });

  test("bottom tabs are visible", async ({ page }) => {
    await page.goto("/en/trip");
    await expect(page.getByTestId("bottom-tabs")).toBeVisible();
    await expect(page.getByTestId("tab-trip")).toBeVisible();
    await expect(page.getByTestId("tab-search")).toBeVisible();
    await expect(page.getByTestId("tab-profile")).toBeVisible();
  });

  test("header shows app name", async ({ page }) => {
    await page.goto("/en/trip");
    await expect(page.getByTestId("app-header")).toContainText("CUThere");
  });
});
