import { test, expect } from "@playwright/test";
import { signInAsDemoUser } from "../fixtures/test-utils";

test.describe("Boarding Pass", () => {
  test("clicking a leg card navigates to boarding pass", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    // Click the third leg (in_transit — Helsinki→Tallinn ferry)
    await page.getByTestId("leg-card-3").click();
    await expect(page.getByTestId("boarding-pass")).toBeVisible({ timeout: 10000 });
  });

  test("boarding pass shows QR code and booking ref", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("leg-card-3").click();
    await expect(page.getByTestId("boarding-pass")).toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId("qr-code")).toBeVisible();
    await expect(page.getByText("CUT-TLK8842").first()).toBeVisible();
  });

  test("back button returns to trip timeline", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("leg-card-1").click();
    await expect(page.getByTestId("boarding-pass")).toBeVisible({ timeout: 10000 });
    await page.getByTestId("back-to-trip").click();
    await expect(page.getByTestId("trip-page")).toBeVisible({ timeout: 5000 });
  });
});
