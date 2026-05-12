import { test, expect } from "@playwright/test";
import { signInAsDemoUser } from "../fixtures/test-utils";

test.describe("Profile & Locale", () => {
  test("profile page shows user info and settings", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("tab-profile").click();
    await expect(page.getByTestId("profile-page")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByText("Elena Volkova").first()).toBeVisible();
    await expect(page.getByTestId("locale-switch")).toBeVisible();
    await expect(page.getByTestId("home-tz")).toBeVisible();
  });

  test("locale switch changes URL to /ru/", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("tab-profile").click();
    await expect(page.getByTestId("profile-page")).toBeVisible({
      timeout: 5000,
    });
    // Click locale switch
    await page.getByTestId("locale-switch").click();
    // URL should now contain /ru/
    await page.waitForURL("**/ru/profile", { timeout: 5000 });
    // Profile heading should be in Russian
    await expect(
      page.getByRole("heading", { name: "Профиль" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("switching demo user changes displayed name", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("tab-profile").click();
    await expect(page.getByText("Elena Volkova").first()).toBeVisible({
      timeout: 5000,
    });
    // Switch to James
    await page.getByTestId("demo-user-james").click();
    await expect(page.getByText("James Chen").first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("sign out button is visible when signed in", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("tab-profile").click();
    await expect(page.getByTestId("sign-out-btn")).toBeVisible({
      timeout: 5000,
    });
  });
});
