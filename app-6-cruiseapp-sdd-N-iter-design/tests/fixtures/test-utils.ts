import { type Page, expect } from "@playwright/test";

/**
 * Sign in as one of the demo users.
 */
export async function signInAsDemoUser(
  page: Page,
  user: "elena" | "james",
) {
  await page.goto("/en/trip");
  // Click the user card
  await page.getByTestId(`demo-user-${user}`).click();
  // Wait for trip page to appear
  await expect(page.getByTestId("trip-page")).toBeVisible({ timeout: 15000 });
}
