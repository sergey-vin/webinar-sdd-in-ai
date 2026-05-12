import { test, expect } from "@playwright/test";
import { signInAsDemoUser } from "../fixtures/test-utils";

test.describe("Deck Map", () => {
  test("navigating to deck map from boarding pass", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    // Click leg 3 (Helsinki→Tallinn ferry with vessel)
    await page.getByTestId("leg-card-3").click();
    await expect(page.getByTestId("boarding-pass")).toBeVisible({
      timeout: 10000,
    });
    // Click deck map link
    await page.getByTestId("deck-map-link").click();
    await expect(page.getByTestId("deck-map")).toBeVisible({
      timeout: 10000,
    });
  });

  test("deck tabs and venue list are visible", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("leg-card-3").click();
    await expect(page.getByTestId("boarding-pass")).toBeVisible({
      timeout: 10000,
    });
    await page.getByTestId("deck-map-link").click();
    await expect(page.getByTestId("deck-map")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByTestId("deck-tabs")).toBeVisible();
    await expect(page.getByTestId("deck-svg")).toBeVisible();
  });

  test("clicking a venue shows events card", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.getByTestId("leg-card-3").click();
    await expect(page.getByTestId("boarding-pass")).toBeVisible({
      timeout: 10000,
    });
    await page.getByTestId("deck-map-link").click();
    await expect(page.getByTestId("deck-map")).toBeVisible({
      timeout: 10000,
    });

    // Wait for venue list to appear, then click first venue in the list
    await expect(page.getByTestId("venue-list")).toBeVisible({
      timeout: 5000,
    });
    // Click the first venue button in the list
    await page.getByTestId("venue-list").locator("button").first().click();
    await expect(page.getByTestId("venue-events-card")).toBeVisible();
  });
});
