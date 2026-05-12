import { test, expect } from "@playwright/test";
import { signInAsDemoUser } from "../fixtures/test-utils";

test.describe("Club Card", () => {
  test("shows club card for signed-in user", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("tab-club").click();
    await expect(page.getByTestId("club-page")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByTestId("club-visual-card")).toBeVisible();
    await expect(page.getByText("GOLD", { exact: true })).toBeVisible();
    await expect(page.getByText("Elena Volkova").first()).toBeVisible();
  });

  test("shows tier progress and perks list", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("tab-club").click();
    await expect(page.getByTestId("club-page")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByTestId("tier-progress")).toBeVisible();
    await expect(page.getByTestId("perks-list")).toBeVisible({
      timeout: 5000,
    });
  });
});
